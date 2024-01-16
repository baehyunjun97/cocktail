import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

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

const Ranking = () => {
    return (
        <StyledRankingDiv>
            <FontAwesomeIcon className='fireIcon' icon={faFire} />
            <span>금주의 마셔볼랭 Top 10</span>
            <div>
                <div className="running">1 블루라군</div>
                <div className="running">2 화이트 러시안</div>
                <div className="running">3 블루라군</div>
                <div className="running">4 화이트 러시안</div>
                <div className="running">5 블루라군</div>
                <div className="running">6 화이트 러시안</div>
                <div className="running">7 블루라군</div>
                <div className="running">8 화이트 러시안</div>
                <div className="running">9 블루라군</div>
                <div className="running">10 화이트 러시안</div>
            </div>
        </StyledRankingDiv>
    );
};

export default Ranking;