import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyleDetailDiv = styled.div`
    width: 1030px;
    margin: 74px auto 30px;
    & > div:nth-child(1){
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        & > h3{
            font-size: 17px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: rgb(79, 79, 79);
            margin-bottom: 30px;
        }
        & > div {
            display: grid;
            grid-template-columns: repeat(auto-fill,302px);
            grid-gap: 30px 20px;
            justify-content: center;
            & > div{
                width: 302px;
                height: 292px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                grid-gap: 10px;
                gap: 10px;
                & > div:nth-child(1){
                    position: relative;
                    height: 220px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    & > img{
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
                    height: 62px;
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
    }
    #a{
        height: 60px;
        border-radius: 10px;
        background-color: rgb(242, 242, 242);
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        gap: 8px;
        color: rgb(161, 161, 161);
        font-weight: 600;
        font-size: 14px;
    }
`;   

const CocktailsWithIngredient = ({ cocktailsAndIngredientVo }) => {

    // 화면에 보여줄 데이터
    const [cocktailVoList, setCocktailVoList] = useState([]);

    // useEffect안에 props로 받은데이터 체크 로직
    useEffect(() => {
        if (cocktailsAndIngredientVo && cocktailsAndIngredientVo.cocktailVoList) {
            setCocktailVoList(cocktailsAndIngredientVo.cocktailVoList);
        }
    }, [cocktailsAndIngredientVo]);

    // 카테고리와 , 마우스 오버이벤트를 관리 해줄 state
    const [categoryStates, setCategoryStates] = useState([]);
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

    // 마우스 오버 이벤트
    const handleMouseOver = (event, index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
        setCurrentMouseOverIndex(index);
    };

    // 마우스 아웃 이벤트
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

    // 네비게이트로 칵테일 디테일로 이동시킴
    const navigate = useNavigate();
    const handleClickDetail = (cocktailNo) => {
        navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailNo)}`);
    }

    // 화면에 보여줄 이미지
    const images = () => {
        // cotailVoList 배열만큼 반복
        return cocktailVoList.map((cocktailVo,index) => (
            // 클릭시 디테일로 이동
            <div onClick={() => {handleClickDetail(cocktailVo.cocktailNo)}} key={cocktailVo.id}>
                <div>
                    {/* 썸네일 사진 */}
                    <img src={cocktailVo.cocktailFileName} alt={cocktailVo.cocktailFileName} />
                    <div
                        // 마우스 이벤트로 호버처럼 화면에 보여짐
                        onMouseOver={(event) => handleMouseOver(event, index)}
                        onMouseOut={() => handleMouseOut(index)}
                    >
                        {/* 스타일 삼항연사자로 true false로 div보여줄지 안보여줄지 정함 */}
                        <div style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                                <div>
                                    {"#" + cocktailVo.alcoholStrength}
                                </div>
                                <div>
                                    {"#재료 " + cocktailVo.ingCnt + "개"}
                                </div>
                                {Array.from({ length: 4 }, (_, index) => (
                                    // 칵테일 재료에 베이스 네임 리스트
                                    cocktailVoList[index] && (
                                        <div key={`${cocktailVo.cocktailNo}_${index}`} style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                                            {Array.from({ length: Math.min(4, cocktailVoList[index].baseNameList.length) }, (_, baseIndex) => (
                                                cocktailVoList[index].baseNameList && (
                                                    <div key={baseIndex} >
                                                        {("#"+cocktailVoList[index].baseNameList[baseIndex] || '')}
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
                    {/* 칵테일 이름 설명 */}
                    <div>{cocktailVo.nameKor}</div>
                    <div>{cocktailVo.commentary}</div>
                </div>
            </div>
        ));
    };

    return (
        <StyleDetailDiv>
            <div>
                <h3>해당 재료로 만들 수 있는 칵테일</h3>
                {cocktailVoList.length !== 0 ? (
                    <div>
                        {images()}
                    </div>
                ):(
                    <div id='a'>
                        <img src="https://www.masileng.com/test/ic_tab.svg" alt="" />
                        아직 등록된 레시피가 없어요
                    </div>
                )}
            </div>
        </StyleDetailDiv>
    );
};

export default CocktailsWithIngredient;