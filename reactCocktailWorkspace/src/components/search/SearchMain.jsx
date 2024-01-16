import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import CocktailList from './CocktailSearchList';
import IngredientSearchList from './ingredientSearchList';

const StyledMainSearchDiv = styled.div`
    & > div:nth-child(1) {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        & > div {
            margin-top: 50px;
            margin-bottom: 30px;
            display: flex;
            gap: 10px;
            & > button {
                width: 157.5px;
                height: 42px;
                border-radius: 10px;
                background-color: white;
                color: rgb(89, 47, 0);
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                box-shadow: rgba(8, 10, 37, 0.03) 0rem 0.47rem 2.19rem, rgba(8, 10, 37, 0.03) 0rem 0.94rem 1.41rem, rgba(8, 10, 37, 0.05) 0rem 0.25rem 0.53rem, rgba(8, 10, 37, 0.03) 0rem 0.13rem 0.19rem;
                &:hover {
                    background: rgb(242, 92, 92);
                }
            }
        }
    }
    & > div:nth-child(2) > div:nth-child(1) {
        width: 100%;
        max-width: 1030px;
        margin: 0 auto 30px;
        display: flex;
        align-items: center;
        & > h3 {
            font-size: 16px;
            line-height: 16px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: rgb(79, 79, 79);
        }
    }
    & > div:nth-child(2) > div:nth-child(2) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                &> img {
                    width: 100%;
                    height: 220px;
                    border-radius: 10px;
                    object-fit: cover;
                }
                & > div  {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    padding: 10px 20px;
                    &:hover {
                        background: linear-gradient(
                            180deg,
                            rgba(84,85,91,.7),
                            hsla(234,8%,53%,.3)
                        );
                        transition: all .3s;
                    }
                    & > div > div {
                        padding-bottom: 5px;
                        font-weight: 600;
                        color: white;
                        & > div {
                            padding-bottom: 5px;
                        }
                    }
                }
            }
            & > div:nth-child(2){
                /* height: 62px; */
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-weight: 800;
                }
                & > div:nth-child(2){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgb(131, 131, 131);
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
    & > div:nth-child(3) > div:nth-child(1) {
        width: 100%;
        max-width: 1030px;
        margin: 0 auto 30px;
        display: flex;
        align-items: center;
        & > h3 {
            font-size: 16px;
            line-height: 16px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: rgb(79, 79, 79);
        }
    }
    & > div:nth-child(3) > div:nth-child(2) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                & > img {
                    width: 100%;
                    height: 220px;
                    border-radius: 10px;
                    background-size: cover;
                }
                & > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    &:hover{
                        background : linear-gradient(
                            180deg,
                            rgba(84,85,91,.7),
                            hsla(234,8%,53%,.3)
                        );
                        transition: all .3s;
                    }
                    & > div {
                        padding: 10px 20px;
                        font-weight: 600;
                        color: white;
                    }
                }
            }
            & > div:nth-child(2){
                /* height: 62px; */
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-weight: 800;
                }
                & > div:nth-child(2){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgb(131, 131, 131);
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
`;

// searchMain
const SearchMain = () => {
    
    // 쿼리스트링에 값을 받아옴
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');

    const navigate = useNavigate();

    // state들
    const [cocktailVoList, setCocktailVoList] = useState([]);
    const [ingredientVoList, setIngredientVoList] = useState([]);

    const [isCocktailListVisible, setIsCocktailListVisible] = useState(true);
    const [isIngredientListVisible, setIsIngredientListVisible] = useState(true);

    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 렌더링시 요청보내기
    useEffect(() => {
        fetch('http://127.0.0.1:8888/app/cocktail/search?searchName='+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailVoList(data.cocktailVoList);
            setIngredientVoList(data.ingredientVoList);
        })
        .catch((e)=>{
            console.log(e);
            navigateCallback();
        })
    },[queryValue,navigateCallback]);

    // display를 block or none
    const handelClickAllList = () => {
        setIsCocktailListVisible(true);
        setIsIngredientListVisible(true);
    }

    const handelCocktailList = () => {
        setIsCocktailListVisible(true);
        setIsIngredientListVisible(false);
    }

    const handelIngredientList = () => {
        setIsIngredientListVisible(true);
        setIsCocktailListVisible(false);
    }

    return (
        <StyledMainSearchDiv>
            <div>
                <div>
                    <button onClick={handelClickAllList}>전체</button>
                    <button onClick={handelCocktailList}>칵테일</button>
                    <button onClick={handelIngredientList}>재료</button>
                </div>
            </div>
            {isCocktailListVisible && <CocktailList cocktailVoList={cocktailVoList} />}
            {isIngredientListVisible && <IngredientSearchList ingredientVoList={ingredientVoList} />}
            <br /><br /><br /><br /><br />
        </StyledMainSearchDiv>
    );
};

export default SearchMain;
