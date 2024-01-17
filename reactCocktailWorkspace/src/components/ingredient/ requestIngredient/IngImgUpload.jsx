import React, { useState } from 'react';
import styled from 'styled-components';
import IngReqTitle from './IngReqTitle';

const StyledUploadDiv = styled.div`
    margin: 10px;
    & > div {
        margin-top: 22px;
        display: flex;
        gap: 10px;
        & label {
            position: relative;
            & input {
                opacity: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                cursor: pointer;
            }
            & button {
                width: 150px;
                height: 150px;
                border-radius: 10px;
                font-size: 12.8px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                border: 2px solid rgb(48, 48, 48);
                color: rgb(79, 79, 79);
                font-weight: 600;
                transition: all 0.2s ease 0s;
                background-color: white;
            }
        }
        & > div {
            background-color: #ddd;
            width: 150px;
            margin-left: 20px;
            border-radius: 8px;

            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
        }
    }
`;

const IngImgUpload = () => {
    
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <StyledUploadDiv>
            <IngReqTitle title="재료 사진"/>
            <div>
                <label htmlFor="fileUpload">
                    <input type="file" id="fileUpload" onChange={handleFileChange} />
                    <button>
                        <img src="https://www.masileng.com/test/upload-photo.png" alt="" />
                        사진업로드
                    </button>
                </label>
                <div>
                    {previewImage && <img src={previewImage} alt="미리보기" />}
                </div>
            </div>
        </StyledUploadDiv>
    );
};

export default IngImgUpload;