import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import CocktailItems from './CocktailItems';
import FilterButton from './FilterButton';
import RangeFilterButton from './RangeFilterButton';
import { useNavigate } from 'react-router-dom';

// 스타일은 따로 안나눔 ..
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

    // useNavigate생성 
    const navigate = useNavigate();

    // 응답받은 데이터를 받을 배열 스테이트
    const [voList, setVoList] = useState([]);

    // 모달을 구별하여 누를때 마다 각자의 모달이 닫히게 설정
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);

    // 필터 타이틀객체
    const [filterTitles, setFilterTitles] = useState({
        filterTitle1: "도수",
        filterTitle2: "재료 수",
        filterTitle3: "베이스주",
        filterTitle4: "최신순",
    });

    // 필터내용
    const filterContents = {
        filterContent1 : ['전체','무알콜','약한 도수','강한 도수'],
        filterContent2 : ['전체조회','조회하기'],
        filterContent3 : ['전체','럼','보드카','위스키','진','데킬라','브랜디','소주'],
        filterContent4 : ['최신순','좋아요순'],
    }

    // 필터 타이틀에 재료 수 부분의 숫자 ~ 숫자에서  ~를 빼고 숫자만 가져옴 
    function getBeforeTilde(str) {
        const parts = str.split('~');
        return parts;
    }

    // useCallBack을 이용해서 useEffect안에 에러 처리후 url이동가능
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 렌더링 시 화면 변경
    useEffect(()=>{

        // filterTitles에서 ~부분을 없애고 숫자를 배열로 리턴받음
        const result = getBeforeTilde(filterTitles.filterTitle2);

        // item값을 저장
        let itemMin = result[0];
        let itemMax = result[1];

        // 요청 보냄
        fetch(`http://127.0.0.1:8888/app/cocktail/list?alc=${filterTitles.filterTitle1}&itemMin=${itemMin}&itemMax=${itemMax}&baseName=${filterTitles.filterTitle3}&order=${filterTitles.filterTitle4}`)
        .then(resp => {
            if(!resp.ok){
                throw new Error("상태코드 이상함");
            }
            return resp.json();
        })
        .then((data) => {
            setVoList(data);
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
            navigateCallback();
        })

        // 의존성 배열 filterTitles가 변경되면 useEffect 실행
    }, [filterTitles,navigateCallback])

    return (
        <StyledListDiv>
            <div>
                {/* props로 데이터 전달 */}
                <FilterButton
                    setModalVisible = {setModalVisible}
                    isModalVisible={isModalVisible}
                    setFilterTitles = {setFilterTitles}
                    filterTitles = {filterTitles}
                    index={1}
                    setVoList = {setVoList}
                    filterContents = {filterContents.filterContent1}
                />
                {/* props로 데이터 전달 */}
                <RangeFilterButton 
                    setModalVisible = {setModalVisible2}
                    isModalVisible={isModalVisible2}
                    setFilterTitles = {setFilterTitles}
                    filterTitles = {filterTitles}
                    index={2}
                    setVoList = {setVoList}
                    filterContents = {filterContents.filterContent2}
                />
                {/* props로 데이터 전달 */}
                <FilterButton
                    setModalVisible = {setModalVisible3}
                    isModalVisible={isModalVisible3}
                    setFilterTitles = {setFilterTitles}
                    filterTitles = {filterTitles}
                    index={3}
                    setVoList = {setVoList}
                    filterContents = {filterContents.filterContent3}
                />
                {/* props로 데이터 전달 */}
                <FilterButton
                    setModalVisible = {setModalVisible4}
                    isModalVisible={isModalVisible4}
                    setFilterTitles = {setFilterTitles}
                    filterTitles = {filterTitles}
                    index={4}
                    setVoList = {setVoList}
                    filterContents = {filterContents.filterContent4}
                />
            </div>
            <CocktailItems cocktailVoList={voList} />
        </StyledListDiv>
    );
};

export default CocktailList;





