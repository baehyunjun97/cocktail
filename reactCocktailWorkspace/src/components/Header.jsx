import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { MemberMemory } from '../context/MemberContext';

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

  const activeStyle = {
    color: "rgb(242, 92, 92)",
  };

  return (
    <StyledHeader>
        <div><NavLink to="/cocktail">마셔볼랭?</NavLink></div>
        <div><NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/cocktail">칵테일</NavLink></div>
        <div><NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/ingredient/list">재료</NavLink></div>
        <div><button><Link to="/recepiUpload">작성하기</Link></button></div>
        <div>
            {/* 태그안에 if문을 못써 */}
            {!obj.vo 
            ? 
            <button >
              <Link to="/login">
                로그인
              </Link>
            </button>
            :
            <button>
            {obj.vo.nick} 
            </button>
            }
          
          
        </div>
    </StyledHeader>
  );
}

export default Header;