import React from 'react';
import styled from 'styled-components';

const StyledTitleDiv = styled.div`
    & > h3 { 
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
`;

const IngReqTitle = ({title}) => {
    return (
        <StyledTitleDiv>
            <h3>{title}</h3>
        </StyledTitleDiv>
    );
};

export default IngReqTitle;