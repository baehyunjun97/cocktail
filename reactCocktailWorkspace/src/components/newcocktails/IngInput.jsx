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

const IngredientForm = ({ index, onDelete, handleChangeIng, isLast }) => {
  return (
    <div>
      <h2>재료 등록</h2>
      <div>
        재료(넘버):
        <input type="text" name={`ingNo_${index}`} onChange={(e) => handleChangeIng(index, 'ingNo', e.target.value)} />
        <br />
        용량:
        <input type="text" name={`amount_${index}`} onChange={(e) => handleChangeIng(index, 'amount', e.target.value)} />
        <br />
        계량:
        <input type="text" name={`amountNo_${index}`} onChange={(e) => handleChangeIng(index, 'amountNo', e.target.value)} />
        <br />
        {isLast && <button onClick={() => onDelete(index)}>재료 삭제</button>}
      </div>
    </div>
  );
};

const IngInput = ({ onChangeIngredients }) => {
  const [formCount, setFormCount] = useState(1);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('현재 배열:', ingredients);
    onChangeIngredients(ingredients); // Notify the parent component about the updated ingredients
  }, [ingredients, onChangeIngredients]);

  const handleChangeIng = (index, fieldName, value) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [fieldName]: value,
      };

      return updatedIngredients;
    });
  };

  const handleAddIngredient = () => {
    setFormCount((prevFormCount) => prevFormCount + 1);
  };

  const handleDeleteIngredient = (index) => {
    if (formCount > 1) {
      setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
      setFormCount((prevFormCount) => prevFormCount - 1);
    }
  };

  return (
    <StyledIngInputDiv>
      {[...Array(formCount)].map((_, index) => (
        <IngredientForm key={index} index={index} onDelete={handleDeleteIngredient} handleChangeIng={handleChangeIng} isLast={index === formCount - 1}/>
      ))}

      <button onClick={() => handleAddIngredient(formCount - 1)} type="button">
        재료 추가
      </button>
    </StyledIngInputDiv>
  );
};

export default IngInput;