import React, { useState } from 'react';
import ImgUploader from './ImgUploader';
import styled from 'styled-components';
import TextInput from './TextInput';
import IngInput from './IngInput';
import ExplanInput from './ExplanInput'
import { Link, useNavigate } from 'react-router-dom';

const StyledFormContainerDiv = styled.div`
    justify-content: center;
    align-items: center;
    margin: 30px;
    padding: 15px;

    & .registButton{
        width: 100%;
    height: 52px;
    padding-left: 10px;
    margin-top: 65px;
    border-radius: 10px;
    box-shadow: rgba(228, 32, 32, 0.2) 3px 6px 20px;
    background-color: rgb(242, 92, 92);
    color: rgba(255, 255, 255, 0.85);
    font-weight: bold;
    font-size: 18px;
    letter-spacing: -1px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    align-self: flex-end;
    gap: 5px;
    }

    & input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

const FormContainer = () => {
    const [ingredients, setIngredients] = useState([]);
    const [img, setImg] = useState([]);

    //재료배열 업데이트
    const handleIngredientsChange = (updatedIngredients) => {
        setIngredients(updatedIngredients);
    };
    //사진배열 업데이트
    const handleImgSetting = (updatedImg) => {
        setImg(updatedImg);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let formData = new FormData();
          for(let i=0; i<img.length;i++){
            formData.append('imgList', img[i]); 
          }
					formData.append('memberNo', '1');
					formData.append('nameKor', e.target.name_kor.value);
					formData.append('nameEng', e.target.name_eng.value);
          formData.append('recipeListJsonStr', JSON.stringify(ingredients));
					formData.append('commentary', e.target.cocktail_explan.value);
					formData.append('recipeExplan', e.target.recipe_explan.value);
					formData.append('categoryNo', e.target.categoryNo.value);
    
          // fetch
          fetch("http://127.0.0.1:8888/app/cocktail/regist", {
            method: "POST",
            body: formData,
          })
            .then(resp => resp.json())
            .then(data => {
              // console.log(window.alert);
              // alert(data.msg); 
            });
        };
    
    return (
        <>
        <StyledFormContainerDiv>
            <form onSubmit={handleSubmit}>
                <ImgUploader onRegisteredImagesChange={handleImgSetting} />
                <TextInput title="칵테일 이름" maxText="20" data="name_kor" heigth="46px" />
                <TextInput title="칵테일 영문 이름" maxText="20" data="name_eng" heigth="46px" />
                <ExplanInput title="칵테일 설명" maxText="200" data="cocktail_explan" heigth="200px" />
                <IngInput onChangeIngredients={handleIngredientsChange} />
                <ExplanInput title="레시피 설명" maxText="200" data="recipe_explan" heigth="200px" />
                <TextInput title="칵테일 카테고리" maxText="20" data="categoryNo" heigth="46px" />
                <button className='registButton'>레시피 등록</button>
            </form>
        </StyledFormContainerDiv>
        </>
    );
};

export default FormContainer;