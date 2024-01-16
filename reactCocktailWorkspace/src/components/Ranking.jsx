import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-1000%);
  }
  50% {
    transform: translateY(0);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledRankingDiv = styled.div`
    height: 58px;
    display: flex;
    align-items: center;
    width: 94vw;
    margin: auto;
    display: flex;
    
    & > .fireIcon {
        color: red;
        width: 28px; 
        height: 28px;
        margin-left: 10px;
    }
    
    & > span {
        height: 28px;
        line-height: 28px;
        margin-left: 16px;
        font-size: 14px;
        letter-spacing: -0.5px;
        color: rgb(170, 170, 170);
        font-weight: 800;
    }

    & > div {
        height: 28px;
        overflow: hidden;
        & > div {
        height: 28px;
        line-height: 28px;
        margin-left: 16px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer; 
        animation: ${fadeIn} 1s linear 0s 1 normal forwards, ${slideIn} 20s linear 0s infinite;
        }
    }
`;

// 랭킹 시스템
const Ranking = () => {

    // 랭킹 시스템에 보여줄 state
    const [voList,setVoList] = useState([]);

    const navigate = useNavigate();

    // useCallback을 이용해서 에러페이지로 이동
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 요청보내기
    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/cocktail/ranking")
        .then(resp => {
            if(!resp.ok){
                throw new Error("fetch함수 실패..");
            }
            return resp.json();
        })
        .then((data) => {
            setVoList(data);
        })
        .catch((e)=>{
            console.log(e);
            navigateCallback();
        })
    },[navigateCallback]);

    // list길이만큼 보여줌
    const rankingTop10Cocktail = voList.map((vo , index)=>(
        <div 
            className="running" 
            onClick={() => { 
            navigate(`/cocktail/detail?query=${encodeURIComponent(vo.cocktailNo)}`) }} 
            key={vo.cocktailNo}
        >
            <span style={{color:'red'}}>{index+1} </span>
            {vo.nameKor}
        </div>
    ));

    return (
        <StyledRankingDiv>
            <FontAwesomeIcon className='fireIcon' icon={faFire} />
            <span>금주의 마셔볼랭 Top 10</span>
            <div>
                {rankingTop10Cocktail}
            </div>
        </StyledRankingDiv>
    );
};

export default Ranking;