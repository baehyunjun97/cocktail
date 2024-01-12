import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CocktailList from './cocktailList/CocktailList';
import CocktailDetail from './cocktailDetail/CocktailDetail';

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