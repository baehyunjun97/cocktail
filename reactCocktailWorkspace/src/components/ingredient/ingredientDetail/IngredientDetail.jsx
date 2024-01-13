import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CocktailsWithIngredient from './CocktailsWithIngredient';
import IngredientProfile from './IngredientProfile';

// 디테일 컴포넌트 시작
const IngredientDetail = () => {

    // useLocation 함수를 통해 쿼리스트링의 재료 번호를 받아옴
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');
    
    // 칵테일vo와 재료vo를담은 vo state 생성
    const [cocktailsAndIngredientVo,setCocktailsAndIngredientVo] = useState([]);

    // 이펙트안에 fetch로 요청보냄
    useEffect(() => {
        fetch("http://127.0.0.1:8888/app/ingredient/detail?ingNo="+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailsAndIngredientVo(data);
            console.log(data);
        })
    },[queryValue]);

    const f01 = (e) => {
        const isLength = e.target.value.length;
        console.log(isLength);
    }

    return (
        <div>
            <input type="text" onChange={f01}/>
            <IngredientProfile cocktailsAndIngredientVo={cocktailsAndIngredientVo}/>
            <CocktailsWithIngredient cocktailsAndIngredientVo={cocktailsAndIngredientVo}/>

            <br /><br /><br />
        </div>
    );
};

export default IngredientDetail;