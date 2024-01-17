import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const CocktailItems = ({cocktailVoList}) => {

    const [categoryStates, setCategoryStates] = useState([]);
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

    const navigate = useNavigate();

    // mouse event 발생시 디비 보임
    const handleMouseOver = (event, index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
        setCurrentMouseOverIndex(index);
    };

    // mouse out 이벤트 발생시 안보임
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
    
    // 클릭시 상세 페이지 이동
    const handleClickDetail = (cocktailNo) => {
        navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailNo)}`);
    }

    const images = cocktailVoList.map((cocktailVo, index) => (
        <div onClick={()=>{handleClickDetail(cocktailVo.cocktailNo)}}    key={`${cocktailVo.cocktailNo}_${index}`} >
            <div>
                <img
                    src={"http://127.0.0.1:8888/app/resources/upload/cocktail/image/"+cocktailVo.cocktailFileName}
                    alt={`Cocktail ${cocktailVo.cocktailNo}`}
                />
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
                        {Array.from(
                            {
                                length: Math.min(
                                4,
                                cocktailVoList[index].baseNameList.length
                                ),
                            },
                            (_, innerBaseIndex) => (
                                <div key={innerBaseIndex}>
                                {"#" +
                                    cocktailVoList[index].baseNameList[innerBaseIndex] ||
                                    ''}
                                </div>
                        )
                        )}
                        
                    </div>
                </div>
            </div>
            <div>
                <div>{cocktailVo.nameKor}</div>
                <div>{cocktailVo.commentary}</div>
            </div>
        </div>
    ));

    return (
        <div>
            {images}
        </div>
    );
};

export default CocktailItems;