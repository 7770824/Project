import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../store/userApi';

export function useAuth(redirectTo = '/login', autoRedirect = true) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUserInfoQuery();

  useEffect(() => {
    // 如果用户未认证，重定向到登录页面
    if (autoRedirect && error?.status === 401) {
      navigate(redirectTo);
    }
  }, [error, navigate, redirectTo]);

  return {
    user: data?.data,
    isLoading,
    isAuthenticated: !!data && !error
  };
}