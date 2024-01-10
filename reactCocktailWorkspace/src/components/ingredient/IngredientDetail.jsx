import React, { useEffect, useState } from 'react';
import IngredientImg from './IngredientImg';
import CocktailsWithIngredient from '../cocktail/CocktailsWithIngredient';
import { useLocation } from 'react-router-dom';

 

const IngredientDetail = () => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');
    
    const [map,setMap] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8888/app/ingredient/detail?ingNo="+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setMap(data);
            console.log(data);
        })
    },[queryValue]);

    return (
        <div>
            <IngredientImg map={map}/>
            <CocktailsWithIngredient map={map}/>
            <br /><br /><br />
        </div>
    );
};

export default IngredientDetail;