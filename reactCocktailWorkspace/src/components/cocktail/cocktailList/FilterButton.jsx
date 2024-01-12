import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// 필터 버튼 컴포넌트
const FilterButton = ({ isModalVisible, setModalVisible, setFilterTitles, filterTitles, index, filterContents }) => {

  // 필터 객체안에 필터네임을 동적으로 사용하기 위함
  const [filterKey, setFilterKey] = useState('');

  // index의 값이 변할때 마다 업데이트 필터 키가 변함
  useEffect(() => {
    setFilterKey('filterTitle' + index);
  }, [index]);

  // 필터 내용을 파악후 요청을 보내준다.
  const fetchCocktailListByFilters = (event) => {

    // 현재 클릭한 필터의 내용
    let filter = event.target.innerText;

    // 만약 innerText가 case안에 값이랑 같을경우 filter 변경
    switch (index) {
      case 1: filter = (filter === '전체') ? '도수' : filter; break;
      case 3: filter = (filter === '전체') ? '베이스주' : filter; break;
      default: break;
    }

    // 필터타이틀 변경
    setFilterTitles((prevFilterTitles) => ({
      ...prevFilterTitles,
      [filterKey]: filter,
    }));

  };

  return (
    <Button
      variant="light"
      onClick={() => setModalVisible(!isModalVisible)}
      onBlur={() => {
        if (isModalVisible === true) {
          setModalVisible(!isModalVisible);
        }
      }}
    >
      {/* 필터키로 어떤 필터가 변경이 되는지를 파악 가능함 */}
      {filterTitles[filterKey]}
      {isModalVisible && (
          <div onClick={fetchCocktailListByFilters}>
            {filterContents.map((element, idx) => (
              <div key={idx}>{element}</div>
            ))}
          </div>
      )}
    </Button>
  );
};

export default FilterButton;