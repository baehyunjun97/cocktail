import React from 'react';
import styled from 'styled-components';
import headImage from "./images/illust_new_cocktail.png" 

const StyledHeadContainer = styled.div`
    height: 260px;
    padding: 0px 50px;
    background: white;
    box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
    border-radius: 10px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 36px;
    margin-bottom: 25px;

    & .description{
        font-size: 13px;
        font-weight: 400;
        color: #838383;
        line-height: 1.8;
        margin-top: 30px!important;

        & h4{
            font-size: 16px;
            font-weight: 600;
            color: #838383;
        }

        & h2{
            margin: 0 0 7px!important;
            color: #303030;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: -1px;
        }
    }
`;
const HeadContainer = () => {
    return (
        <StyledHeadContainer>
            <img className="headImage" src={headImage} />
            <div className='description'>
                <h2>나만의 레시피 올리기</h2>
                <h4>마셔볼랭에 여러분의 레시피를 공유해주세요!</h4>
                <div>♥좋아요♥를 많이 받게되면 마셔볼랭 랭킹에 올라갈 수 있습니다! <br />
                매력적인 칵테일을 소개해주세요!</div>
            </div>
        </StyledHeadContainer>
    );
};

export default HeadContainer;