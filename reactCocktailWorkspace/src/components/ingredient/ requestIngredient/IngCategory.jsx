import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IngReqTitle from './IngReqTitle';

const StyledIngCategory = styled.div`
    margin: 10px;
    & > div:nth-child(2){
        display: flex;
        gap: 5px;
        & > span{
            border: 1.4px solid #e6e4e8;
            transition: all .2s;
            font-size: 14px;
            font-weight: 600;
            color: #6e6e6e;
            height: 36px;
            padding-left: 20px;
            padding-right: 20px;
            border: 1.4px solid rgb(230, 228, 232);
            border-radius: 10px;
            background-color: white;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            &.active {
                background-color: rgb(242, 92, 92);
                color: rgb(255, 255, 255);
            }
        }
    }
`;

const IngCategory = ({ setCategory }) => {

    const [btnActive, setBtnActive] = useState("");
    const [categoryList, setCategoryList] = useState([]);

    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/ingredient/categoryList")
        .then(resp => resp.json())
        .then((data)=>{
            console.log(data);
            setCategoryList(data)
        })
    },[])

    const changeCategory = (e,categoryNo) => {
        const category = categoryNo;
        setCategory(category);
        setBtnActive(e.target.innerText);
    }

    return (
        <StyledIngCategory>
            <IngReqTitle title="재료 카테고리"/>
            <div>
                {categoryList.map((ingVo, idx) => (
                    <span
                        key={idx}
                        className={"btn" + (ingVo.ingCategoryName === btnActive ? " active" : "")}
                        onClick={(e) => {
                            changeCategory(e,ingVo.categoryNo)
                        }}
                    >
                        {ingVo.ingCategoryName}
                    </span>
                ))}
            </div>
        </StyledIngCategory>
    );
};

export default IngCategory;
