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

const RecipeDescription = ({ map }) => {

    const [recipeExplan, setRecipeExplan] = useState();

    useEffect(() => {
        if (map && map.cocktailVo && map.cocktailVo.recipeExplan) {
            setRecipeExplan(map.cocktailVo.recipeExplan);
        }
    }, [map]);

    if (!recipeExplan) {
        return null;
    }

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