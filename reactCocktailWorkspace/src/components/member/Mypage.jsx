import React from 'react';
import styled from 'styled-components'

const StyledMypageAreaDiv = styled.div`
    &>form{
     max-width: 1030px;
    margin: 0px auto;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
    }
    .profilebox{
    width: 100%;
    height: 260px;
    padding: 0px 50px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
    border-radius: 10px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 36px;
    }
    img{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    }
    .img1{
    width: 200px;
    height: 200px;
    border-radius: 100px;
    }
`;

const Mypage = () => {
    return (
        <StyledMypageAreaDiv>
            <form >
                <div className='profilebox'>
                {/* <img src="	https://www.masileng.com/images/illust_profile.png" alt="illust_challenge_left" className='img1' /> */}
                <img src="	https://www.iei.or.kr/upload/teacher/1dragon_teacher_photo.jpg" alt="illust_challenge_left" className='img1' />
                </div>
            </form>
        </StyledMypageAreaDiv>
    );
};

export default Mypage;