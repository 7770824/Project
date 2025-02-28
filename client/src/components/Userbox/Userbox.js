import React from 'react'
import classes from './Userbox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation, useGetUserInfoQuery, useLogoutUserMutation } from '../../store/userApi'

const Userbox = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetUserInfoQuery();
    const [logout] = useLogoutUserMutation();
    const [delUser] = useDeleteUserMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            window.location.reload();
        } catch (error) {
            console.error('退出登录失败', error);
        }
    };

    const deleteAccountHandler = async () => {
        if (window.confirm('确定要注销账号吗？此操作不可恢复！')) {
            try {
                await delUser().unwrap();
                localStorage.removeItem('token');
                alert('账号已成功注销');
                window.location.reload();
            } catch (error) {
                alert('注销账号失败：' + (error.data?.message || '未知错误'));
            }
        }
    };

    if (isLoading) return <div className={classes.userbox}>加载中...</div>;

    if (error?.status === 401) {
        return (
            <div className={classes.userbox}>
                <div className={classes.name}>用户未登录</div>
                <div className={classes.goLogin}>
                    <button onClick={() => navigate('/login')}>去登录</button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.userbox}>
            {data?.data?.avatar && (
                <div className={classes.avatar}>
                    <img src={data.data.avatar} alt="用户头像" />
                </div>
            )}
            <div className={classes.name}>
                {!data?.data?.avatar && <FontAwesomeIcon icon={faHouse} />}
                {data?.data?.nickname || data?.data?.username}
            </div>
            <div className={classes.email}>
                {data?.data?.email}
            </div>
            <div className={classes.goLogin}>
                <button onClick={() => navigate('/profile')}>编辑资料</button>
                <button onClick={logoutHandler}>退出登录</button>
                <button onClick={deleteAccountHandler}>注销账号</button>
            </div>
        </div>
    )
}

export default Userbox