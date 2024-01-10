import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledExplanInput = styled.div`
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

    & title{
      line-height: 16px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: rgb(79, 79, 79);
    }
    
    & textarea{
      width: 100%;
      padding: 12.5px 15px;
      height: 200px;
      border: 1.4px solid rgb(230, 228, 232);
      border-radius: 10px;
      transition: all 1s ease 0s;
      color: rgb(48, 48, 48);
      font-weight: 600;
      word-wrap: break-word;
      resize: none;
    }

    & .textLength{
      margin-top: 5px;
      line-height: 14px;
      font-size: 12px;
      letter-spacing: -0.5px;
      color: rgb(162, 162, 162);
      align-self: flex-end;
    }
`;

const ExplanInput = ({maxText, title, data}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      if (inputValue.length <= maxText) {
        setText(inputValue);
      }
    };

    const inputElement = document.querySelector(`textarea[name="${data}"]`);
    inputElement.addEventListener('input', handleInputChange);

    return () => {
      inputElement.removeEventListener('input', handleInputChange);
    };
  }, [maxText, data]);
 
  return (
    <StyledExplanInput>
      <h3>{title}</h3>
        <textarea
            name={data}
            maxLength={maxText}
            value={text}
            />
      <div className='textLength'>
        ({text.length}/{maxText})
      </div>
    </StyledExplanInput>
  );
};

export default ExplanInput;