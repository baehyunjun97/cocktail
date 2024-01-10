import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Newcocktail from './Newcocktail';

const RecipeUploadLayout = ( ) => {

    const StyledLayoutDiv = styled.div`
        
    `;

    return (
        <StyledLayoutDiv>
            <Header />
            <Newcocktail/>
        </StyledLayoutDiv>
    );
};
export default RecipeUploadLayout;