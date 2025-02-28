import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import classes from './AvatarUploader.module.css';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useDragDrop } from '../../hooks/useDragDrop';

const AvatarUploader = ({
  initialAvatar = null,
  onAvatarChange,
  buttonText = "上传头像",
  previewSize = "medium"
}) => {
  const { file, previewUrl, handleFileChange } = useFileUpload(initialAvatar);
  const { isDragOver, dragProps } = useDragDrop(handleFileChange);
  // 当文件变更时，通知父组件
  React.useEffect(() => {
    if (file) {
      onAvatarChange(file);
    }
  }, [file, onAvatarChange]);

  // 处理文件选择
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
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
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
          <div className={classes.uploadBtn}>
            <FontAwesomeIcon icon={faUpload} /> {buttonText}
          </div>
        </label>

        {/* 拖拽区域 */}
        <div
          className={`${classes.dropZone} ${isDragOver ? classes.dragOver : ''}`}
          {...dragProps}
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