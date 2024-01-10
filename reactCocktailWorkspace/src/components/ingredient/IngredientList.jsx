import React, { useEffect, useState } from 'react';
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

const IngredientList = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/ingredient/list")
        .then(resp => resp.json())
        .then( (data) => {
            setVoList(data);
        })
    },[])

    const [voList,setVoList] = useState([]);

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

    }

    const [categoryStates, setCategoryStates] = useState([]);

    const handleClickDetail = (ingNo) => {
      navigate(`/ingredient/detail?query=${encodeURIComponent(ingNo)}`);
    }

    const handleMouseOver = (index) => {
      setCategoryStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });
    };
  
    const handleMouseOut = (index) => {
      setCategoryStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    };
  
    const images = voList.map((mapVo, index) => (
      <div onClick={()=>{handleClickDetail(mapVo.ingNo)}} key={mapVo.ingNo}>
        <div>
          <img
            src={mapVo.ingSrc}
            alt={`Cocktail ${mapVo.ingNo}`}
          />
          <div
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={() => handleMouseOut(index)}
          >
            <div
              className={`category${mapVo.ingNo}`}
              style={{ display: categoryStates[index] ? 'block' : 'none' }}
            >
              {"#"+mapVo.ingCategoryName}
            </div>
          </div>
        </div>
        <div>
          <div>{mapVo.ingName}</div>
          <div>{mapVo.explanation}</div>
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