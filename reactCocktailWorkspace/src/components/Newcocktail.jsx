import React from 'react';
import FormContainer from './newcocktails/FormContainer';
import HeadContainer from './newcocktails/HeadContainer';
import styled from 'styled-components';

const StyledFormContainer = styled.div`
    height: 100%;
    padding: 0px 50px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(48, 48, 48);
`;

const StyledNewCocktailDiv = styled.div`
    display: grid;
    grid-template-columns: 0.8fr;
    grid-auto-rows: auto;
    justify-content: center;
    align-items: center;

    //font는 적용 일단 미룸 - 
    font-family: NanumGothic, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: normal;
    color: rgb(48, 48, 48);
    line-height: 1.2;
    letter-spacing: -0.5px;

    
`;


const Newcocktail = () => {
    return(
    <StyledNewCocktailDiv>
        <HeadContainer/>
        
        <StyledFormContainer>
            <FormContainer/>
            
        </StyledFormContainer>

    </StyledNewCocktailDiv>
    );
};

export default Newcocktail;