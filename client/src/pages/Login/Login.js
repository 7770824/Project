import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useReginUserMutation, useRegistUserMutation } from '../../store/userApi';
import classes from './Login.module.css'
// 引入新组件
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [regin, { error: reginErr }] = useReginUserMutation();
    const [regist, { error: registErr }] = useRegistUserMutation();
    const [avatar, setAvatar] = useState(null);

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    // 简化为一个处理函数
    const handleAvatarChange = (file) => {
        setAvatar(file);
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
                            {/* 使用新组件替代原先的上传代码 */}
                            <AvatarUploader
                                buttonText="点击上传头像(选填)"
                                onAvatarChange={handleAvatarChange}
                            />
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