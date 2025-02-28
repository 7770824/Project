import { useState, useEffect } from 'react';

export function useFileUpload(initialFile = null, fileTypePrefix = 'image/') {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // 设置初始预览
  useEffect(() => {
    if (initialFile && typeof initialFile === 'string') {
      setPreviewUrl(initialFile);
    }
  }, [initialFile]);

  // 处理文件选择
  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    // 文件类型验证
    if (fileTypePrefix && !selectedFile.type.startsWith(fileTypePrefix)) {
      setError(`只支持${fileTypePrefix}类型的文件`);
      return;
    }

    setError(null);
    setFile(selectedFile);

    // 创建文件预览
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.onerror = () => {
      setError('文件预览生成失败');
    };
    reader.readAsDataURL(selectedFile);
  };

  return {
    file,
    previewUrl,
    error,
    handleFileChange,
  };
}