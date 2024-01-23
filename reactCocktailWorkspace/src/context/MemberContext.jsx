import React, { useEffect } from 'react';
import { createContext,useState } from 'react';

const MemberMemory=createContext();

const MemberMemoryProvider=({children})=>{

    
    const [vo,setVo]= useState("");

    useEffect(()=>{
        const loginMember = { id : sessionStorage.getItem("loginMember"),reload : 'Y'};
        console.log(loginMember);
        if(loginMember){
            fetch("http://127.0.0.1:8888/app/member/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body: JSON.stringify(loginMember),

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
                
                setVo(data.loginMember);
            }else{
                
                
            }
        })
        }
    },[])


    const obj={
      "vo":vo,
      "setVo":setVo,  
    };


    return(<>
        <MemberMemory.Provider value={obj}>
            {children}
        </MemberMemory.Provider>
    </>)


}

export {MemberMemoryProvider,MemberMemory};