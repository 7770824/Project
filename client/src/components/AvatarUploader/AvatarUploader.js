import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import classes from './AvatarUploader.module.css';

const AvatarUploader = ({
  initialAvatar = null,
  onAvatarChange,
  buttonText = "上传头像",
  previewSize = "medium"
}) => {
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // 如果提供了初始头像，设置预览
  useEffect(() => {
    if (initialAvatar) {
      setPreviewUrl(initialAvatar);
    }
  }, [initialAvatar]);

  // 处理头像上传
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // 处理文件逻辑
  const processFile = (file) => {
    // 检查是否是图片文件
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件！');
      return;
    }

    setAvatar(file);

    // 将文件传递给父组件
    onAvatarChange(file);

    // 创建预览
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 拖拽处理函数
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={classes.avatarUploader}>
      {/* 上传控件 */}
      <div className={classes.controlsContainer}>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <div className={classes.uploadBtn}>
            <FontAwesomeIcon icon={faUpload} /> {buttonText}
          </div>
        </label>

        {/* 拖拽区域 */}
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

      {/* 预览区域 */}
      {previewUrl && (
        <div className={`${classes.avatarPreview} ${classes[previewSize]}`}>
          <img src={previewUrl} alt="头像预览" />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;