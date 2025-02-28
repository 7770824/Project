import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../store/userApi';
import classes from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetUserInfoQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

    const [avatar, setAvatar] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const usernameInp = useRef();

    const handleAvatarChange = (file) => {
        setAvatar(file);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

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
                <AvatarUploader
                    initialAvatar={data?.data?.avatar}
                    buttonText="选择新头像"
                    onAvatarChange={handleAvatarChange}
                    previewSize="large"
                />

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