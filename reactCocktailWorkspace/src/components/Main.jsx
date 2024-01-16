import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CocktailMain from './cocktail/CocktailMain';
import IngredientMain from './ingredient/IngredientMain';
import SearchMain from './search/SearchMain';



const Main = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<CocktailMain />}></Route>
                <Route path='/cocktail/*' element={<CocktailMain />}></Route>
                <Route path='/search' element={<SearchMain />}></Route>
                <Route path='/ingredient/*' element={<IngredientMain />}></Route>
                

            </Routes>
        </>
    );
};

export default Main;