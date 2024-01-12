import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CocktailProfile from './CocktailProfile';
import IngredientInfo from '../ingredient/IngredientInfo';
import RecipeDescription from './RecipeDescription';

const StyledDetailDiv = styled.div`

`;

const CocktailDetail = () => {

    const navigate = useNavigate();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');
    
    const [map,setMap] = useState([]);

    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:8888/app/cocktail/detail?cocktailNo="+queryValue)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("fetch 요청문제로 에러 발생..");
                }
                return resp.json();
            })
            .then((data) => {
                setMap(data);
            })
            .catch((e) => {
                console.log(e);
                navigateCallback();
            });
    }, [queryValue, navigateCallback]);
  
    return (
        <StyledDetailDiv>
            <CocktailProfile map={map}/>
            <IngredientInfo map={map}/>
            <RecipeDescription map={map}/>
        </StyledDetailDiv>
    );
};

export default CocktailDetail;