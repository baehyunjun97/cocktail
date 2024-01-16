import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDetailDiv = styled.div`
    & > div {
        margin-top: 10px;
        height: 512px;
        background: linear-gradient(#303030,#3c3a3a);
        padding: 58px 0;
        display: flex;
        justify-content: center;
        & > div:nth-child(1) {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 80px;
        }
        & > img:nth-child(2){
            width: 520px;
            height: 100%;
            margin-left: 20px;
            border-radius: 10px;
            background-size: cover;
            background-color: white;
        }
        & > div:nth-child(3){
    margin-left: 50px;
    flex: 0 0 100%; 
    max-width: 440px; 
    
    & > div:nth-child(1){
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        & > div{
            font-size: 14px;
            font-weight: 800;
            color: rgb(242, 92, 92);
        }
    }
            & > div:nth-child(2){
                margin-top: 30px;
                gap: 10px;
                display: flex;
                align-items: flex-end;
                & > div:nth-child(1){
                    font-size: 28px;
                    font-weight: 800;
                    color: rgb(255, 255, 255);
                }
                & > div:nth-child(2){
                    font-size: 15px;
                    font-weight: 900;
                    color: rgb(110, 110, 110);
                }
            }
            & > div:nth-child(3){
                line-height: 1.8;
                color: rgb(193, 193, 193);
                height: auto;
                font-size: 16px;
                font-weight: normal;
            }
            & > div:nth-child(4){
                display: flex;
                margin-top: 10px;
                & > div{
                    height: 35px;
                    padding-left: 20px;
                    padding-right: 20px;
                    background-color: transparent;
                    border: 1.6px solid rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                    color: rgb(162, 162, 162);
                    font-size: 13px;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                }
            }
        }
    }
`;

// 재료 프로필
const IngredientProfile = ({cocktailsAndIngredientVo}) => {

    // 재료의 데이터를 담을 vo
    const [ingredientVo, setIngredientVo] = useState([]);

    // 이펙트 발생시 props로 받은 데이터 체크루 set해줌
    useEffect(() => {
        if (cocktailsAndIngredientVo && cocktailsAndIngredientVo.ingredientVo) {
            setIngredientVo(cocktailsAndIngredientVo.ingredientVo);
        }
    }, [cocktailsAndIngredientVo]);

    return (
        // 받은 데이터로 화면에 보여줌
        <StyledDetailDiv>
            <div>
                <div>
                </div>
                <img src={ingredientVo.ingSrc} alt={ingredientVo.ingSrc} />
                <div>
                    <div>
                        <div>#{ingredientVo.ingCategoryName}</div>
                    </div>
                    <div>
                        <div>{ingredientVo.ingName}</div>
                    </div>
                    <div>{ingredientVo.explanation}</div>
                    {ingredientVo.alc !== '0' ? (
                        <div>
                            <div>도수 : {ingredientVo.alc}도</div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </StyledDetailDiv>
    );
};

export default IngredientProfile;