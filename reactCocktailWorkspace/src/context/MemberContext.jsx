import React from 'react';
import { createContext,useState } from 'react';

const MemberMemory=createContext();

const MemberMemoryProvider=({children})=>{
    const [vo,setVo]= useState(()=>{
        const sessionVo = sessionStorage.getItem("loginMember");  //로그인 유지
        return JSON.parse(sessionVo); //sessionStorage에서 가져온 것은 무조건 문자열(login.jsx참고)  json 객체(ex.obj.vo.nick으로 사용하기 위함)로 사용 
    });

    console.log(vo); 

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