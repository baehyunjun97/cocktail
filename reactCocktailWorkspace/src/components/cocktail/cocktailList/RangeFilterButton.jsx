import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// 레인지 필터 버튼 컴포넌트
const RangeFilterButton = ({isModalVisible, setModalVisible, setFilterTitles, filterTitles, index, filterContents}) => {

    // 필터 키 설정 ( index값을 비교해서 상황에 따라 usestate에 저장되는 값이 달라짐 )
    const [filterKey, setFilterKey] = useState('');

    // inputValue min max 숫자 state
    const [inputValue, setInputValue] = useState({
        minIngredients : "",
        maxIngredients : "",
    });

    // input 태그에 값이 달라지면 실행되는 함수
    const handleInputChange = (event) => {

        // target에 데이터 저장
        let { name, value } = event.target;

        // value값에 정규식 이용해서 숫자만 허용 , 0,3까지 입력가능
        value = value.replace(/[^0-9]/g, '').slice(0, 3);

        // inputValue에 에 타켓에 value값을 저장 ( 화면이 동적으로 변경 )
        setInputValue({
            ...inputValue,
            [name] : value
        });
    };

    // index,inputValue중 값이 변한다면 filter키를 재설정함
    useEffect(() => {
        setFilterKey('filterTitle' + index);
    }, [index,inputValue]);

    // input태그의 value값 초기화
    const clearInputValue = () => {
        setInputValue({
            ...inputValue,
            "minIngredients" : "",
            "maxIngredients" : "",
        });
    }

    // 조회하기 버튼 클릭시 데이터를 변경해서 상위 컴포넌트에서 요청을 보내게 함
    const fetchCocktailListByFilters = (event) => {

        // 처음에 filterKey의 값을 설정함
        setFilterTitles((prevFilterTitles) => ({
            ...prevFilterTitles,
            [filterKey]: "재료 수",
          }));

        // 기본값을 null로 설정
        let itemMin = null;
        let itemMax = null;

        // 만약 타겟의 innerText의 값이 조회하기면 itemMin의 값을 재설정
        if(event.target.innerText === '조회하기'){

            itemMin = event.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
            itemMax = event.target.previousElementSibling.previousElementSibling.value;

            // 들어옴 값이 만약 ''빈 문자열이면 그냥 리턴시킴
            if(itemMin === '' || itemMax === ''){
                return;
            }

            // 변경된 값으로 title을 재설정
            setFilterTitles((prevFilterTitles) => ({
                ...prevFilterTitles,
                [filterKey] : itemMin+" ~ "+itemMax
            }));
        }

        // 모달이 꺼지므로 value값을 초기화
        clearInputValue();
    
      };

    return (
        <Button 
            variant="light"
            // 모달 토글
            onClick={() => {
                setModalVisible(!isModalVisible);
            }}
            // 모달토글 + input태그의 value값 초기화
            onBlur={(event) => {
                if (isModalVisible && !event.currentTarget.contains(event.relatedTarget)) {
                    clearInputValue();
                    setModalVisible(false);
                }
            }}
        >
            {filterTitles[filterKey]}
            {isModalVisible && (
                <div>
                    <input
                        type="text"
                        name='minIngredients'
                        // state값으로 동적으로 변경
                        value={inputValue.minIngredients}
                        placeholder="최소 재료수를 입력하세요."
                        // 클릭시 이벤트 버블링 중단
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        // value값이 변할때마다 State에 없데이트
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name='maxIngredients'
                        // state값으로 동적으로 변경
                        value={inputValue.maxIngredients}
                        placeholder="최소 재료수를 입력하세요."
                        // 클릭시 이벤트 버블링 중단
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        // value값이 변할때마다 State에 없데이트
                        onChange={handleInputChange}
                    />
                    {/* 필터 내용 화면에 보여주기 */}
                    {filterContents.map((element, idx) => (
                        // 조회 버튼
                        <Button
                            key={idx}
                            variant="light"
                            onClick={(event) => {
                            setModalVisible(isModalVisible);
                            fetchCocktailListByFilters(event);
                            }}
                            onBlur={(event) => {
                            if (isModalVisible === true && !event.currentTarget.contains(event.relatedTarget)) {
                                setModalVisible(!isModalVisible);
                            }
                            }}
                        >
                            {element}
                        </Button>
                    ))}
                </div>
            )}
        </Button>
    );
};

export default RangeFilterButton;