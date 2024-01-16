import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MemberMemory } from '../../context/MemberContext';

const StyledPwdCheckAreaDiv = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: orange;

    &>form{
    width: 500px;
    position: relative;
    top: -10%;
    padding: 50px;
    border: 1px solid rgba(242, 92, 92, 0.3);
    border-radius: 10px;
    background-color: rgba(255,255,255,.5);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;
    }
    div{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    }
    .text1{
    color: rgb(79, 79, 79);
    font-size: 32px;
    letter-spacing: -1px;
    line-height: 1.2;
    font-weight: 800;
    text-align: center;
    }
    .text2{
    margin-top: 20px;
    text-align: center;
    color: rgb(131, 131, 131);
    font-size: 14px;
    letter-spacing: -0.5px;
    line-height: 26px;
    white-space: pre;
    }
    .text3{
    font-size: 16px;
    line-height: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: rgb(79, 79, 79);
    margin-top: 42px;
    }
    h3:after{
    content: "";
    background-image: url(https://www.masileng.com/test/ic_arrow_bottom.png);
    background-size: 10px 6px;
    width: 10px;
    height: 6px;
    display: inline-block;
    margin-left: 5px;
    text-align: center;
    vertical-align: middle;
    }
    .editcollection{
    position: relative;
    display: flex;
    flex-direction: column;
    }
    .edit{
    width: 100%;
    margin-top: 22px;
    padding: 12.5px 15px;
    line-height: 19px;
    font-size: 16px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    height: 46px;
    color: rgb(48, 48, 48);
    font-weight: 600;
    }
    input:focus{
    border: 2px solid rgb(131, 131, 131);
    outline: none;
}
    .editnumber{
    margin-top: 5px;
    font-size: 12px;
    color: rgb(162, 162, 162);
    align-self: flex-end;
    }
    .editnumber:after{
    content: "15자 이내로 작성해주세요.";
    position: absolute;
    bottom: 0px;
    left: 0px;
    font-size: 12.8px;
    color: rgb(242, 92, 92);
    }
    .change{
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border-radius: 10px;
    background-color: rgb(242, 92, 92);
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    }
    .img2{
        position: absolute;
        width: calc(100% + 23px);
        height: 133px;
        bottom: 0px;
        left: -24px;
    }

`;

const PwdCheck = () => {
    const navigate=useNavigate();
    const obj=useContext(MemberMemory);
    const[vo,setVo]=useState({pwd:''});

    const handleInputChange=(event)=>{
        const{name,value}=event.target;
        setVo({
            ...vo,
            [name]:value
        })
    }
    

    const pwdAccord=(event)=>{
        event.preventDefault();
        if(obj.vo.pwd===vo.pwd){
            alert("비밀번호 일치");
            navigate("/edit")
        }else{
            alert("비밀번호 틀림");
        }
    }

    return (
        <StyledPwdCheckAreaDiv>
            <form onSubmit={pwdAccord}>
            <h2 class="text1">비밀번호 재확인</h2>
            {/* <p className='text2'>회원정보는 언제든 변경할 수 있습니다.</p> */}
            <h3 class="text3">비밀번호</h3>
            <div class="editcollection">
                <input placeholder="비밀번호를 입력해주세요." className='edit' maxLength="15" name='pwd' onChange={handleInputChange} />
                <div class="editnumber">{vo.pwd.length}/15</div>
            </div>
            <button className='change' >확인</button>
            </form>
            <img src="https://www.masileng.com/test/login_background.png" className="img2" alt="illust_challenge_left"  />
        </StyledPwdCheckAreaDiv>
    );
};

export default PwdCheck;