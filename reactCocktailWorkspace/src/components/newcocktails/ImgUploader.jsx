import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledImageUploader = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    & .uploadButton {
          border-Radius: 8px;
          padding: 10px;
          cursor: pointer;
          background-Color: #3498db;
          color: #fff;
          margin-Left: 20px;
    }

    & .cancelButton{
      position: absolute;
      top: 5px;
      right: 5px;
      background: transparent;
      border: none;
      cursor: pointer;
      color: red;
    }

    & img{
      border-Radius: 8px; 
      max-width: 100px; 
      max-height: 100px; 
    }

    & input[type=file]{
      display: none;
    }

    & .previewImg{
      margin-left: 20px; 
      background-color: #ddd;
      border-radius: 8px; 
      width: 100px; 
      height: 100px;
    }
`;

//return function
const ImageUploader = ({ onRegisteredImagesChange }) => {
  const [previewSrcList, setPreviewSrcList] = useState([]);
  const [registeredImages, setRegisteredImages] = useState([]);

  useEffect(() => {
    console.log('현재 사진useeffect:', registeredImages);
    onRegisteredImagesChange(registeredImages); // 상위 컴포넌트 전달 콜백 함수
  }, [registeredImages, onRegisteredImagesChange]);

  //로그용 함수
  const logFilePaths = () => {
    // Log file paths whenever there is a change
    const filePaths = registeredImages.map((file) => URL.createObjectURL(file));
    console.log('File Paths:', filePaths);
  };

  //이미지 제한 및 로그
  const handleUploadClick = () => {
    // Allow registration only if there are fewer than 3 images
    if (registeredImages.length < 3) {
      document.getElementById('file-input').click();
      logFilePaths(); // 파일등록 시 확인
    }else {
      // 이미지 3장 이상 등록 시 alert
      window.alert('이미지는 최대 3장까지만 등록할 수 있습니다.');
      logFilePaths(); // 파일등록 시 확인
    }
  };

  const handleFileSelect = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    const processFile = (file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const newPreviewList = [...previewSrcList, e.target.result];
        setPreviewSrcList(newPreviewList);
        setRegisteredImages([...registeredImages, file]);
      };

      reader.readAsDataURL(file);
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      processFile(file);
    }
  };

  const handleCancelRegistration = (index) => {
    // 이미지 삭제
    const newPreviewList = [...previewSrcList];
    newPreviewList.splice(index, 1);

    const newRegisteredImages = [...registeredImages];
    newRegisteredImages.splice(index, 1);

    setPreviewSrcList(newPreviewList);
    setRegisteredImages(newRegisteredImages);

    logFilePaths();
  };

  //preview 이미지, 대기홀더
  const renderPreviewImages = () => {
    const placeholders = Array.from({ length: 3 - previewSrcList.length }, (_, index) => index);

    return (
      <>
        {previewSrcList.map((src, index) => (
          <div key={index} style={{ marginLeft: '20px', position: 'relative' }}>
            <img src={src} alt={`Preview Image ${index + 1}`} />
            <button className='cancelButton' onClick={() => handleCancelRegistration(index)}>
              ×
            </button>
          </div>
        ))}

        {placeholders.map((_, index) => (
          <div key={index} className='previewImg' />
        ))}
      </>
    );
  };

  return (
    <StyledImageUploader>
      <div className='uploadButton'
        onClick={handleUploadClick}
        disabled={registeredImages.length === 3}>
        이미지 등록
        <input type="file" accept="image/*" id="file-input" onChange={handleFileSelect} multiple />
      </div>

      {renderPreviewImages()}
    </StyledImageUploader>
  );
};

export default ImageUploader;