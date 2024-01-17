import React from 'react';
import IngReqTitle from './IngReqTitle';
import styled from 'styled-components';

const StyledIngGuide = styled.div`
    margin: 10px;
    margin-top: 40px;
    & > textarea {
        width: 100%;
        min-height: 150px;
        padding: 12.5px 15px;
        line-height: 19px;
        font-size: 16px;
        border: 1.4px solid rgb(230, 228, 232);
        border-radius: 10px;
        resize: none;
        overflow: visible;
        transition: all 0.2s ease 0s;
        height: 46px;
        color: rgb(48, 48, 48);
        font-weight: 600;
    }
`;

const IngGuide = ({guide}) => {
    return (
        <StyledIngGuide>
            <IngReqTitle title="재료 설명"/>
            <textarea name={guide} cols="30" rows="10"></textarea>
        </StyledIngGuide>
    );
};

export default IngGuide;