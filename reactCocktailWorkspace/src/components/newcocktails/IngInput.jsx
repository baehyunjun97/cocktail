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

  & input {
    width: 100%;
    padding: 12.5px 15px;
    line-height: 19px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 46px;
    color: rgb(48, 48, 48);
    font-weight: 600;
  }
`;

const IngredientForm = ({ index, onDelete }) => {
  return (
    <div>
      <h2>재료 등록</h2>
      <div>
        재료(넘버):
        <input type="text" name={`ingNo_${index}`} />
        <br />
        용량:
        <input type="text" name={`amount_${index}`} />
        <br />
        계량:
        <input type="text" name={`amountNo_${index}`} />
        <br />
        <button onClick={() => onDelete(index)}>재료 삭제</button>
      </div>
    </div>
  );
};

const IngInput = () => {
  const [formCount, setFormCount] = useState(1);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('현재 배열:', ingredients);
  }, [ingredients]);

  // 재료 추가 버튼 함수
  const handleAddIngredient = (index) => {
    const ingNoValue = document.querySelector(`input[name="ingNo_${index}"]`).value;
    const amountValue = document.querySelector(`input[name="amount_${index}"]`).value;
    const amountNoValue = document.querySelector(`input[name="amountNo_${index}"]`).value;

    const formData = {
      index: index,
      ingNo: ingNoValue,
      amount: amountValue,
      amountNo: amountNoValue,
    };

    // Ing 배열에 폼데이터 넣기
    setIngredients((prevIngredients) => [...prevIngredients, formData]);

    // 배열크기 증가
    setFormCount((prevFormCount) => prevFormCount + 1);
  };

  // 재료 삭제 버튼 함수
  const handleDeleteIngredient = (index) => {
    setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
    setFormCount((prevFormCount) => prevFormCount - 1);
  };

  return (
    <StyledIngInputDiv>
      {[...Array(formCount)].map((_, index) => (
        <IngredientForm key={index} index={index} onDelete={handleDeleteIngredient} />
      ))}

      <button onClick={() => handleAddIngredient(formCount - 1)} type="button">
        재료 추가
      </button>
    </StyledIngInputDiv>
  );
};

export default IngInput;
