import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const StyledJoinAreaDiv = styled.div`
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
        display: flex;
        flex-direction: column;
        align-items: center;
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
        border: none;
    }
    input:focus{
    border: 2px solid rgb(131, 131, 131);
    outline: none;
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
        width: 60%;
        height: 60%;
    }
`;

const Join = () => {
    
    const navigate=useNavigate();

    let isFetching=false;

    //아이디 입력 안 하면 못 내려가게 하기,아이디 입력 조건
    const [isAlertShown, setIsAlertShown] = useState(false);

function blur(e) {
  const isValidId = /^[a-zA-Z0-9]+$/.test(e.target.value);

  if (!isValidId && e.target.value.length === 0 && !isAlertShown) {
    e.target.focus();
    alert("아이디를 입력하세요");
    setIsAlertShown(true);
  } else if (!isValidId && !isAlertShown) {
    e.target.focus();
    alert("영문 알파벳과 숫자로만 이루어진 아이디를 입력하세요");
    setIsAlertShown(true);
  } else {
    setIsAlertShown(false);
  }
};

   //비밀번호 입력 안 하면 못 내려가게 하기,비밀번호 입력 조건
   const [isAlertShown2, setIsAlertShown2] = useState(false);
   function blur2(e){
    const isValidPwd = /^[a-zA-Z0-9!@#$%^&*]+$/.test(e.target.value);
    
    if (!isValidPwd && e.target.value.length === 0 && !isAlertShown2) {
        e.target.focus();
        alert("비밀번호를 입력하세요");
        setIsAlertShown2(true);
      } else if (!isValidPwd && !isAlertShown2) {
        e.target.focus();
        alert("비밀번호에는 영문 알파벳과 숫자,특수문자만 사용 가능합니다.");
        setIsAlertShown2(true);
      } else {
        setIsAlertShown2(false);
      }
   };

   //비밀번호 입력 안 하면 못 내려가게 하기
   const [isAlertShown5, setIsAlertShown5] = useState(false);
   function blur5(e){
    if(e.target.value.length===0 && !isAlertShown5){
        e.target.focus();
        alert("비밀번호를 입력하세요")
        setIsAlertShown5(true);
    }else {
        setIsAlertShown5(false);
      }
   };

   //닉네임 입력 안 하면 못 내려가게 하기
   const [isAlertShown3, setIsAlertShown3] = useState(false);
   function blur3(e){
    if(e.target.value.length===0 && !isAlertShown3){
        e.target.focus();
        alert("닉네임을 입력하세요")
        setIsAlertShown3(true);
    }else {
        setIsAlertShown3(false);
      }
   };

   //이메일 입력 안 하면 못 내려가게하기
   const [isAlertShown4, setIsAlertShown4] = useState(false);
   function blur4(e){
    const isValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e.target.value);
    
    if (!isValidEmail && e.target.value.length === 0 && !isAlertShown4) {
        e.target.focus();
        alert("이메일을 입력하세요");
        setIsAlertShown4(true);
      } else if (!isValidEmail && !isAlertShown4) {
        e.target.focus();
        alert("이메일 형식에 맞게 작성해주세요.");
        setIsAlertShown4(true);
      } else {
        setIsAlertShown4(false);
      }
   };

    const[vo,setVo]=useState({
        id:"",
        pwd:"",
        pwd2:"",
        nick:"",
        email:"",
    });

    const handleInputChange=(event)=>{
        const {name,value}=event.target;

        setVo({
            ...vo,
            [name]:value
        })
    }

    const handleJoinSubmit=(event)=>{
        event.preventDefault();

        //비밀번호 확인
        if(vo.pwd!==vo.pwd2){
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        //아이디 글자수
        if(vo.id.length<4){
            alert("아이디는 4글자 이상 입력하세요")
            return;
        }

        if(isFetching){
            return;
        }

        isFetching=true;

        // if(pwd !== pwd){
        //     alert("패스워드가 일치하지않음");
        // }

        fetch("http://127.0.0.1:8888/app/member/join",{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(vo)
        }) // ajax 요청
        .then((resp)=>{
            if(!resp.ok){
                throw new Error("회원가입 fetch 실패")
            }
            return resp.text();
        })
        .then((data)=>{
            console.log(data);
            if(data==="good"){
                alert("회원가입 성공");
                navigate("/login");
                
            }else if(data==="overlap"){
                alert("중복된 아이디 입니다.")
            }
            else{
                alert("회원가입 실패");
            }
        })
        .catch((e)=>{
            console.log(e);
            alert("회원가입 실패!")
            navigate("/error");
        })
        .finally(()=>{
            isFetching=false;
        })
        ;
    }

    return (
        <StyledJoinAreaDiv>
            <div class="masileng">
                {/* <img src="	https://www.masileng.com/test/logo_with_text.svg" class="img3" alt="illust_challenge_left" /> */}
                <img src="https://previews.123rf.com/images/vectorstockvadim/vectorstockvadim2002/vectorstockvadim200217595/140770809-%EC%A3%BC%ED%99%A9%EC%83%89-%EB%B0%B0%EA%B2%BD-%EC%B9%B5%ED%85%8C%EC%9D%BC-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%99%80%EC%9D%B8-%EC%9E%94-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%AF%B8%EB%8B%88%EB%A9%80%EB%A6%AC%EC%A6%98-%EA%B0%9C%EB%85%90-3d-%EA%B7%B8%EB%A6%BC-3d-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%97%90-%EA%B2%A9%EB%A6%AC%EB%90%9C-%EB%85%B8%EB%9E%80%EC%83%89-%EB%A7%88%ED%8B%B0%EB%8B%88-%EC%9E%94.jpg" class="img3" alt="illust_challenge_left" />

            </div>
            <form onSubmit={handleJoinSubmit}>
                <h2 >회원가입</h2>
                <p class="joinbox">나만 아는 레시피를 소개하고<br />좋아하는 칵테일 리스트를 만들어보세요!</p>
                <img src="https://www.masileng.com/images/illust_challenge_left.png" className="img1" alt="illust_challenge_left" />
                <div>
                    <div><input type="text" name="id" className="id" placeholder="아이디" onChange={handleInputChange} onBlur={blur} /></div>
                    <div><input type="password" name="pwd" className="pwd" maxLength="15" placeholder='비밀번호' onChange={handleInputChange} onBlur={blur2} /></div>
                    <div><input type="password" name="pwd2" className="pwd" placeholder="비밀번호 확인" onChange={handleInputChange} onBlur={blur5} /></div>
                    <div><input type="text" name="nick" className="nick" placeholder="닉네임" onChange={handleInputChange} onBlur={blur3} /></div>
                    <div><input type="email" name="email" className="email" placeholder="이메일" onChange={handleInputChange} onBlur={blur4} /></div>
                    <button className="join" >회원가입</button>
                </div>
            </form>
                <img src="https://www.masileng.com/test/login_background.png" className="img2" alt="illust_challenge_left"  />
            
        </StyledJoinAreaDiv>
    );

};

export default Join;