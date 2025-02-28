import { useState } from 'react';

export function useDragDrop(onFileAccepted, fileTypePrefix = 'image/') {
  const [isDragOver, setIsDragOver] = useState(false);
  
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
      const file = e.dataTransfer.files[0];
      
      // 文件类型验证
      if (fileTypePrefix && !file.type.startsWith(fileTypePrefix)) {
        alert(`只支持${fileTypePrefix}类型的文件`);
        return;
      }
      
      // 回调函数处理文件
      onFileAccepted(file);
    }
  };
  
  // 返回拖拽状态和事件处理器
  return {
    isDragOver,
    dragProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  };
}