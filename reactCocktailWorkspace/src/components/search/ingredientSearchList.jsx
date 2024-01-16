import React from 'react';
import IngredIentSearchImages from './IngredIentSearchImages';
import Title from './Title';

const IngredientSearchList = ({ingredientVoList}) => {

  return(
    <div>
        {/* title */}
        <Title title={"재료"} src={"https://www.masileng.com/test/ic_ingredient.svg"}/>
        {/* length가 0이 아니면 실행 */}
        {ingredientVoList.length !== 0 ? (
            <div>
                <IngredIentSearchImages ingredientVoList={ingredientVoList} />
            </div>
        ) : (
        // 결과가 없을시
        <div style={{ width: "1000px" }}>
            <div className='noSearch'>
                <img src="https://www.masileng.com/test/ic_tab.svg" alt="" />
                <div>
                    검색 결과가 없습니다.
                </div>
            </div>
        </div>
        )}
    </div>
  )
    
};

export default IngredientSearchList;