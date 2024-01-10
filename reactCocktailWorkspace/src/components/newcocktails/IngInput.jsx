import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledIngInputDiv = styled.div`
    width: 100%;
    padding: 24px;
    border-radius: 10px;
    background-color: rgb(243, 243, 243);
    display: flex;
    flex-direction: column;
    gap: 10px;

  & input{
    width: 100%;
    padding: 12.5px 15px;
    line-height: 19px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 46px;
    color: rgb(48, 48, 48);
    font-weight: 600;

    & button{
      border: 2px solid rgb(131, 131, 131);
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(110, 110, 110);
    cursor: auto;
    }
}
`;

const IngredientForm = ({ handleInputChange }) => {
  return (
    <div>
      <h2>재료 등록</h2>
      <div>
        <label>재료(넘버):</label>
        <input type="text" name="ingNo" onChange={handleInputChange} />
        <br />
        <label>용량:</label>
        <input type="text" name="amount" onChange={handleInputChange} />
        <br />
        <label>계량:</label>
        <input type="text" name="amountNo" onChange={handleInputChange} />
      </div>
    </div>
  );
};

const IngInput = ({ onAddIngredient }) => {
  const [formCount, setFormCount] = useState(1);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('현재 배열:', ingredients);
  }, [ingredients]);

  const handleInputChange = (e) => {
    // 값의 변화시 마다 (추후 select에서 처리할 것.)
  };

  const handleAddIngredient = () => {
    const formData = {
      ingNo: document.getElementsByName('ingNo')[0].value,
      amount: document.getElementsByName('amount')[0].value,
      amountNo: document.getElementsByName('amountNo')[0].value,
    };

    // Ing 배열에 폼데이터 넣기
    setIngredients((prevIngredients) => [...prevIngredients, formData]);

    // 배열크기 증가
    setFormCount((prevFormCount) => prevFormCount + 1);
  };

  return (
    <StyledIngInputDiv>
      {[...Array(formCount)].map((_, index) => (
        <IngredientForm key={index} index={index} handleInputChange={handleInputChange} />
      ))}

      <button onClick={handleAddIngredient} type='button'>재료 추가</button>
    </StyledIngInputDiv>
  );
};

export default IngInput;