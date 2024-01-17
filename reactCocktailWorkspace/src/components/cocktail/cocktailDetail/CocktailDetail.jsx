import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CocktailProfile from './CocktailProfile';
import RecipeDescription from './RecipeDescription';
import IngredientInfo from './IngredientInfo';

// styledComponent
const StyledDetailDiv = styled.div`

`;

// 칵테일 디테일 컴포넌트
const CocktailDetail = () => {

    // useNavigate함수
    const navigate = useNavigate();

    // useLoction함수로 쿼리스트링 이용해서 데이터 받아오기
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');
    
    // 칵테일 vo ,재료voList를 다음 vo 스테이트 생성
    const [cocktailAndIngredientsVO,setCocktailAndIngredientsVO] = useState([]);

    // useCallBack을 이용해서 useEffect안에 에러 처리후 url이동가능
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);
    
    // 첫 로딩시에 요청보냄
    useEffect(() => {
        console.log(queryValue);
        fetch("http://127.0.0.1:8888/app/cocktail/detail?cocktailNo="+queryValue)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("fetch 요청문제로 에러 발생..");
                }
                return resp.json();
            })
            .then((data) => {
                setCocktailAndIngredientsVO(data);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
                navigateCallback();
            });
    }, [queryValue, navigateCallback]);
  
    return (
        <StyledDetailDiv>
            <CocktailProfile cocktailAndIngredientsVO={cocktailAndIngredientsVO}/>
            <IngredientInfo cocktailAndIngredientsVO={cocktailAndIngredientsVO}/>
            <RecipeDescription cocktailAndIngredientsVO={cocktailAndIngredientsVO}/>
        </StyledDetailDiv>
    );
};

export default CocktailDetail;