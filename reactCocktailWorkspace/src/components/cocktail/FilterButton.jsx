import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterButton = ({ isModalVisible, setModalVisible, setFilterNames, filterNames, index, filters }) => {

  // 필터 객체안에 필터네임을 동적으로 사용하기 위함
  const [filterKey, setFilterKey] = useState('');

  // index의 값이 변할때 마다 업데이트 필터 키가 변함
  useEffect(() => {
    setFilterKey('filterName' + index);
  }, [index]);

  // 필터 내용을 파악후 요청을 보내준다.
  const fetchCocktailListByFilters = (event) => {

    // 현재 클릭한 필터의 내용
    let filter = event.target.innerText;

    // 만약 
    switch (index) {
      case 1: filter = (filter === '전체') ? '도수' : filter; break;
      case 3: filter = (filter === '전체') ? '베이스주' : filter; break;
      default: break;
    }

    setFilterNames((prevFilterNames) => ({
      ...prevFilterNames,
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
      {filterNames[filterKey]}
      {isModalVisible && (
          <div onClick={fetchCocktailListByFilters}>
            {filters.map((element, idx) => (
              <div key={idx}>{element}</div>
            ))}
          </div>
      )}
    </Button>
  );
};

export default FilterButton;