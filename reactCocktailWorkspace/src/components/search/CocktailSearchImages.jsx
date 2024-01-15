import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CocktailSearchImages = ({cocktailVoList}) => {

    // hook
    const navigate = useNavigate();
    const [categoryStates, setCategoryStates] = useState([]);
    const [currentMouseOverIndex, setCurrentMouseOverIndex] = useState(null);

    // 마우스 오버 이벤트 발생시 categoryStates true
    const handleMouseOver = (index) => {
        setCategoryStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
        setCurrentMouseOverIndex(index);
    };

    // 마우스 아웃 이벤트 발생시  categoryStates false
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

     // 칵테일 리스트 반복
     const images = cocktailVoList.map((cocktailVo, index) => (
        <div 
            // div태그에 고유의 키값을 설정
            key={`${cocktailVo.cocktailNo}_${index}`} 
            // 클릭 이벤트시 디테일 페이지로 이동
            onClick={()=>{navigate(`/cocktail/detail?query=${encodeURIComponent(cocktailVo.cocktailNo)}`)}}
        >
            <div>
                {/* 칵테일 이미지 */}
                <img
                    src={cocktailVo.cocktailFileName}
                    alt={`Cocktail ${cocktailVo.cocktailNo}`}
                />
                {/* 마우스 이벤트 */}
                <div
                    // 마우스를 갔다 되면 div display block
                    onMouseOver={() => handleMouseOver(index)}
                    // 마우스를 때면 div display none
                    onMouseOut={() => handleMouseOut(index)}
                >
                    {/* categoryStates값이 true면 block false면 none */}
                    <div style={{ display: categoryStates[index] ? 'block' : 'none' }}>
                        <div>
                            {/* 칵테일 도수 */}
                            {"#" + cocktailVo.alcoholStrength}
                        </div>
                        <div>
                            {/* 칵테일 재료 수 */}
                            {"#재료 " + cocktailVo.ingCnt + "개"}
                        </div>
                        {/* 최대 4번 반복 (태그안에서는 for문을 못써서 대체) */}
                        {Array.from({ length: 4 }, (_, index) => (
                            // voList가 null이면 안보임
                            cocktailVoList[index] && (
                                <div 
                                    // 베이스주 정보 디브 고유의 키 값 설정
                                    key={`${cocktailVo.cocktailNo}_${index}`}
                                >
                                    {/* baseNameList의 길이만큼 반복 */}
                                    {cocktailVo.baseNameList.map((baseName) => (
                                        <div> {"#" + baseName} </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {/* 칵테일 한국이름 , 설명 */}
                <div>{cocktailVo.nameKor}</div>
                <div>{cocktailVo.commentary}</div>
            </div>
        </div>
    ));

    return (
        images
    );
};

export default CocktailSearchImages;