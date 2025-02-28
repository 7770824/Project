import { useState, useCallback } from 'react';

export function useMessage(duration = 3000) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState(''); // 'success', 'error', 'info'
  
  const showMessage = useCallback((text, messageType = 'info') => {
    setMessage(text);
    setType(messageType);
    
    // 自动清除消息
    const timer = setTimeout(() => {
      setMessage('');
      setType('');
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  const showSuccess = useCallback((text) => {
    showMessage(text, 'success');
  }, [showMessage]);
  
  const showError = useCallback((text) => {
    showMessage(text, 'error');
  }, [showMessage]);
  
  const clearMessage = useCallback(() => {
    setMessage('');
    setType('');
  }, []);
  
  return {
    message,
    type,
    showMessage,
    showSuccess,
    showError,
    clearMessage
  };
}