import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const RangeFilter = ({isModalVisible, setModalVisible, setFilterNames, filterNames, index, filters}) => {

    const [filterKey, setFilterKey] = useState('');

    const [inputValue, setInputValue] = useState({
        minIngredients : "",
        maxIngredients : "",
    });

    const handleInputChange = (event) => {

        let { name, value } = event.target;
        value = value.replace(/[^0-9]/g, '').slice(0, 3);

        // 숫자 이외의 문자를 제거하고 최대 6자로 제한
        setInputValue({
            ...inputValue,
            [name] : value
        });
    };

    useEffect(() => {
        setFilterKey('filterName' + index);
    }, [index,inputValue]);

    const fetchCocktailListByFilters = (event) => {

        setFilterNames((prevFilterNames) => ({
            ...prevFilterNames,
            [filterKey]: "재료 수",
          }));

        let itemMin = null;
        let itemMax = null;

        console.log(event.target.innerText);

        if(event.target.innerText === '조회하기'){
            itemMin = event.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
            itemMax = event.target.previousElementSibling.previousElementSibling.value;

            console.log(itemMin);
            console.log(itemMax);

            if(itemMin === '' || itemMax === ''){
                return;
            }

            setFilterNames((prevFilterNames) => ({
                ...prevFilterNames,
                [filterKey] : itemMin+" ~ "+itemMax
            }));
        }

        setInputValue({
            ...inputValue,
            "minIngredients" : "",
            "maxIngredients" : "",
        });
    
      };

    return (
        <Button 
            variant="light"
            onClick={(event) => {
                setModalVisible(!isModalVisible);
            }}
            onBlur={(event) => {
                if (isModalVisible && !event.currentTarget.contains(event.relatedTarget)) {
                    setInputValue({
                        ...inputValue,
                        "minIngredients" : "",
                        "maxIngredients" : "",
                    });
                    setModalVisible(false);
                }
            }}
        >
            {filterNames[filterKey]}
            {isModalVisible && (
                <div onClick={(event) => event.preventDefault()}>
                    <input
                        type="text"
                        name='minIngredients'
                        value={inputValue.minIngredients}
                        placeholder="최소 재료수를 입력하세요."
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name='maxIngredients'
                        value={inputValue.maxIngredients}
                        placeholder="최대 재료수를 입력하세요."
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        onChange={handleInputChange}
                    />
                    {filters.map((element, idx) => (
                    <Button
                        key={idx}
                        variant="light"
                        onClick={(event) => {
                        setModalVisible(isModalVisible);
                        fetchCocktailListByFilters(event);
                        }}
                        onBlur={(event) => {
                        if (isModalVisible === true && !event.currentTarget.contains(event.relatedTarget)) {
                            setModalVisible(!isModalVisible);
                        }
                        }}
                    >
                        {element}
                    </Button>
                    ))}
                </div>
            )}
        </Button>
    );
};

export default RangeFilter;