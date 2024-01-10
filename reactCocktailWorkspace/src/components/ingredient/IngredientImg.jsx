import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDetailDiv = styled.div`
    & > div {
        margin-top: 70px;
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

const IngredientImg = ({map}) => {

    const [ingredientVo, setIngredientVo] = useState([]);

    useEffect(() => {
        if (map && map.ingredientVo) {
            setIngredientVo(map.ingredientVo);
        }
      }, [map]);

    return (
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

export default IngredientImg;