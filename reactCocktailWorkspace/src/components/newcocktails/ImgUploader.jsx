import React, { useState } from 'react';
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
`;

//return function
const ImageUploader = () => {
  const [previewSrcList, setPreviewSrcList] = useState([]);
  const [registeredImages, setRegisteredImages] = useState([]);

  const handleUploadClick = () => {
    // Allow registration only if there are fewer than 3 images
    if (registeredImages.length < 3) {
      document.getElementById('file-input').click();
    }else {
      // 이미지 3장 이상 등록 시 alert
      window.alert('이미지는 최대 3장까지만 등록할 수 있습니다.');
    }
  };

  const handleFileSelect = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    // Process each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        // Use FileReader to read the selected file and set the preview source
        const reader = new FileReader();

        reader.onload = function (e) {
          const newPreviewList = [...previewSrcList, e.target.result];
          setPreviewSrcList(newPreviewList);
          setRegisteredImages([...registeredImages, file]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleCancelRegistration = (index) => {
    // Remove the canceled image from both the preview and registered images lists
    const newPreviewList = [...previewSrcList];
    newPreviewList.splice(index, 1);

    const newRegisteredImages = [...registeredImages];
    newRegisteredImages.splice(index, 1);

    setPreviewSrcList(newPreviewList);
    setRegisteredImages(newRegisteredImages);
  };

  const renderPreviewImages = () => {
    const placeholders = Array.from({ length: 3 - previewSrcList.length }, (_, index) => index);

    return (
      <>
        {previewSrcList.map((src, index) => (
          <div key={index} style={{ marginLeft: '20px', position: 'relative' }}>
            <img
              src={src}
              alt={`Preview Image ${index + 1}`}
              style={{ borderRadius: '8px', maxWidth: '100px', maxHeight: '100px' }}
            />
            <button
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'red',
              }}
              onClick={() => handleCancelRegistration(index)}
            >
              &times;
            </button>
          </div>
        ))}

        {placeholders.map((_, index) => (
          <div key={index} style={{ marginLeft: '20px', backgroundColor: '#ddd', borderRadius: '8px', width: '100px', height: '100px' }} />
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
        <input type="file" accept="image/*" id="file-input" style={{display: 'none'}} onChange={handleFileSelect} multiple />
      </div>

      {renderPreviewImages()}
    </StyledImageUploader>
  );
};

export default ImageUploader;