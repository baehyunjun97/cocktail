import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MemberMemory } from '../context/MemberContext';
import CustomModal from './modal/Modal';

const StyledHeader = styled.div`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 3px 4px 0px;
  position: fixed;
  display: grid;
  place-content: center;
  grid-template-columns: 1fr 0.5fr 0.3fr 8fr 1fr 0.1fr;
  height: 60px;
  width: 100vw;
  text-align: center;
  line-height: 50px;
  background-color: white;
  top: 0px;
  z-index: 6 ;
  & > div:nth-child(1) > a {
    text-decoration: none;
    font-size: 1.5rem;
    color: orange;
    font-weight: bolder;
  }
  & > div:nth-child(2) > a {
    text-decoration: none;
    color: #6e6e6e;
    font-weight: bolder;
  }
  & > div:nth-child(3) > a {
    color: #6e6e6e;
    font-weight: bolder;
    text-decoration: none;
  }
  & > div:nth-child(5){
    display: flex;
    align-items: center;
    & > button {
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid lightgray;
    background-color: white;
    padding: 0px 20px;
    cursor: pointer;
  }
  }

`;
      
function Header() {
  const obj = useContext(MemberMemory);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledHeader>
      <div><Link to="/cocktail">마셔볼랭?</Link></div>
      <div><Link to="/cocktail">칵테일</Link></div>
      <div><Link to="/ingredient/list">재료</Link></div>
      <div></div>
      <div>
        {!obj.vo 
          ? <button onClick={openModal}><Link to="/login">로그인</Link></button>
          : <button onClick={openModal}>{obj.vo.nick}</button>
        }
      </div>

      {/* 모달 컴포넌트 */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </StyledHeader>
  );
}

export default Header;