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

  & .inputDiv {
    background-color: white;
    width: 100%;
    padding-top: 0.8rem;
    padding-left: 12.5px;
    line-height: 19px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 2.7rem;
    font-weight: 600; 
  }

  & input, select {
    width: 100%;
    padding-left: 12.5px;
    margin-bottom: 5px;
    line-height: 19px;
    
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 46px;
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
const IngredientForm = ({ index, onDelete, handleChangeIng, isLast, ingredients }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIng, setSelectedIng] = useState("");
  const [options, setOptions] = useState([]);

  // 선택한 재료 정보
  const handleSelectedIng = (ingVo) => {
      setSelectedIng(ingVo);
  };
  //엔터 입력 금지
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  //휠 방지
  const handleWheelSetup = () => {
    document.querySelector(`[name=amount_${index}]`).addEventListener('wheel', handleWheel, { passive: false });
  };

  const handleWheel = (event) => {
    event.preventDefault();
  };
  
  useEffect( () => {
    
    // fetch - get 시에는 재료단위의 배열을 불러온다.
    fetch("http://127.0.0.1:8888/app/cocktail/regist")
    .then(resp=> resp.json())
    .then( data => {
        handleWheelSetup();
        setOptions(data);
        handleChangeIng(index, 'amountNo', '1');
      });
  }, []);

  return (
    <div>
      <h2>재료 등록</h2>
      <div>
        {/* MODAL */}
        <div 
          onClick={() => {setModalVisible(!isModalVisible);}}
          name={`ingNo_${index}`} 
        >
           <div className='inputDiv'>
              {selectedIng && selectedIng.no ? (
                    <p>{`${selectedIng.name}`}</p>
                ) : (
                  <p>재료를 입력하세요</p>
                )}
             <IngSearchModal 
                isModalVisible={isModalVisible} 
                onHandleSelectedIng = {handleSelectedIng} 
                ingredients = {ingredients}
                inputIndex = {index}
                handleChangeIng = {handleChangeIng}
             />
           </div>
        </div>

        <br />
        <input type="number" name={`amount_${index}`}
               onWheel={handleWheel}
               onKeyDown={handleKeyDown}
               onChange={ (e) => handleChangeIng(index, 'amount', e.target.value)} 
               placeholder='용량을 입력해주세요'
               />
        <br />

        {/* 재료단위 select */}
        <div className='amountSelector'>
          {options.length > 0 && (
            <select 
                name={`amountNo_${index}`}
                onChange={(e) => {
                handleChangeIng(index, 'amountNo', e.target.value);
                }}
            >
              {options.map((option) => (
                <option key={option.no} value={option.no}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </div>

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
          ingredients = {ingredients}
          />
      ))}

      {/* 마지막 요소가 3개 이상 차있어야 클릭 가능 */}
      {ingredients.length > 0 && ingredients[formCount - 1] && typeof ingredients[formCount - 1] === 'object' && Object.keys(ingredients[formCount - 1]).length < 3 ? (
        <button type="button" disabled>
          재료 추가
        </button>
      ) : (
        <button onClick={() => handleAddIngredient(formCount - 1)} type="button">
          재료 추가
        </button>
      )}

    </StyledIngInputDiv>
  );
};

export default IngInput;