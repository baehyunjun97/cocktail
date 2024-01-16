import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const StyledListDiv = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    & > div:nth-child(1) {
        margin: auto;
        display: inline-block;
        margin-bottom: 50px;
        & > button {
        font-weight: 600;
        color: #6e6e6e;
        height: 30px;
        margin: 0px 3px;
        padding: 0px 20px;
        box-shadow: 0 0.47rem 2.19rem rgba(8, 10, 37, 0.03), 0 0.94rem 1.41rem rgba(8, 10, 37, 0.03), 0 0.25rem 0.53rem rgba(8, 10, 37, 0.05), 0 0.13rem 0.19rem rgba(8, 10, 37, 0.03);
    }
    }
    
    & > div:nth-child(2) {
        margin: auto;
        width: 90vw;
        display: grid;
        grid-template-columns: repeat(auto-fill, 302px);
        grid-gap: 30px 20px;
        justify-content: center;
        & > div {  // 스타일을 적용할 div 추가
            width: 302px;
            height: 292px;
            cursor: pointer;
            & > div:nth-child(1){
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                /* z-index: -1; */
                & > img {
                  
                  width: 100%;
                  height: 220px;
                  border-radius: 10px;
                  background-size: cover;
                  /* z-index: -2; */
                }
                & > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    /* z-index: -3; */
                    &:hover{
                        background : linear-gradient(
                            180deg,
                            rgba(84,85,91,.7),
                            hsla(234,8%,53%,.3)
                        );
                        transition: all .3s;
                    }
                    & > div {
                        padding: 10px 20px;
                        font-weight: 600;
                        color: white;
                    }
                }
            } 
            & > div:nth-child(2){
                height: 62px;
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    margin-top: 10px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-weight: 800;
                }
                & > div:nth-child(2){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgb(131, 131, 131);
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
`;

// 재료 리스트
const IngredientList = () => {

    // useNavigate
    const navigate = useNavigate();

    // useCallback을 이용해서 에러페이지로 이동
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 렌더링시 Effect발생
    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/ingredient/list")
        .then(resp => {
          if(!resp.ok){
            throw new Error("상태이상");
          }
          return resp.json();
        })
        .then( (data) => {
            setVoList(data);
        })
        .catch((e)=>{
          console.log(e);
          navigateCallback();
        })
    },[navigateCallback])

    // state생성후 백엔드에서 받아온 voList 저장
    const [voList,setVoList] = useState([]);

    // filter값을 추가하여 재요청 보내기
    const handleClickFilter = (event) => {
        let filter = event.target.innerText;
        if(filter === '전체'){
            filter = '';
        }

        fetch("http://127.0.0.1:8888/app/ingredient/list?ingCategoryName="+filter)
        .then(resp => resp.json())
        .then( (data) => {
            setVoList(data);
        })
        .catch((e)=>{
          console.log(e);
          navigate("/error");
        })

    }

    // 카테고리를 저장하는 state생성
    const [categoryStates, setCategoryStates] = useState([]);

    // 클릭시 detail페이지로 이동
    const handleClickDetail = (ingNo) => {
      navigate(`/ingredient/detail?query=${encodeURIComponent(ingNo)}`);
    }

    // 이벤트 발생시 새로운 state생성후 true값을 넣어 저장
    const handleMouseOver = (index) => {
      setCategoryStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });
    };
  
    // 이벤트 발생시 새로운 state생성후 true값을 넣어 저장
    const handleMouseOut = (index) => {
      setCategoryStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    };
  
    // 화면에 보여줄 이미지 리스트
    const images = voList.map((ingredientVo, index) => (
      // 클릭 이벤트 발생시 디테일 페이지로 넘길 재료번호를 파라미터에 담아 detail페이지로 이동
      <div onClick={()=>{handleClickDetail(ingredientVo.ingNo)}} key={ingredientVo.ingNo}>
        <div>
          <img
            // 이미지 path
            src={ingredientVo.ingSrc}
            alt={`Cocktail ${ingredientVo.ingNo}`}
          />
          <div
            // 마우스 이벤트
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={() => handleMouseOut(index)}
          >
            <div
              // 호버시 디비 토글
              style={{ display: categoryStates[index] ? 'block' : 'none' }}
            >
              {/* 안에 보일 카테고리 이름 */}
              {"#"+ingredientVo.ingCategoryName}
            </div>
          </div>
        </div>
        <div>
          {/* 재료 이름 , 설명 */}
          <div>{ingredientVo.ingName}</div>
          <div>{ingredientVo.explanation}</div>
        </div>
      </div>
    ));

    return (
        <StyledListDiv>
            <div>
                <Button onClick={handleClickFilter} variant="light">전체</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">술(강한 도수)</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">술(약한 도수)</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">음료수</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">주스</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">과일</Button>{' '}
                <Button onClick={handleClickFilter} variant="light">기타</Button>{' '}
            </div>
            <div>
                {images}
            </div>
        </StyledListDiv>
    );
};

export default IngredientList;