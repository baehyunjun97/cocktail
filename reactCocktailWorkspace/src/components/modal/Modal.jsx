
import { useContext } from 'react';
import Modal from 'react-modal';
import {  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MemberMemory } from '../../context/MemberContext';

const StyledModalAreaDiv = styled.div`
    .menuselect{
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }
    .mymenu{
    padding: 1rem;
    height: 38px;
    font-size: 14px;
    font-weight: 600;
    color: #6e6e6e;
    color: #f25c5c;

    }
    .btn{
    padding: 1rem 1.8rem;
    height: 40px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #6e6e6e;
    background-color: #fff;
    display: block;
    }
    .btn2{
    display: flex;
    width: 300px;
    height: 40px;
    border-radius: 10px;
    background-color: #f3f3f3;
    border: 1.4px solid #fff;
    padding: 1rem;
    color: #4f4f4f;
    justify-content: center;
    align-items: center;
    }
`;


const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 10,
     

   
  },
  content: {
 
    
    position: 'absolute',
    width: '336px',
    height:'400px',
    // top: calc(100% + '10px'),
    left: '77%',
    top:'50px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '3p 8px 20px rgba(0, 0, 0, 0.08)' ,

   

  }


  
};

const CustomModal = ({ isOpen, onRequestClose }) => {
    const navigate=useNavigate();
    const obj=useContext(MemberMemory);

    const handleClickEdit=()=>{
        obj.setVo(null);
        sessionStorage.clear();
    }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      contentLabel="Example Modal"
    >
      {/* <h2>Modal Title</h2>
      <p>Modal Content</p> */}
      
      <StyledModalAreaDiv >
      
        <div className='menuselect'>
            <div className='mymenu'>
                내 메뉴
            </div>
            <button className='btn' onClick={() => {navigate("/mypage");}}>마이페이지</button>
            <button className='btn' onClick={() => {navigate("/recepiUpload");}}>작성하기</button>
            <button className='btn' onClick={() => {navigate("/request/ingredient");}}>재료 요청하기</button>
            <br />
        </div>
      
      <br /><br />
      <button className='btn2' onClick={() => {handleClickEdit(); navigate("/*");  }}>로그아웃</button>
     
      </StyledModalAreaDiv>
    </Modal>
  );
};

export default CustomModal;