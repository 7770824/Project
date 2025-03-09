import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../../store/userApi';
import classes from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth(); // 使用auth钩子获取用户信息
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

    // 使用普通state替代useFileUpload
    const [avatar, setAvatar] = useState(null);

    // 消息状态管理
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // 消息显示函数
    const showMessage = useCallback((text, type = 'info') => {
        setMessage(text);
        setMessageType(type);

        // 自动清除消息
        const timer = setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const showSuccess = useCallback((text) => {
        showMessage(text, 'success');
    }, [showMessage]);

    const usernameInp = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const username = usernameInp.current.value.trim();

        if (username) formData.append('username', username);
        if (avatar) formData.append('avatar', avatar);

        try {
            const result = await updateProfile(formData).unwrap();
            if (result.status === 'success') {
                showSuccess('个人资料更新成功！');
            }
        } catch (error) {
            console.error('更新失败：', error);
        }
    };

    if (isLoading) return <div className={classes.loading}>加载中...</div>;

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

            {message && (
                <div className={`${classes.successMessage} ${classes[messageType]}`}>{message}</div>
            )}

            <form onSubmit={submitHandler}>
                <AvatarUploader
                    initialAvatar={user?.avatar}
                    buttonText="选择新头像"
                    onAvatarChange={setAvatar}
                    previewSize="large"
                />

                <div className={classes.formGroup}>
                    <label>用户名</label>
                    <input
                        ref={usernameInp}
                        type="text"
                        defaultValue={user?.username}
                        placeholder="用户名"
                    />
                </div>

                <div className={classes.emailField}>
                    <label>电子邮箱</label>
                    <input
                        type="email"
                        value={user?.email}
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