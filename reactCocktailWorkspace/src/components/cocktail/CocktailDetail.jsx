import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CocktailImg from './CocktailImg';
import IngredientInfo from '../ingredient/IngredientInfo';
import RecipeDescription from './RecipeDescription';

const StyledDetailDiv = styled.div`

`;

const CocktailDetail = () => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');
    
    const [map,setMap] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8888/app/cocktail/detail?cocktailNo="+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setMap(data);
        })
    },[queryValue]);

    return (
        <StyledDetailDiv>
            <CocktailImg map={map}/>
            <IngredientInfo map={map}/>
            <RecipeDescription map={map}/>
        </StyledDetailDiv>
    );
};

export default CocktailDetail;