import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { MemberMemory } from '../../context/MemberContext';


const StyledMypageAreaDiv = styled.div`
    &>div:nth-child(1){
     max-width: 1030px;
    margin: 0px auto;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
    /* box-sizing: border-box; */
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
    div{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
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
    .profilecontent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 0%;
    }
    .label{
    font-size: 14px;
    font-weight: 600;
    color: #a2a2a2;
    }
    .profilename{
    margin-top: 5px ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .name{
    color: #303030;
    font-size: 1.6rem;
    font-weight: bold;
    }
    h2:after{
    content: "님";
    font-size: 18px;
    margin-left: 5px;
    }
    .personaledit{
    font-size: 14px;
    font-weight: 600;
    color: #6e6e6e;
    transition: all .2s;
    border: 1.4px solid #e6e4e8;
    padding: 8px 18px;
    line-height: 20px;
    border-radius: 100px;
    background-color: transparent;
    &:hover{
        border: 1.7px solid gray;
    }
    }
    .profilecount{
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    gap: 8px;
    }
    .recipe{
    margin: 0;
    color: #6e6e6e;
    font-weight: 600;
    font-size: 14px;
    }
    .recipe:before{
    content: "🍸";
    margin-right: 5px;
    }
    .like{
    margin: 0;
    color: #6e6e6e;
    font-weight: 600;
    letter-spacing: -1px;
    font-size: 14px;
    }
    .like:before{
    content: "💚";
    margin-right: 5px;
    }
    b{
    margin-left: 6px;
    font-weight: 900;
    color: #303030;
    font-size: 20px;
    }
`;

const Mypage = () => {
    const navigate=useNavigate();
    
    const obj=useContext(MemberMemory);
    
    return (
        <StyledMypageAreaDiv>
            <div >
                <div className='profilebox'>
                <img src="	https://www.masileng.com/images/illust_profile.png" alt="illust_challenge_left" className='img1' />
                {/* <img src="	https://www.iei.or.kr/upload/teacher/1dragon_teacher_photo.jpg" alt="illust_challenge_left" className='img1' /> */}
                <div className='profilecontent'>
                <div class="label">마실랭 홈텐더</div>
                <div className='profilename'>
                    <h2 className='name' name="name">{ obj.vo.nick} </h2>
                    <button className='personaledit' onClick={() => {navigate("/pwdcheck");}} >개인정보 편집</button> 
                </div>
                <div className='profilecount'>
                    <div className='recipe'>
                        "올린레시피"
                        <b>0</b>
                        "개"
                    </div>
                    <div className='like'>
                        "즐겨찾기"
                        <b>2</b>
                        "개"
                    </div>

                </div>
                <div></div>
                </div>
                </div>
            </div>
        </StyledMypageAreaDiv>
    );
};

export default Mypage;