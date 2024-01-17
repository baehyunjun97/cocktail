import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDetailDiv = styled.div`
    width: 1030px;
    margin: 0px auto 30px;
    margin-bottom: 100px;
    & > h3{
        font-size: 16px; 
        font-weight: 800;
        margin-bottom: 30px;
    }
    & > div{
        padding: 50px;
        box-shadow: 3px 8px 20px rgba(0,0,0,.08);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > pre{
            line-height: 2;
            font-size: 18px;
            font-weight: 600;
            color: #6e6e6e;
            /* white-space: pre-wrap; */
            white-space: pre-line;
        }
    }
`;

// 레시피 설명 컴포넌트
const RecipeDescription = ({ cocktailAndIngredientsVO }) => {

    // 레시피 설명 데이터를 가지고 있는 state 
    const [recipeExplan, setRecipeExplan] = useState();

    // 재 렌더링이 발생시 props의 data로 재 할당
    useEffect(() => {
        if (cocktailAndIngredientsVO && cocktailAndIngredientsVO.cocktailVo && cocktailAndIngredientsVO.cocktailVo.recipeExplan) {
            setRecipeExplan(cocktailAndIngredientsVO.cocktailVo.recipeExplan);
        }
    }, [cocktailAndIngredientsVO]);

    // 상태확인후 문제가 있다면 null로 처리
    if (!recipeExplan) {
        return null;
    }

    // ... .1 .2 .3이런 기준으로 줄바꿈을 함
    const formattedText = recipeExplan.replace(/(\d+)\.\s/g, '\n$1.');

    return (
        <StyledDetailDiv>
            <h3>레시피 설명</h3>
            <div>
                <pre>
                    {formattedText}
                </pre>
            </div>
        </StyledDetailDiv>
    );
};

export default RecipeDescription;