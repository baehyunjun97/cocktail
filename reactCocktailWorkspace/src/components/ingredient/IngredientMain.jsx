import React from 'react';
import {Routes, Route} from 'react-router-dom';
import IngredientList from './IngredientList';
import IngredientDetail from './IngredientDetail';

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