import React from 'react';
import { createContext,useState } from 'react';

const KhMemory=createContext();

const KhMemoryProvider=({children})=>{
    const [vo,setVo]= useState(()=>{
        const sessionVo = sessionStorage.getItem("loginMember");
        return JSON.parse(sessionVo);
    });

    console.log(vo);

    const obj={
      "vo":vo,
      "setVo":setVo,  
    };


    return(<>
        <KhMemory.Provider value={obj}>
            {children}
        </KhMemory.Provider>
    </>)


}

export {KhMemoryProvider,KhMemory};