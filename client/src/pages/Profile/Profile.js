import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../store/userApi';
import classes from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faImage, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetUserInfoQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const usernameInp = useRef();

    // 当用户数据加载完成后，设置预览头像
    useEffect(() => {
        if (data?.data?.avatar) {
            setPreviewUrl(data.data.avatar);
        }
    }, [data]);

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

        // 创建FormData对象用于发送包含文件的数据
        const formData = new FormData();

        const username = usernameInp.current.value.trim();

        if (username) formData.append('username', username);
        if (avatar) formData.append('avatar', avatar);

        try {
            const result = await updateProfile(formData).unwrap();
            if (result.status === 'success') {
                setSuccessMsg('个人资料更新成功！');
                setTimeout(() => setSuccessMsg(''), 3000);
            }
        } catch (error) {
            console.error('更新失败：', error);
        }
    };

    if (isLoading) return <div className={classes.loading}>加载中...</div>;
    if (error?.status === 401) {
        navigate('/login');
        return null;
    }

    return (
        <div className={classes.profile}>
            <div className={classes.header}>
                <button
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> 返回
                </button>
                <h2>编辑个人资料</h2>
            </div>

            {successMsg && (
                <div className={classes.successMessage}>{successMsg}</div>
            )}

            <form onSubmit={submitHandler}>
                <div className={classes.avatarSection}>
                    <div className={classes.currentAvatar}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="头像预览" />
                        ) : (
                            <div className={classes.noAvatar}>无头像</div>
                        )}
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
                                <FontAwesomeIcon icon={faUpload} /> 选择新头像
                            </div>
                        </label>

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
                    </div>
                </div>

                <div className={classes.formGroup}>
                    <label>用户名</label>
                    <input
                        ref={usernameInp}
                        type="text"
                        defaultValue={data?.data?.username}
                        placeholder="用户名"
                    />
                </div>

                <div className={classes.emailField}>
                    <label>电子邮箱</label>
                    <input
                        type="email"
                        value={data?.data?.email}
                        disabled
                        readOnly
                    />
                    <small>邮箱地址不可修改</small>
                </div>

                <button
                    type="submit"
                    className={classes.saveButton}
                    disabled={isUpdating}
                >
                    <FontAwesomeIcon icon={faSave} /> 保存修改
                </button>
            </form>
        </div>
    );
};

export default Profile;