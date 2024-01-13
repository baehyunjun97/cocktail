import React from 'react';
import {Routes, Route} from 'react-router-dom';
import IngredientList from './ingredientList/IngredientList';
import IngredientDetail from './ingredientDetail/IngredientDetail';

const IngredientMain = () => {
    return (
        <>
            <Routes>
                <Route path='/list' element={<IngredientList />}/>
                <Route path='/detail' element={<IngredientDetail />}/>
            </Routes>
        </>
    );
};

export default IngredientMain;