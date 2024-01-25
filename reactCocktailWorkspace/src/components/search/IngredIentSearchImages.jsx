import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
    font-weight: 600;
    color: white;
`;

// 재료 이미지 
const IngredIentSearchImages = ({ingredientVoList}) => {

    // 디테일 페이지로 이동시키기 위해 필요한 navigate
    const navigate = useNavigate();

    // display 스타일을 조종할 boolean값
    const [categoryStates, setCategoryStates] = useState(Array(ingredientVoList.length).fill(false));

    // 마우스 오버 이벤트 발생시 setCategoryStates true값으로 설정
    const handleMouseOver = (index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
    };
    
    // 마우스 오버 이벤트 발생시 setCategoryStates false값으로 설정
    const handleMouseOut = (index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = false;
            return newStates;
        });
    };

    // 재료 리스트 반복 
    const images2 = ingredientVoList.map((ingredientVo, index) => (
        <div 
            // div태그에 고유의 키값 설정
            key={ingredientVo.ingNo} 
            // onclick이벤트 발생시 상세 페이지 이동
            onClick={()=>{navigate(`/ingredient/detail?query=${encodeURIComponent(ingredientVo.ingNo)}`)}}
        >
          <div>
            {/* 재료 이미지 */}
            <img
              src={"http://127.0.0.1:8888/app/resources/upload/ingredient/image/"+ingredientVo.ingSrc}
              alt={`ingredient ${ingredientVo.ingNo}`}
            />
            {/* 마우스 이벤트 */}
            <div
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut(index)}
            >
                {/* categoryStates에 따라 display가 달라짐 */}
                <StyledDiv
                    style={{ display: categoryStates[index] ? 'block' : 'none' }}
                >
                    {/* 재료 카테고리명 */}
                    {"#"+ingredientVo.ingCategoryName}
                </StyledDiv>
            </div>
          </div>
          <div>
            {/* 재료이름 , 설명 */}
            <div>{ingredientVo.ingName}</div>
            <div>{ingredientVo.explanation}</div>
          </div>
        </div>
      ));

    return (
        images2
    );
};

export default IngredIentSearchImages;