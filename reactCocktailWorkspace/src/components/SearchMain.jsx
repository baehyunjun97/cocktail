import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMainSearchDiv = styled.div`
    & > div:nth-child(1) {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        & > div {
            margin-top: 50px;
            margin-bottom: 30px;
            display: flex;
            gap: 10px;
            & > button {
                width: 157.5px;
                height: 42px;
                border-radius: 10px;
                background-color: white;
                color: rgb(89, 47, 0);
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                box-shadow: rgba(8, 10, 37, 0.03) 0rem 0.47rem 2.19rem, rgba(8, 10, 37, 0.03) 0rem 0.94rem 1.41rem, rgba(8, 10, 37, 0.05) 0rem 0.25rem 0.53rem, rgba(8, 10, 37, 0.03) 0rem 0.13rem 0.19rem;
                &:hover {
                    background: rgb(242, 92, 92);
                }
            }
        }
    }
    & > div:nth-child(2) > div:nth-child(1) {
        width: 100%;
        max-width: 1030px;
        margin: 0 auto 30px;
        display: flex;
        align-items: center;
        & > h3 {
            font-size: 16px;
            line-height: 16px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: rgb(79, 79, 79);
        }
    }
    & > div:nth-child(2) > div:nth-child(2) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                &> img {
                    width: 100%;
                    height: 220px;
                    border-radius: 10px;
                    object-fit: cover;
                }
                & > div  {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    padding: 10px 20px;
                    &:hover {
                        background: linear-gradient(
                            180deg,
                            rgba(84,85,91,.7),
                            hsla(234,8%,53%,.3)
                        );
                        transition: all .3s;
                    }
                    & > div > div {
                        padding-bottom: 5px;
                        font-weight: 600;
                        color: white;
                        & > div {
                            padding-bottom: 5px;
                        }
                    }
                }
            }
            & > div:nth-child(2){
                /* height: 62px; */
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-weight: 800;
                }
                & > div:nth-child(2){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgb(131, 131, 131);
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
    & > div:nth-child(3) > div:nth-child(1) {
        width: 100%;
        max-width: 1030px;
        margin: 0 auto 30px;
        display: flex;
        align-items: center;
        & > h3 {
            font-size: 16px;
            line-height: 16px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: rgb(79, 79, 79);
        }
    }
    & > div:nth-child(3) > div:nth-child(2) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                & > img {
                    width: 100%;
                    height: 220px;
                    border-radius: 10px;
                    object-fit: cover;
                }
                & > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    &:hover{
                        background : linear-gradient(
                            180deg,
                            rgba(84,85,91,.7),
                            hsla(234,8%,53%,.3)
                        );
                        transition: all .3s;
                    }
                    & > div {
                        padding: 10px 20px;
                        font-weight: 600;
                        color: white;
                    }
                }
            }
            & > div:nth-child(2){
                /* height: 62px; */
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-weight: 800;
                }
                & > div:nth-child(2){
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgb(131, 131, 131);
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
`;

// searchMain
const SearchMain = () => {
    
    // 쿼리스트링에 값을 받아옴
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get('query');

    // state들
    const [cocktailVoList, setCocktailVoList] = useState([]);
    const [ingredientVoList, setIngredientVoList] = useState([]);
    const [categoryStates, setCategoryStates] = useState([]);
    const [categoryStates2, setCategoryStates2] = useState(Array(ingredientVoList.length).fill(false));
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

    // 렌더링시 s
    useEffect(() => {
        fetch('http://127.0.0.1:8888/app/cocktail/search?searchName='+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailVoList(data.cocktailVoList);
            setIngredientVoList(data.ingredientVoList);
        })
    },[queryValue]);

    const handleMouseOver = (event, index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
        setCurrentMouseOverIndex(index);
    };

    const handleMouseOut = () => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            if (currentMouseOverIndex !== null) {
                newStates[currentMouseOverIndex] = false;
            }
            return newStates;
        });
        setCurrentMouseOverIndex(null);
    };

    const handleMouseOver2 = (index) => {
        setCategoryStates2((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
    };
    
    const handleMouseOut2 = (index) => {
        setCategoryStates2((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = false;
            return newStates;
        });
    };

    const images = cocktailVoList.map((mapVo, index) => (
        <div key={`${mapVo.cocktailNo}_${index}`} onClick={()=>{
            handleClickCocktailDetail(mapVo.cocktailNo)
        }}>
            <div>
                <img
                    src="https://sitem.ssgcdn.com/"
                    alt={`Cocktail ${mapVo.cocktailNo}`}
                />
                <div
                    onMouseOver={(event) => handleMouseOver(event, index)}
                    onMouseOut={() => handleMouseOut(index)}
                >
                    <div style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                        <div
                            style={{ display: categoryStates[index] ? 'block' : 'none' }}
                        >
                            {"#" + mapVo.alcoholStrength}
                        </div>
                        <div
                            style={{ display: categoryStates[index] ? 'block' : 'none' }}
                        >
                            {"#재료 " + mapVo.ingCnt + "개"}
                        </div>
                        {Array.from({ length: 4 }, (_, index) => (
                        cocktailVoList[index] && (
                            <div key={`${mapVo.cocktailNo}_${index}`} style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                                {cocktailVoList[index].baseNameList && cocktailVoList[index].baseNameList.map((baseMapVo, baseIndex) => (
                                    <div key={baseIndex} >
                                        {"#" + baseMapVo}
                                    </div>
                                ))}
                            </div>
                        )
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div>{mapVo.nameKor}</div>
                <div>{mapVo.commentary}</div>
            </div>
        </div>
    ));

    const navigate = useNavigate();

    // 클릭시 상세 페이지 이동
    const handleClickCocktailDetail = (cocktailNo) => {
        console.log(cocktailNo);
        // setCocktailNo(cocktailNo);
        navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailNo)}`);
    }

    // 클릭시 상세 페이지 이동
    const handleClickIngredientDetail = (ingNo) => {
        console.log(ingNo);
        // setCocktailNo(cocktailNo);
        navigate(`/ingredient/detail?query=${encodeURIComponent(ingNo)}`);
    }

    // 
    const images2 = ingredientVoList.map((mapVo, index) => (
        <div key={mapVo.ingNo} onClick={()=>{handleClickIngredientDetail(mapVo.ingNo)}}>
          <div>
            <img
              src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_ITEM_MASTER/022.%EA%B0%88%EB%A6%AC%EC%95%84%EB%85%B8.png"
              alt={`Cocktail ${mapVo.ingNo}`}
            />
            <div
              onMouseOver={() => handleMouseOver2(index)}
              onMouseOut={() => handleMouseOut2(index)}
            >
              <div
                className={`category${mapVo.ingNo}`}
                style={{ display: categoryStates2[index] ? 'block' : 'none' }}
              >
                {"#"+mapVo.ingCategoryName}
              </div>
            </div>
          </div>
          <div>
            <div>{mapVo.ingName}</div>
            <div>{mapVo.explanation}</div>
          </div>
        </div>
      ));

      const handelClickAllList = () => {
        fetch('http://127.0.0.1:8888/app/cocktail/search?searchName='+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailVoList(data.cocktailVoList);
            setIngredientVoList(data.ingredientVoList);
        })
      }

      const handelCocktailList = () => {
        fetch('http://127.0.0.1:8888/app/cocktail/search?searchName='+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailVoList(data.cocktailVoList);
            setIngredientVoList(["no"]);
        })
      }

      const handelIngredientList = () => {
        fetch('http://127.0.0.1:8888/app/cocktail/search?searchName='+queryValue)
        .then(resp => resp.json())
        .then((data) => {
            setCocktailVoList(["no"]);
            setIngredientVoList(data.ingredientVoList);
        })
      }

    return (
        <StyledMainSearchDiv>
            <div>
                <div>
                    <button onClick={handelClickAllList}>전체</button>
                    <button onClick={handelCocktailList}>칵테일</button>
                    <button onClick={handelIngredientList}>재료</button>
                </div>
            </div>
            {cocktailVoList[0] !== "no" ? (
            <div>
                <div>
                    <img src="https://www.masileng.com/test/ic_cocktail.svg" alt="" />
                    <h3>칵테일</h3>
                </div>
                <div>
                {cocktailVoList.length !== 0 ? (
                    images
                ) : (
                    <div className='noSearch'>
                        <img src="https://www.masileng.com/test/ic_tab.svg" alt="" />
                        <div>
                            검색 결과가 없습니다.
                        </div>
                    </div>
                )}
                </div>
            </div>
            ) : (
                <span></span>
            )}
            {ingredientVoList[0] !== "no" ? (
                <div>
                    <div>
                        <img src="https://www.masileng.com/test/ic_ingredient.svg" alt="" />
                        <h3>재료</h3>
                    </div>
                    {ingredientVoList.length !== 0 ? (
                        <div>
                            {images2}
                        </div>
                    ) : (
                        <div style={{ width: "1000px" }}>
                            <div className='noSearch'>
                                <img src="https://www.masileng.com/test/ic_tab.svg" alt="" />
                                <div>
                                    검색 결과가 없습니다.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <span></span>
            )}
        </StyledMainSearchDiv>
    );
};

export default SearchMain;
