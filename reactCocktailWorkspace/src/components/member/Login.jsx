import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const StyledLoginAreaDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: orange;

    & > form {
        /* height: 100%;
        text-align: center;
        background-color: rgba(255,255,255,.5);
        border: 1px solid rgba(242,92,92,.3);
        border-radius: 10px;  */

        position: relative;
        width: 484px;
        padding: 30px;
        border: 1px solid rgba(242,92,92,.3);
        border-radius: 10px;
        background-color: rgba(255,255,255,.5);
        -webkit-backdrop-filter: blur(50px);
        backdrop-filter: blur(50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 20px;
        gap: 20px;
        
    }

    .join {
        width: 100%;
    height: 52px;
    border: 2px solid transparent;
    border-radius: 10px;
    transition: all .2s;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -1px;
    cursor: pointer;   
    background-color: #f25c5c;
    color: #fff;
    }

    .img1 {
        width: 50%;
        position: relative;
        top: 20px;
    }

    input {
        width: 300px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
    }
    .img2{
        position: absolute;
        width: calc(100% + 23px);
        height: 133px;
        bottom: 0px;
        left: -24px;
    }
    .joinbox{
        line-height: 25px;
        font-weight: 600;
        color: rgb(79, 79, 79);
        white-space: pre;
        text-align: center;
        margin: 0px;
    }
    h2{
        font-size: 30px;
        font-weight: bold;
        letter-spacing: -1px;
        margin: 0px;
    }
    .masileng{
        width: 484px;
    max-width: 484px;
    height: 100%;
    transform: scale(0.9);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    }
    .img3{
        width: 70%;
        height: 70%;
    }
`;

const Login = () => {
    const navigate=useNavigate();
    const [vo,setVo]=useState();

    const handleInputChange=(event)=>{
       const {name,value}=event.target;
       
       setVo({
        ...vo,
        [name]:value
       })

    }

    const handleClickLogin=(event)=>{
        event.preventDefault();

        fetch("http://127.0.0.1:8888/app/member/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(vo),

        })
        .then((resp)=>{
            if(!resp.ok){
                throw new Error("로그인 fetch 실패")
            }
            return resp.json();
        })
        .then((data)=>{
            if(data.msg==="good"){
                console.log(data.loginMember);
                alert("로그인 성공")
                sessionStorage.setItem("loginMember",JSON.stringify(data.loginMember));
                navigate('/*')
            }else{
                alert("로그인 실패")
                navigate('/error')
            }
        })
        .catch((e)=>{console.log(e); alert("로그인 실패")})
        ;

    }

    return (
        <StyledLoginAreaDiv>
            <div class="masileng">
                {/* <img src="	https://www.masileng.com/test/logo_with_text.svg" class="img3" alt="illust_challenge_left" /> */}
                <img src="https://previews.123rf.com/images/vectorstockvadim/vectorstockvadim2002/vectorstockvadim200217595/140770809-%EC%A3%BC%ED%99%A9%EC%83%89-%EB%B0%B0%EA%B2%BD-%EC%B9%B5%ED%85%8C%EC%9D%BC-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%99%80%EC%9D%B8-%EC%9E%94-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%AF%B8%EB%8B%88%EB%A9%80%EB%A6%AC%EC%A6%98-%EA%B0%9C%EB%85%90-3d-%EA%B7%B8%EB%A6%BC-3d-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%97%90-%EA%B2%A9%EB%A6%AC%EB%90%9C-%EB%85%B8%EB%9E%80%EC%83%89-%EB%A7%88%ED%8B%B0%EB%8B%88-%EC%9E%94.jpg" class="img3" alt="illust_challenge_left" />

            </div>
            <form onSubmit={handleClickLogin}>
                <h2 >로그인</h2>
                {/* <p class="joinbox">나만 아는 레시피를 소개하고<br />좋아하는 칵테일 리스트를 만들어보세요!</p> */}
                <img src="https://www.masileng.com/images/illust_challenge_left.png" className="img1" alt="illust_challenge_left" />
                <div>
                    <div><input type="text" name="id" className="id" placeholder="아이디를 입력하세요" onChange={handleInputChange} /></div>
                    <div><input type="password" name="pwd" className="pwd" placeholder="비밀번호를 입력하세요" onChange={handleInputChange} /></div>
                    <button className="join">로그인</button>
                </div>
            </form>
                <img src="https://www.masileng.com/test/login_background.png" className="img2" alt="illust_challenge_left"  />
            
        </StyledLoginAreaDiv>
    );
};

export default Login;