import React, { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInAnimation = keyframes`
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
  transition: key 0.1s ease;

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
      animation: ${({ animated }) => (animated ? css`${fadeInAnimation} 1s linear 0s 1 normal forwards, ${slideInAnimation} 20s linear 0s infinite` : 'none')};
    }
  }
`;

// 랭킹 시스템
const Ranking = () => {
  // 랭킹 시스템에 보여줄 state
  const [voList, setVoList] = useState([]);
  const [animated, setAnimated] = useState(false);

  const navigate = useNavigate();

  // useCallback을 이용해서 에러페이지로 이동
  const navigateCallback = useCallback(() => {
    navigate("/error");
  }, [navigate]);


    // useEffect 내에서 데이터 요청
    useEffect(() => {
        const fetchData = async () => {
            try {
            const resp = await fetch("http://127.0.0.1:8888/app/cocktail/ranking");
            if (!resp.ok) {
                throw new Error("fetch 함수 실패..");
            }
            const data = await resp.json();
            console.log(data);
            setVoList(data);
            setAnimated(true);
            } catch (e) {
            console.log(e);
            navigateCallback();
            }
        };

        setAnimated(false);
        fetchData();
    }, [navigateCallback]);

  // list길이만큼 보여줌
  const rankingTop10Cocktail = voList.map((vo, index) => (
    <div
      className="running"
      onClick={() => {
        navigate(`/cocktail/detail?query=${encodeURIComponent(vo.cocktailNo)}`);
      }}
      key={vo.cocktailNo}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span style={{ color: 'red' }}>{index + 1} </span>
      {vo.nameKor}
    </div>
  ));

  return (
    <StyledRankingDiv animated={animated}>
      <FontAwesomeIcon className='fireIcon' icon={faFire} />
      <span>금주의 마셔볼랭 Top 10</span>
      <div>
        {rankingTop10Cocktail}
      </div>
    </StyledRankingDiv>
  );
};

export default Ranking;