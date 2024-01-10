// Main.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const StyledListDiv = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    & > div {
        margin: auto;
        display: inline-block;
        margin-bottom: 50px;
        & > button {
            width: 120px;
            font-weight: 600;
            color: #6e6e6e;
            height: 30px;
            margin: 0px 10px;
            padding: 0px 20px;
            box-shadow: 0 0.47rem 2.19rem rgba(8, 10, 37, 0.03), 0 0.94rem 1.41rem rgba(8, 10, 37, 0.03), 0 0.25rem 0.53rem rgba(8, 10, 37, 0.05), 0 0.13rem 0.19rem rgba(8, 10, 37, 0.03);
            & > div {
                display: flex;
                position: absolute;
                width: 181px;
                border-radius: 10px;
                background-color: white;
                box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
                cursor: pointer;
                flex-direction: column;
                z-index: 1;

                /* 부모 요소에 relative 설정 */
                position: relative;

                /* 왼쪽으로 20px 이동 */
                top: 20px;
                left: -56px;
                & > div:hover {
                    background-color: #c6c7c8; opacity : 0.5;
                }
                &  > button {
                    width: 100%;
                    height: 100%;
                    border: none;
                    &:hover {
                        background-color: #c6c7c8; ;
                    }
                }
                &  > input {
                    width: 100%;
                    height: 24px;
                    border: none;
                    font-size: 13px;
                }
            }
        }
    }
    
    & > div:nth-child(2) {
        margin: auto;
        width: 90vw;
        display: grid;
        grid-template-columns: repeat(auto-fill, 302px);
        grid-gap: 30px 20px;
        justify-content: center;
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            & > div:nth-child(1){
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
                height: 62px;
                display: flex;
                flex-direction: column;
                grid-gap: 5px;
                gap: 5px;
                & > div:nth-child(1){
                    margin-top: 10px;
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

// 컴포넌트 시작

const CocktailList = () => {
    const navigate = useNavigate();

    // 랜더링이 다시 시작하면 발생
    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/cocktail/list")
        .then(resp => resp.json())
        .then((data) => {
            setVoList(data);
        })
    }, [])

    // 스테이트로 화면 관리
    const [voList, setVoList] = useState([]);
    const [categoryStates, setCategoryStates] = useState([]);
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

    // const [cocktailNo, setCocktailNo] = useState('');

    // 클릭시 상세 페이지 이동
    const handleClickDetail = (cocktailNo) => {
        console.log(cocktailNo);
        // setCocktailNo(cocktailNo);
        navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailNo)}`);
    }

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

    const images = voList.map((mapVo, index) => (
        <div onClick={()=>{handleClickDetail(mapVo.cocktailNo)}}    key={`${mapVo.cocktailNo}_${index}`} >
            <div>
                <img
                    src={mapVo.cocktailFileName}
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
                            voList[index] && (
                                <div key={`${mapVo.cocktailNo}_${index}`} style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                                    {Array.from({ length: Math.min(4, voList[index].baseNameList.length) }, (_, baseIndex) => (
                                        voList[index].baseNameList && (
                                            <div key={baseIndex} >
                                                {("#"+voList[index].baseNameList[baseIndex] || '')}
                                            </div>
                                        )
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

    function getBeforeTilde(str) {
        // 문자열을 "~" 기준으로 나눠 배열로 만듭니다.
        const parts = str.split('~');
        
        // "~" 기준으로 나뉜 부분 중 첫 번째 부분을 반환합니다.
        return parts;
      }

    
    const filterCocktaillist = (event) => {
        
        const fillter = event.target.innerText;
        setFilterName4(fillter);

        const result = getBeforeTilde(filterName2);

        let itemMin = result[0];
        let itemMax = result[1];

        if(itemMin === "재료수" || itemMax === "재료수"){
            itemMin = null;
            itemMax = null;
        }

        if(typeof itemMin == "undefined" || typeof itemMax == "undefined"){
            itemMin = null;
            itemMax = null;
        }

        fetch(`http://127.0.0.1:8888/app/cocktail/list?alc=${filterName}&itemMin=${itemMin}&itemMax=${itemMax}&baseName=${filterName3}&order=${fillter}`)
            .then(resp => resp.json())
            .then((data) => {
                setVoList(data);
        });
    };

     const filterCocktaillist2 = (event) => {
        
        let fillter = event.target.innerText;

        if(event.target.innerText === "전체"){fillter = "베이스주"}
        
        setFilterName3(fillter);

        const result = getBeforeTilde(filterName2);

        let itemMin = result[0];
        let itemMax = result[1];

        if(itemMin === "재료수" || itemMax === "재료수"){
            itemMin = null;
            itemMax = null;
        }

        if(typeof itemMin == "undefined" || typeof itemMax == "undefined"){
            itemMin = null;
            itemMax = null;
        }

        fetch(`http://127.0.0.1:8888/app/cocktail/list?alc=${filterName}&itemMin=${itemMin}&itemMax=${itemMax}&baseName=${fillter}&order=${filterName4}`)
            .then(resp => resp.json())
            .then((data) => {
                setVoList(data);
        });
    };

    const filterCocktaillist3 = (event) => {
        
        let fillter = event.target.innerText;

        if(event.target.innerText === "전체"){fillter = "도수"}
        
        setFilterName(fillter);

        const result = getBeforeTilde(filterName2);

        let itemMin = result[0];
        let itemMax = result[1];

        if(itemMin === "재료수" || itemMax === "재료수"){
            itemMin = null;
            itemMax = null;
        }

        if(typeof itemMin == "undefined" || typeof itemMax == "undefined"){
            itemMin = null;
            itemMax = null;
        }

        fetch(`http://127.0.0.1:8888/app/cocktail/list?alc=${fillter}&itemMin=${itemMin}&itemMax=${itemMax}&baseName=${filterName3}&order=${filterName4}`)
            .then(resp => resp.json())
            .then((data) => {
                setVoList(data);
        });

    };

    const filterCocktaillist4 = (event) => {

        setFilterName2("재료수");
        let itemMin = null;
        let itemMax = null;

        if(event.target.innerText !== "전체조회"){
            itemMin = event.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
            itemMax = event.target.previousElementSibling.previousElementSibling.value;

            if(itemMin === '' || itemMax === ''){
                return;
            }

            setFilterName2(itemMin + "~" + itemMax);
        }

        setInputValue("");
        setInputValue2("");

        fetch(`http://127.0.0.1:8888/app/cocktail/list?alc=${filterName}&itemMin=${itemMin}&itemMax=${itemMax}&baseName=${filterName3}&order=${filterName4}`)
            .then(resp => resp.json())
            .then((data) => {
                setVoList(data);
        });
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);

    const [filterName , setFilterName] = useState("도수");
    const [filterName2 , setFilterName2] = useState("재료수");
    const [filterName3 , setFilterName3] = useState("베이스주");
    const [filterName4 , setFilterName4] = useState("최신순");

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const handleInputChange = (e) => {
        // 숫자 이외의 문자를 제거하고 최대 6자로 제한
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
        setInputValue(value);
    };
    const handleInputChange2 = (e) => {
        // 숫자 이외의 문자를 제거하고 최대 6자로 제한
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
        setInputValue2(value);
    };

    return (
        <StyledListDiv>
            <div>
            { filterName === "도수" || filterName === "전체" ? (
                <Button
                    variant="light"
                    onClick={() => {
                        setModalVisible(!isModalVisible);
                    }}
                    onBlur={() => {
                        if (isModalVisible === true) {
                            setModalVisible(!isModalVisible);
                        }
                    }}
                >
                    {filterName}
                    {isModalVisible && (
                        <div onClick={filterCocktaillist3}>
                            <div>무알콜</div>
                            <div>약한 도수</div>
                            <div>강한 도수</div>
                        </div>
                    )}
                </Button>
                ) : (
                    <Button
                    variant="light"
                    onClick={() => {
                        setModalVisible(!isModalVisible);
                    }}
                    onBlur={() => {
                        if (isModalVisible === true) {
                            setModalVisible(!isModalVisible);
                        }
                    }}
                >
                    {filterName}
                    {isModalVisible && (
                        <div onClick={filterCocktaillist3}>
                            <div>전체</div>
                            <div>무알콜</div>
                            <div>약한 도수</div>
                            <div>강한 도수</div>
                        </div>
                    )}
                    </Button>
                )}
                <Button
                    variant="light"
                    onClick={() => {
                        setModalVisible2(!isModalVisible2);
                    }}
                    onBlur={(event) => {
                        if (isModalVisible2 && !event.currentTarget.contains(event.relatedTarget)) {
                            setModalVisible2(false);
                        }
                    }}
                >
                    {filterName2}
                    {isModalVisible2 && (
                        <div onClick={(event) => event.preventDefault()}>
                            <input
                                type="text"
                                value={inputValue}
                                placeholder="최소 재료수를 입력하세요."
                                onChange={handleInputChange}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <input
                                type="text"
                                value={inputValue2}
                                placeholder="최대 재료수를 입력하세요."
                                onChange={handleInputChange2}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                             <Button 
                                variant="light" 
                                onClick={(event) => {
                                    setModalVisible4(!isModalVisible2);
                                    filterCocktaillist4(event);
                                }} 
                                onBlur={() => {
                                    if (isModalVisible2 === true) {
                                        setModalVisible2(!isModalVisible2);
                                    }
                                }}
                            >
                                전체조회
                            </Button>
                            <Button 
                                variant="light" 
                                onClick={(event) => {
                                    setModalVisible4(!isModalVisible2);
                                    filterCocktaillist4(event);
                                }} 
                                onBlur={() => {
                                    if (isModalVisible2 === true) {
                                        setModalVisible2(!isModalVisible2);
                                    }
                                }}
                            >
                                조회하기
                            </Button>
                        </div>
                    )}
                </Button>
                { filterName3 === "베이스주" || filterName3 === "전체" ? (
                <Button
                    variant="light"
                    onClick={() => {
                        setModalVisible3(!isModalVisible3);
                    }}
                    onBlur={() => {
                        if (isModalVisible3 === true) {
                            setModalVisible3(!isModalVisible3);
                        }
                    }}
                >
                    {filterName3}
                    {isModalVisible3 && (
                        <div onClick={filterCocktaillist2}>
                            <div>럼</div>
                            <div>보드카</div>
                            <div>위스키</div>
                            <div>진</div>
                            <div>데킬라</div>
                            <div>브랜디</div>
                            <div>소주</div>
                        </div>
                    )}
                </Button>
                ) : (
                    <Button
                    variant="light"
                    onClick={() => {
                        setModalVisible3(!isModalVisible3);
                    }}
                    onBlur={() => {
                        if (isModalVisible3 === true) {
                            setModalVisible3(!isModalVisible3);
                        }
                    }}
                >
                    {filterName3}
                    {isModalVisible3 && (
                        <div onClick={filterCocktaillist2}>
                            <div>전체</div>
                            <div>럼</div>
                            <div>보드카</div>
                            <div>위스키</div>
                            <div>진</div>
                            <div>데킬라</div>
                            <div>브랜디</div>
                            <div>소주</div>
                        </div>
                    )}
                    </Button>
                )}
                <Button variant="light" onClick={() => {setModalVisible4(!isModalVisible4)}} onBlur={() => {if(isModalVisible4 === true){setModalVisible4(!isModalVisible4)}}}>{filterName4}
                {isModalVisible4 && (
                    <div onClick={filterCocktaillist}>
                        <div>최신순</div>
                        <div>좋아요순</div>
                    </div>
                )}
                </Button>{' '}
            </div>
            <div>
                {images}
            </div>
        </StyledListDiv>
    );
};

export default CocktailList;
