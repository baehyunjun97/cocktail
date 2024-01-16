import React from 'react';
import CocktailImages from './CocktailSearchImages';
import Title from './Title';

const CocktailSearchList = ({cocktailVoList}) => {

    return (
        <div>
            <Title title={"칵테일"} src={"https://www.masileng.com/test/ic_cocktail.svg"}/>
            <div>
            {cocktailVoList.length !== 0 ? (
                <CocktailImages cocktailVoList={cocktailVoList}/>
            ) : (
                // 결과가 없을시
                <div className='noSearch'>
                    <img src="https://www.masileng.com/test/ic_tab.svg" alt="" />
                    <div>
                        검색 결과가 없습니다.
                    </div>
                </div>
            )}
            </div>
        </div>
    )
};

export default CocktailSearchList;