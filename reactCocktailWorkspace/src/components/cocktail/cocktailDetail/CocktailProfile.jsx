import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// CocktailProfile의 스타일 설정
const StyledDetailDiv = styled.div`
    & > div {
        margin-top: 10px;
        height: 512px;
        background: linear-gradient(#303030,#3c3a3a);
        padding: 58px 0;
        display: flex;
        justify-content: center;
        & > div:nth-child(1) {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 80px;
            & > img {
                border-radius: 10px;
                width: 80px;
                height: 80px;
                cursor: pointer;
            }
        }
        & > img:nth-child(2){
            width: 420px;
            height: 100%;
            margin-left: 20px;
            border-radius: 10px;
        }
        & > div:nth-child(3){
    margin-left: 50px;
    flex: 0 0 100%; 
    max-width: 350px; 
    
    & > div:nth-child(1){
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        & > div{
            font-size: 14px;
            font-weight: 800;
            color: rgb(242, 92, 92);
        }
    }
            & > div:nth-child(2){
                margin-top: 30px;
                gap: 10px;
                display: flex;
                align-items: flex-end;
                & > div:nth-child(1){
                    font-size: 28px;
                    font-weight: 800;
                    color: rgb(255, 255, 255);
                }
                & > div:nth-child(2){
                    font-size: 15px;
                    font-weight: 900;
                    color: rgb(110, 110, 110);
                }
            }
            & > div:nth-child(3){
                line-height: 1.8;
                color: rgb(193, 193, 193);
                height: auto;
                font-size: 16px;
                font-weight: normal;
            }
            & > div:nth-child(4){
                display: flex;
                margin-top: 10px;
                & > div{
                    height: 35px;
                    padding-left: 20px;
                    padding-right: 20px;
                    background-color: transparent;
                    border: 1.6px solid rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                    color: rgb(162, 162, 162);
                    font-size: 13px;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                }
            }
            & > div:nth-child(5){
                margin-top: 50px;
                & > button{
                    background-color: rgba(255,255,255,.1);
                    width: 68px;
                    height: 68px;
                    border: none;
                    border-radius: 100px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    color: white;
                }
            }
        }
    }
`;

// CocktailProfile 함수
const CocktailProfile = ({ cocktailAndIngredientsVO }) => {

    // navigate생성
    const navigate = useNavigate();

    // 변하는 상태값 [state들]
    const [ingredientVoList, setIngredientVoList] = useState([]);
    const [cocktailFileList, setCocktailFileList] = useState([]);
    const [cocktailVo, setCocktailVo] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [likeCnt, setLikeCnt] = useState(0);
    const [isLiked, setIsLiked] = useState();

    // useEffect 
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 칵테일 북마크 조회 ok 
    useEffect(() => {
        
        let vo = {}; // vo 변수를 useEffect 내에서 선언

        const fetchData = async () => {
            try {
                vo = {
                    memberNo: "1",
                    cocktailNo: cocktailAndIngredientsVO.cocktailVo.cocktailNo,
                };

                // await를 이용해 fetch 비동기 작업이 끝나기 전까지 다른작업을 못하게 만듬
                const response = await fetch("http://127.0.0.1:8888/app/bookmark/status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vo)
                });

                // 상태코드 확인
                if (!response.ok) {
                    throw new Error("북마크 여부 조회 fetch함수 오류 발생");
                }

                // await 에 리스폰스 객체를 json타입으로 변경
                const data = await response.json();

                // 받아온 데이터의 status값이 o면 true x면 false설정
                if (data.status === 'o') {
                    setIsLiked(true);
                } else if (data.status === 'x') {
                    setIsLiked(false);
                } else {
                    throw new Error("북마크 여부 조회 실패");
                }
            // 실패시 에러페이지 이동
            } catch (error) {
                console.log(error);
                navigateCallback();
            }
        };

        // null undefined 체크후 state들 값 할당
        if (cocktailAndIngredientsVO && cocktailAndIngredientsVO.ingredientVoList && cocktailAndIngredientsVO.cocktailVo) {
            setIngredientVoList(cocktailAndIngredientsVO.ingredientVoList);
            setCocktailVo(cocktailAndIngredientsVO.cocktailVo);
            setCocktailFileList(cocktailAndIngredientsVO.cocktailVo.cocktailFileNameList);
            setMainImg(cocktailAndIngredientsVO.cocktailVo.cocktailFileNameList[0]);
            setLikeCnt(cocktailAndIngredientsVO.cocktailVo.likeCnt);
            fetchData();
        }
    }, [cocktailAndIngredientsVO,navigateCallback]);

    // 최대 10번 반복 base리스트에 데이터 들을 화면에 보여줌
    const baseNames = (() => {
        return Array.from({ length: Math.min(10, ingredientVoList.length) }, (_, index) => {
            const ingredientVo = ingredientVoList[index];
            if (ingredientVo.baseName !== '없음') {
                return <div key={index}>#{ingredientVo.baseName}</div>;
            }
            return null;
        });
    })();

    // 이미지를 다음 배열의 크기만큼 이미지를 화면에 보여줌
    const images = cocktailFileList.map((fileName,index) => (
        <img onClick={()=>{setMainImg(fileName)}} key={fileName} src={fileName} alt={index+fileName} />
      ));

    // 하트 좋아요 요청
    const handleClickHeart = () => {

        let likeStatus = 0;
        if(isLiked){
            likeStatus = 1;
        }

        // 백엔드에 보내줄 데이터
        const vo = {
            memberNo: "1",
            cocktailNo: cocktailAndIngredientsVO.cocktailVo.cocktailNo,
            likeStatus : likeStatus,
        }

        // 비동기 요청
        fetch("http://127.0.0.1:8888/app/bookmark",{
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(vo)
        })
        .then(resp => {
            if(!resp.ok){
                throw new Error("좋아요 누르기 fetch함수 오류 발생")
            }
            return resp.json();
        })
        .then(data => {
            // 받아온 데이터에 따라 북마크 수와 북마크 여부를 설정함
            if(data.msg === 'deleteSuccess'){
                setLikeCnt(Number(likeCnt)-1);
                setIsLiked(false);
            }
            if(data.msg === "createSuccess"){
                setLikeCnt(Number(likeCnt)+1);
                setIsLiked(true);
            }
            if(data.msg === 'bad'){
                throw new Error("좋아요 누르기 실패");
            }
        })
        // 오류시 에러페이지 이동
        .catch((e) => {
            console.log(e);
            navigate("/error");
        })
    }

    return (
        <StyledDetailDiv>
            <div>
                <div>
                    {images}
                </div>
                <img src={mainImg} alt={mainImg} />
                <div>
                    <div>
                        <div>#{cocktailVo.alcoholStrength}</div>
                        <div>#재료 {ingredientVoList.length}개</div>
                        {baseNames}
                    </div>
                    <div>
                        <div>{cocktailVo.nameKor}</div>
                        <div>{cocktailVo.nameEng}</div>
                    </div>
                    <div>{cocktailVo.commentary}</div>
                    <div>
                        <div>도수 : {cocktailVo.alc}도</div>
                    </div>
                    <div>
                        {
                            <button 
                                onClick={handleClickHeart}
                                style={{ backgroundColor: isLiked ? 'rgba(242,92,92,.9)' : 'rgba(255,255,255,.1)' }}
                            >
                            <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                            <div>{likeCnt}</div>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </StyledDetailDiv>
    );
};

export default CocktailProfile;


