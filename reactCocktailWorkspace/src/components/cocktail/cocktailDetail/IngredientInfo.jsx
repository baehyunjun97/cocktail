import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyleDetailDiv = styled.div`
    width: 1030px;
    margin: 74px auto 30px;
    & > div:nth-child(1){
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        & > h3{
            font-size: 16px;
            font-weight: 800;
            color: rgb(79, 79, 79);
        }
        & > div{
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
            background: white;
            box-shadow: rgba(0, 0, 0, 0.08) 3px 8px 20px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            & > div{
                width: 450px;
                display: flex;
                gap: 15px;
                & > div:nth-child(1){
                    width: 60px;
                    height: 60px;
                    background-color: rgb(250, 240, 238);
                    border-radius: 100px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > img{
                        width: 50px;
                    }
                }
                & > div:nth-child(2){
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 1 1 0%;
                    & > div{
                        display: flex;
                        gap: 10px;
                        align-items: center;
                        & > div:nth-child(1){
                            font-weight: 800;
                            color: rgb(79, 79, 79);
                        }
                        & > div:nth-child(2){
                            font-size: 12px;
                            font-weight: 800;
                            color: rgb(242, 92, 92);
                        }
                    }
                }
                & > div:nth-child(3){
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    font-weight: 600;
                    color: rgb(48, 48, 48);
                }
            }
        }
    }
    & > div:nth-child(2){
        width: 1030px;
        margin: 0px auto 30px;
    }
`;


// 재료 정보 컴포넌트
const IngredientInfo = ({ cocktailAndIngredientsVO }) => {

    // 백에서 받아온 데이터 props로 이용해 state의 저장할 예정
    const [ingredientVoList, setIngredientVoList] = useState([]);

    // 재 렌더링시 setVoList Props의 데이터로 할당
    useEffect(() => {
        if (cocktailAndIngredientsVO && cocktailAndIngredientsVO.ingredientVoList) {
            setIngredientVoList(cocktailAndIngredientsVO.ingredientVoList);
        }
    }, [cocktailAndIngredientsVO]);

    // 맵을 이용해 반복후 안에 재료 데이터를 화면에 보여줌
    const renderIngredients = () => {
        return ingredientVoList.map((ingredientVo) => (
            <div key={ingredientVo.id}>
                <div>
                    <img src={"http://127.0.0.1:8888/app/resources/upload/ingredient/image/"+ingredientVo.ingSrc} alt="" />
                </div>
                <div>
                    <div>
                        <div>{ingredientVo.ingName}</div>
                        <div>{ingredientVo.category}</div>
                    </div>
                </div>
                <div>
                    <div>{ingredientVo.amount}</div>
                    <div>{ingredientVo.amountName}</div>
                </div>
            </div>
        ));
    };

    return (
        <StyleDetailDiv>
            <div>
                <h3>재료 정보</h3>
                <div>
                    {renderIngredients()}
                </div>
            </div>
        </StyleDetailDiv>
    );
};

export default IngredientInfo;