import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const StyledSearch = styled.div`
    *:focus {
        outline: 0;
    }
    & > form {
        margin: auto;
        margin-top: 80px;
        width: 94vw;
        height: 60px;
        padding-left: 6px;
        padding-right: 40px;
        border: 2px solid rgb(255, 180, 180);
        border-radius: 10px;
        box-shadow: rgba(8, 10, 37, 0.03) 0rem 0.47rem 2.19rem, rgba(8, 10, 37, 0.03) 0rem 0.94rem 1.41rem, rgba(8, 10, 37, 0.05) 0rem 0.25rem 0.53rem, rgba(8, 10, 37, 0.03) 0rem 0.13rem 0.19rem;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        gap: 20px;
        & > button {
            width: 50px;
            height: 50px;
            background-color: rgb(242, 92, 92);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            & > span {

            }
        }
        & > input {
            font-size: 18px;
            font-weight: 600;
            width: 100%;
            color: #303030;
            border: none;
            
        }
        & #searhIcon{
            width: 60%;
            height: 60%;
        }
    }
`;

const Search = () => {

    const navigete = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (event) => {

        event.preventDefault();

        navigete(`/search?query=${encodeURIComponent(searchValue)}`);
    }

    return (
        <StyledSearch>
            <form onSubmit={handleSearchSubmit}>
                <button>
                    <FontAwesomeIcon id='searhIcon' icon={faSearch} />
                </button>
                <input
                type="text"
                placeholder='만들고 싶은 칵테일, 또는 재료를 검색하세요:)'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}/>
            </form>
        </StyledSearch>
    );
};

export default Search;