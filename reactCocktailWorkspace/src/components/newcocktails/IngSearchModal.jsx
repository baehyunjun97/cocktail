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

  & .ResultContainer{
    display: flex;
    flex-direction: column;
  }

  & .selectBtn {
    margin-left: auto;
  }

  & .controllBtn{
    margin: 0px 20px 15px;
    cursor: pointer;
  }
`;
const ITEMS_PER_PAGE = 5;

const IngSearchModal = ({ isModalVisible, onHandleSelectedIng, ingredients, handleChangeIng, inputIndex }) => {
  const [search, setSearch] = useState(""); //중간검색값
  const [ingVolist, setIngVolist] = useState([]); //검색필터용
  const [selectedIng, setSelectedIng] = useState(null); //검색값

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isIngredientSelected = (ingNo) => {
    //아래 some을 하나라도 통과하는가? 하나라도 ingNo와 같다면 true 반환.
    return ingredients.some((ingredient) => ingredient.ingNo === ingNo);
  };

  useEffect(() => {
    onHandleSelectedIng(selectedIng);
    console.log("useEffect : " + selectedIng);
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalPages = (data) => {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  };

  const handlePageChange = (e,newPage) => {
    e.stopPropagation(); // 꺼지지 않도록.
    e.preventDefault(); // 이 코드 때문에 즉시입력이 안되는 것 같음
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = ingVolist.slice(indexOfFirstItem, indexOfLastItem);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      {isModalVisible && (
        <StyledIngSearchModalDiv>
          <div className='Header'>재료 상세 선택</div>
          <div className='SearchForm'>
            <div onSubmit={handleFormSubmit}>
              <input
                onClick={(e) => { e.stopPropagation(); fetchData(""); }}
                onBlur={(e) => e.stopPropagation()}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder='검색어를 입력해주세요.'
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className='ResultContainer'>
            {/* 화면에 표시되는 부분. handleChangeIng onClick 이벤트 존재 */}
            {currentItems.map((ingVo, index) => (
              <div
              key={index}
              onClick={() => {
                if (!isIngredientSelected(ingVo.no)) {
                  console.log("Selected Ingredient:", ingVo);
                  setSelectedIng(ingVo);
                  handleChangeIng(inputIndex, 'ingNo', ingVo.no);
                }
              }}
              style={{
                color: isIngredientSelected(ingVo.no) ? 'red' : 'black',
                cursor: isIngredientSelected(ingVo.no) ? 'not-allowed' : 'pointer',
              }}
            >
              <p>{ingVo.name}</p>
              <hr />
            </div>
            ))}
            {/* Pagination controls */}
            <div>
              <button 
                onClick={(e) => {handlePageChange(e,currentPage - 1);} } 
                disabled={currentPage === 1} 
                className='controllBtn'
              >
                이전
              </button>
              <span>{`${currentPage} / ${totalPages}`}</span>
              <button
                onClick={(e) => {handlePageChange(e,currentPage + 1);}}
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