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

const CocktailsWithIngredient = ({ map }) => {

    const [cocktailVoList, setCocktailVoList] = useState([]);

    useEffect(() => {
        if (map && map.cocktailVoList) {
            setCocktailVoList(map.cocktailVoList);
        }
    }, [map]);

    const [categoryStates, setCategoryStates] = useState([]);
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

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

    const navigate = useNavigate();

    const handleClickDetail = (cocktailNo) => {
        console.log(cocktailNo);
        // setCocktailNo(cocktailNo);
        navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailNo)}`);
    }

    const images = () => {
        return cocktailVoList.map((cocktailVo,index) => (
            <div onClick={() => {handleClickDetail(cocktailVo.cocktailNo)}} key={cocktailVo.id}>
                <div>
                    <img src={cocktailVo.cocktailFileName} alt={cocktailVo.cocktailFileName} />
                    <div
                        onMouseOver={(event) => handleMouseOver(event, index)}
                        onMouseOut={() => handleMouseOut(index)}
                    >
                        <div style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                                <div
                                    style={{ display: categoryStates[index] ? 'block' : 'none' }}
                                >
                                    {"#" + cocktailVo.alcoholStrength}
                                </div>
                                <div
                                    style={{ display: categoryStates[index] ? 'block' : 'none' }}
                                >
                                    {"#재료 " + cocktailVo.ingCnt + "개"}
                                </div>
                                {Array.from({ length: 4 }, (_, index) => (
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