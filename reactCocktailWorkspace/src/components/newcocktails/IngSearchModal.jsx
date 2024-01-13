import React, { useState } from 'react';
import styled from 'styled-components';

const StyledIngSearchModalDiv = styled.div`
  width: 100%;
  position: relative;
  top: calc(100% - 2px);
  left: 50%;
  transform: translateX(-50%);
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  border: 1.4px solid rgb(230, 228, 232);
  border-radius: 10px;
  box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
  cursor: auto;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const IngSearchModal = ({ isModalVisible }) => {
    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const handleSearchSubmit = (event) => {
      event.preventDefault();

      fetch("http://127.0.0.1:8888/app/cocktail/regist", {
            method: "GET",
            body: searchValue,
          })
            .then(resp => resp.json())
            .then(data => {
              alert=(data.msg);
            });
    }

  return (<>
    {isModalVisible && (
      <StyledIngSearchModalDiv>
          <div className='Header'>재료 상세 선택</div>
          <div className='SearchForm'>
            <form onSubmit={handleSearchSubmit}>
              <input 
              onClick={(e) => {e.stopPropagation()}} 
              type="text" />
            </form>
          </div>
          <div className='ResultContainer'> result1 </div>
      </StyledIngSearchModalDiv>
      )}
  </>
    
  );

};

export default IngSearchModal;