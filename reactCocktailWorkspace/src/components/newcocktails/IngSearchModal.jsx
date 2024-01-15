import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledIngSearchModalDiv = styled.div`
  width: 100%;
  position: relative;
  top: calc(100% - 16px);
  left: 50%;
  transform: translateX(-50%);
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  border: 1.4px solid rgb(230, 228, 232);
  border-radius: 10px;
  box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
  cursor: pointer;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & .Header {
    margin-top: 10px;
  }
`;

//component 시작
const IngSearchModal = ({ isModalVisible, onHandleSelectedIng }) => {
  const [search, setSearch] = useState("");
  const [ingVolist, setIngVolist] = useState([]);
  const [selectedIng, setSelectedIng] = useState("");

  //props 전달용
  useEffect(() => {
    onHandleSelectedIng(selectedIng); // Notify the parent component about the updated ingredients
  }, [selectedIng, onHandleSelectedIng]);
  

  
  //prevent 용
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
  };
  
  //input 문자열에 따라 like구문 실행 (검색)
  const handleSearchChange = async (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);

    // Fetch data and update ingVolist whenever the input value changes
    await fetchData(inputValue);
  };
  //검색데이터 fetch
  const fetchData = async (inputValue) => {
    try {
      const response = await fetch('http://127.0.0.1:8888/app/cocktail/regist/ingList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue })
      });

      const result = await response.json();

      // Update ingVolist with the fetched data
      setIngVolist(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {isModalVisible && (
        <StyledIngSearchModalDiv>
          <div className='Header'>재료 상세 선택</div>
          <div className='SearchForm'>
            <form onSubmit={handleFormSubmit}>
              <input
                onClick={(e) => { e.stopPropagation() }}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder='검색어를 입력해주세요.'
              />
            </form>
          </div>
          <div className='ResultContainer'>
            {/* Display the contents of ingVolist in real-time */}
            {ingVolist.map((ingVo, index) => (
              <div key={index} onClick={ () => { setSelectedIng( ingVo )} }>
                <p>{ingVo.name}</p>
                <hr />
              </div>
            ))}
          </div>
        </StyledIngSearchModalDiv>
      )}
    </>
  );
};

export default IngSearchModal;