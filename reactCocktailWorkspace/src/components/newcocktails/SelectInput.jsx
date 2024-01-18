import React, {useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledSelectInputDiv = styled.div`
    height: 100%;
    margin: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    position: 'relative';

    display: flex;
    flex-direction: column;
    color: rgb(48, 48, 48);
    font-size: 16px;

  & h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    }

  & select {
    width: 100%;
    padding-left: 12.5px;
    margin-bottom: 5px;
    line-height: 19px;
    
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    transition: all 1s ease 0s;
    height: 46px;
    font-weight: 600;   
  }
`;

const SelectInput = ( {title, data} ) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('1');

    useEffect( () => {
        // fetch - get 시에는 재료단위의 배열을 불러온다.
        fetch("http://127.0.0.1:8888/app/cocktail/regist/category")
        .then(resp=> resp.json())
        .then( data => {
          setOptions(data);
        });
    }, []);

    return (
        <StyledSelectInputDiv>
            <h3>{title}</h3>
            <div className='selector'>
            {options.length > 0 && (
                <select name={data} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    {options.map((option) => (
                        <option key={option.no} value={option.no}>
                          {option.name}
                        </option>
                    ))}
                </select>
            )}
            </div>
        </StyledSelectInputDiv>
    );
};

export default SelectInput;