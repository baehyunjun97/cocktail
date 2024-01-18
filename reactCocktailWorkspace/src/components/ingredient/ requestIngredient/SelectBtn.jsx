import React from 'react';
import styled from 'styled-components';

const StyledSelectBtnSpan = styled.span`
    border: 1.4px solid #e6e4e8;
    transition: all .2s;
    font-size: 14px;
    font-weight: 600;
    color: #6e6e6e;
    height: 36px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    background-color: white;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
        background-color: rgb(242, 92, 92);
        color: rgb(255, 255, 255);
    }
`;

const SelectBtn = ({idx,name,no,btnActive,setState,setBtnActive}) => {

    const changeCategory = (e,no) => {
        if (e.target.innerText === btnActive) {
            // 클릭한 버튼이 이미 활성화된 상태일 때
            setState(""); // 상태 초기화
            setBtnActive(""); // btnActive 초기화
          } else {
            // 클릭한 버튼이 비활성화된 상태일 때
            const listNo = no;
            setState(listNo);
            setBtnActive(e.target.innerText);
          }
    }

    return (
        <StyledSelectBtnSpan
            key={idx}
            className={"btn" + (name === btnActive ? " active" : "")}
            onClick={(e) => {
                changeCategory(e,no)
            }}
        >
            {name}
        </StyledSelectBtnSpan>
    );
};

export default SelectBtn;