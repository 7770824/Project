import React from 'react'
import classes from './Userbox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation, useLogoutUserMutation } from '../../store/userApi'
import { useAuth } from '../../hooks/useAuth'
const Userbox = () => {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useAuth('/login', false);
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
                alert('账号已成功注销');
                window.location.reload();
            } catch (error) {
                alert('注销账号失败：' + (error.data?.message || '未知错误'));
            }
        }
    };

    if (isLoading) return <div className={classes.userbox}>加载中...</div>;

    if (!isAuthenticated) {
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
            {user?.avatar && (
                <div className={classes.avatar}>
                    <img src={user.avatar} alt="用户头像" />
                </div>
            )}
            <div className={classes.name}>
                {!user?.avatar && <FontAwesomeIcon icon={faHouse} />}
                {user?.nickname || user?.username}
            </div>
            <div className={classes.email}>
                {user?.email}
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