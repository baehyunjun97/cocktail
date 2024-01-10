import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CocktailList from './CocktailList';
import CocktailDetail from './CocktailDetail';

const CocktailMain = () => {
    return (
        <>
            <Routes>
                <Route path='/*' element={<CocktailList />}/>
                <Route path='/detail' element={<CocktailDetail />}/>
            </Routes>
        </>
    );
};

export default CocktailMain;