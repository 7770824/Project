import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useReginUserMutation, useRegistUserMutation } from '../../store/userApi';
import classes from './Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [regin, { error: reginErr }] = useReginUserMutation();
    const [regist, { error: registErr }] = useRegistUserMutation();
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    // 处理头像上传
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setAvatar(selectedFile);

            // 创建预览
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // 添加拖拽处理函数
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            // 检查是否是图片文件
            if (!file.type.startsWith('image/')) {
                alert('请上传图片文件！');
                return;
            }

            setAvatar(file);

            // 创建预览
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const email = emailInp.current.value.trim();
        const username = isLogin ? undefined : usernameInp.current.value.trim();
        const password = pwdInp.current.value.trim();

        if (!isLogin && (!email || !username || !password)) {
            alert('邮箱、用户名和密码都是必填项');
            return;
        }

        try {
            if (isLogin) {
                const result = await regin({ email, password }).unwrap();
                if (result.status === 'success') {
                    navigate('/'); // 登录成功后跳转到首页
                    window.location.reload();
                }
            } else {
                // 创建FormData对象用于发送包含文件的数据
                const formData = new FormData();
                formData.append('email', email);
                formData.append('username', username);
                formData.append('password', password);
                if (avatar) {
                    formData.append('avatar', avatar);
                }

                const result = await regist(formData).unwrap();
                if (result.status === 'success') {
                    setIsLogin(true); // 注册成功后切换到登录页
                }
            }
        } catch (error) {
            console.error('操作失败：', error);
        }
    }

    return (
        <div className={classes.login}>
            <h2>{isLogin ? "登录" : "注册"}</h2>
            <h2 style={{ color: 'red' }}>
                {(isLogin ? reginErr : registErr) &&
                    (isLogin ? reginErr.data.message : registErr.data.message)}
            </h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={emailInp} type='email' placeholder='电子邮箱' />
                </div>
                {
                    !isLogin && (
                        <>
                            <div>
                                <input ref={usernameInp} type='text' placeholder='用户名' />
                            </div>
                            <div className={classes.avatarUpload}>
                                <label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        style={{ display: 'none' }}
                                    />
                                    <div className={classes.uploadBtn}>
                                        <FontAwesomeIcon icon={faUpload} /> 点击上传头像(选填)
                                    </div>
                                </label>

                                {/* 添加拖拽上传区域 */}
                                <div
                                    className={`${classes.dropZone} ${isDragOver ? classes.dragOver : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <FontAwesomeIcon icon={faImage} size="2x" />
                                    <p>拖拽图片到此处上传</p>
                                </div>

                                {previewUrl && (
                                    <div className={classes.avatarPreview}>
                                        <img src={previewUrl} alt="Avatar preview" />
                                    </div>
                                )}
                            </div>
                        </>
                    )
                }
                <div>
                    <input ref={pwdInp} type='password' placeholder='密码' />
                </div>
                <div>
                    <button>{isLogin ? "登录" : "注册"}</button>
                    <a href='#' onClick={
                        e => {
                            e.preventDefault();
                            setIsLogin(prev => !prev);
                            setPreviewUrl(null); // 重置预览
                            setAvatar(null); // 重置上传的文件
                        }
                    }>
                        {isLogin ? "没有账号？去注册" : "已有账号？去登录"}
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login