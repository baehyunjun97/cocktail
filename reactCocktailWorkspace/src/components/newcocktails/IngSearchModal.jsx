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

  & .controllBtn{
    margin: 0px 20px 15px;
    cursor: pointer;
  }
`;
const ITEMS_PER_PAGE = 5;

const IngSearchModal = ({ isModalVisible, onHandleSelectedIng, ingredients }) => {
  const [search, setSearch] = useState("");
  const [ingVolist, setIngVolist] = useState([]);
  const [selectedIng, setSelectedIng] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    onHandleSelectedIng(selectedIng);
  }, [selectedIng, onHandleSelectedIng]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  const handleSearchChange = async (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    await fetchData(inputValue);
  };

  const fetchData = async (inputValue) => {
    try {
      const response = await fetch('http://127.0.0.1:8888/app/cocktail/regist/ingList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue }),
      });

      const result = await response.json();
      setIngVolist(result);
      setTotalPages(calculateTotalPages(result));
      setCurrentPage(1); // Reset to the first page when new data is fetched
      console.log("전달받은 잉그 : " + JSON.stringify(ingredients))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalPages = (data) => {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  };

  const handlePageChange = (e,newPage) => {
    e.stopPropagation();
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = ingVolist.slice(indexOfFirstItem, indexOfLastItem);


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
            {/* Display only the current items based on the current page */}
            {currentItems.map((ingVo, index) => (
              <div key={index} onClick={() => { setSelectedIng(ingVo) }}>
                <p>{ingVo.name}</p>
                <hr />
              </div>
            ))}
            {/* Pagination controls */}
            <div>
              <button 
                onClick={(e) => handlePageChange(e,currentPage - 1)} 
                disabled={currentPage === 1} 
                className='controllBtn'
              >
                이전
              </button>
              <span>{`${currentPage} / ${totalPages}`}</span>
              <button
                onClick={(e) => handlePageChange(e,currentPage + 1)}
                disabled={indexOfLastItem >= ingVolist.length}
                className='controllBtn'
              >
                다음
              </button>
            </div>
          </div>
        </StyledIngSearchModalDiv>
      )}
    </>
  );
};

export default IngSearchModal;