import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IngSearchModal from './IngSearchModal';

const StyledIngInputDiv = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 10px;
  background-color: rgb(243, 243, 243);
  display: flex;
  flex-direction: column;
  gap: 10px;

  & h2{
      line-height: 16px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: rgb(79, 79, 79);
      padding-top: 1rem;
      padding-bottom: 0.5rem;
  }

  & input, select , .inputDiv {
    width: 100%;
    padding-left: 12.5px;
    line-height: 19px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 46px;
    color: rgb(48, 48, 48);
    font-weight: 600;   
  }


  & button{
    margin-top: 5px;
    padding: 3px;
    border: 2px solid rgb(131, 131, 131);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(110, 110, 110);
    font-weight: 550;
    cursor: auto;
  }
`;

//component IngredientForm
const IngredientForm = ({ index, onDelete, handleChangeIng, isLast ,handleSelectedNo }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  
  return (
    <div>
      <h2>재료 등록</h2>
      <div>
        재료(넘버):
        {/* MODAL */}
        <div 
          onClick={() => setModalVisible(!isModalVisible)} 
          name={`ingNo_${index}`} 
          onChange={(e) => {
            handleChangeIng(index, 'ingNo', e.target.value);
          }}
        >
           <div className='inputDiv'>
             재료를 추가해주세요. 
             <IngSearchModal isModalVisible={isModalVisible} />
           </div>
        </div>

        <br />
        용량 :
        <input type="text" name={`amount_${index}`} onChange={(e) => handleChangeIng(index, 'amount', e.target.value)} placeholder='용량을 입력해주세요'/>
        <br />
        계량:
        <select name={`amountNo_${index}`} onChange={(e) => handleChangeIng(index, 'amountNo', e.target.value)}>
          <option value="1">ml</option>
          <option value="2">gram</option>
          <option value="3">spoon</option>
        </select>

        <br />
        {isLast && <button onClick={() => onDelete(index)}>재료 삭제</button>}
      </div>
    </div>
  );
};

//component IngInput
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
        <IngredientForm 
          key={index} 
          index={index} 
          onDelete={handleDeleteIngredient} 
          handleChangeIng={handleChangeIng} 
          isLast={index === formCount - 1}
          />
      ))}

      <button onClick={() => handleAddIngredient(formCount - 1)} type="button">
        재료 추가
      </button>
    </StyledIngInputDiv>
  );
};

export default IngInput;