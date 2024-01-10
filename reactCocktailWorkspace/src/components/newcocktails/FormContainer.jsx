import React from 'react';
import ImgUploader from './ImgUploader';
import styled from 'styled-components';
import TextInput from './TextInput';
import IngInput from './IngInput';
import ExplanInput from './ExplanInput'

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
`;

const FormContainer = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            memberNo: '1',
            nameKor: e.target.name_kor.value,
            nameEng: e.target.name_eng.value,
            commentary: e.target.cocktail_explan.value,
            recipeExplan: e.target.recipe_explan.value,
            };

        fetch("http://127.0.0.1:8888/app/api/cocktail/regist" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData),
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
        } )
        ;
    };
    
    return (
        <>
        <StyledFormContainerDiv>
            <form onSubmit={handleSubmit}>
                <ImgUploader/>
                <TextInput title="칵테일 이름" maxText="20" data="name_kor" heigth="46px" />
                <TextInput title="칵테일 영문 이름" maxText="20" data="name_eng" heigth="46px" />
                <ExplanInput title="칵테일 설명" maxText="200" data="cocktail_explan" heigth="200px" />
                <IngInput />
                <ExplanInput title="레시피 설명" maxText="200" data="recipe_explan" heigth="200px" />
                <button className='registButton' onClick={(data) => {console.log(data);}}>레시피 등록</button>
            </form>
        </StyledFormContainerDiv>
        </>
    );
};

export default FormContainer;