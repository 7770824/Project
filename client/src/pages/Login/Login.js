import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useReginUserMutation, useRegistUserMutation } from '../../store/userApi';
import classes from './Login.module.css'

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [regin, { error: reginErr }] = useReginUserMutation();
    const [regist, { error: registErr }] = useRegistUserMutation();

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

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
                    localStorage.setItem('token', result.token);
                    navigate('/'); // 登录成功后跳转到首页
                }
            } else {
                const result = await regist({ email, username, password }).unwrap();
                if (result.status === 'success') {
                    setIsLogin(true); // 注册成功后切换到登录页
                }
            }
        } catch (error) {
            console.error('操作失败：', error);
        }
    }

    return (
        <div>
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
                    !isLogin &&
                    <div>
                        <input ref={usernameInp} type='text' placeholder='用户名' />
                    </div>
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