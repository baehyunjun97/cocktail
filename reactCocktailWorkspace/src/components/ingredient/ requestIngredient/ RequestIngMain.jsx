import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../Header';
import TextInput from '../../newcocktails/TextInput';
import IngGuide from './IngGuide';
import IngImgUpload from './IngImgUpload';
import { useNavigate } from 'react-router-dom';
import SelectBtn from './SelectBtn';
import IngReqTitle from './IngReqTitle';

const StyledRequestIngDIv = styled.div`
    margin-top: 100px;
    width: 100vw;
    & > div:nth-child(1){
        width: 930px;
        height: 260px;
        padding: 0px 50px;
        background: rgb(255, 255, 255);
        margin: auto;
        margin-top: 20px;
        border-radius: 10px;
        align-items: center;
        display: flex;
        gap: 36px;
        box-shadow: 0 .47rem 2.19rem rgba(8,10,37,.03),0 .94rem 1.41rem rgba(8,10,37,.03),0 .25rem .53rem rgba(8,10,37,.05),0 .13rem .19rem rgba(8,10,37,.03);
        & > img {
            width: 200px;
            height: 200px;
            border-radius: 100px;
            box-shadow: rgba(8, 10, 37, 0.03) 0rem 0.47rem 2.19rem, rgba(8, 10, 37, 0.03) 0rem 0.94rem 1.41rem, rgba(8, 10, 37, 0.05) 0rem 0.25rem 0.53rem, rgba(8, 10, 37, 0.03) 0rem 0.13rem 0.19rem;
        }
        & > div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            & > h2{
                font-size: 24px;
                font-weight: bold;
                letter-spacing: -1px;
                color: rgb(79, 79, 79);
            }
            & > div:nth-child(2){
                font-size: 16px;
                font-weight: 600;
                color: #838383;
            }
            & > div:nth-child(3){
                font-size: 13px;
                font-weight: 400;
                color: #838383;
                line-height: 1.8;
                margin-top: 30px!important;
            }
        }
    }
    & > form:nth-child(2){
        width: 930px;
        padding: 72px 24px 70px;
        background: rgb(255, 255, 255);
        margin: auto;
        margin-top: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        /* gap: 36px; */
        box-shadow: 0 .47rem 2.19rem rgba(8,10,37,.03),0 .94rem 1.41rem rgba(8,10,37,.03),0 .25rem .53rem rgba(8,10,37,.05),0 .13rem .19rem rgba(8,10,37,.03);
        & > div{
            width: 100%;
            & > div{

            } & > button {
                width: 100%;
                margin-top: 20px;
                height: 52px;
                padding-left: 10px;
                border-radius: 10px;
                box-shadow: rgba(228, 32, 32, 0.2) 3px 6px 20px;
                background-color: rgb(242, 92, 92);
                color: rgba(255, 255, 255, 0.85);
                font-weight: bold;
                font-size: 18px;
                letter-spacing: -1px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: flex-end;
                gap: 5px;
                border: none;
            }
        }
        & > div:nth-child(4),div:nth-child(5),div:nth-child(6){
            margin: 10px;
            & > div{
                display: flex;
                gap: 5px;
            }
            & >input{
                width: 20%;
                padding: 12.5px 15px;
                height: 46px;
                border: 1.4px solid rgb(230, 228, 232);
                border-radius: 10px;
                transition: all 1s ease 0s;
                color: rgb(48, 48, 48);
                font-weight: 600;
            }
        }
        & .guide {
            font-size: 13px;
            font-weight: 600;
            color: red;
            margin-top: 10px;
        }
    }
`;

const  RequestIngMain = () => {

    const [categoryNo,setCategoryNo] = useState();
    const [btnActive, setBtnActive] = useState("");
    const [btnActive2, setBtnActive2] = useState("");
    const [baseNo,setBaseNo] = useState();

    const [guide,setGuide] = useState("술(강한도수)는 40도 이상부터 업로드 가능합니다.");

    const [lists, setLists] = useState({
        categoryList: [], // 초기값으로 빈 배열 설정
        baseList: []      // 다른 필요한 속성도 동일하게 처리
    });

    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/ingredient/categoryList")
        .then(resp => resp.json())
        .then((data)=>{
            setLists(data);
        })
    },[])

    const navigate = useNavigate();

    // onSubmit 이벤트 발생시 실행
    const uploadFecth = (e) => {

        e.preventDefault()
        const nameKor = e.target.name_kor.value;
        const nameEng = e.target.name_eng.value;
        const guide = e.target.guide.value;
        const file = e.target.fileUpload.files;
        let alc = e.target.alc.value;

        if(file.length === 0){
            alert("파일을 업로드 하세요.")
            return ;
        }

        if(!nameKor){
            alert("재료 이름을 입력하세요.");
            return ;
        }

        if(!nameEng){
            alert("재료 영문 이름을 입력하세요.");
            return ;
        }

        if(!categoryNo){
            alert("카테고리를 선택하세요.");
            return ;
        }

        if(!guide){
            alert("재료 설명을 입력하세요.");
            return ;
        }
        
        let fecthBaseNo = baseNo;
        if(parseInt(categoryNo, 10) !== 1 && parseInt(categoryNo, 10) !== 2){
            alc = '';
            fecthBaseNo = '';
        }

        if(parseInt(categoryNo, 10) === 1 || parseInt(categoryNo, 10) === 2){
            console.log("들어옴1");
            if(!fecthBaseNo){
                console.log("들어옴2");
                fecthBaseNo = '';
            }
            if(!alc){
                console.log("들어옴3");
                alert("알콜 도수를 입력하세요");
                return;
            }
            if(parseInt(categoryNo, 10) === 2 && alc > 39){
                alert("약한 도수는 40도 미만으로 적어주세요.");
                return;
            }
            if(parseInt(categoryNo, 10) === 1 && alc < 40){
                alert("강한 도수는 40도 이상으로 적어주세요.");
                return;
            }
        }

        const formData = new FormData();

        formData.append('ingName', nameKor);
        formData.append('name_eng', nameEng);
        formData.append('categoryNo', categoryNo);
        formData.append('baseNo', fecthBaseNo);
        formData.append('explanation', guide);
        formData.append('file', file[0]);
        formData.append('alc', alc);

        let isFetching = false;

        if(isFetching){
            return;
        }

        isFetching = true;

        fetch("http://127.0.0.1:8888/app/ingredient",{
            method : "POST",
            body: formData,
        })
        .then(resp => {
            if(!resp.ok){
                throw new Error("fetch요청 실패");
            }    
            return resp.json();
        })
        .then((data) => {
            if(data.msg === 'good'){
                alert("등록성공");
                navigate("/");
            }else{
                throw new Error("재료 등록실패..");
            }
        })
        .catch((e)=>{
            console.log(e);
            navigate("/error");
        })
        .finally(()=>{
            isFetching=false;
        });

    }

    //영어이름 박스에 영문만 입력
    const onlyEngInput = (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z]/ig, '')
    };

    return (
        <>
        <Header />
            <StyledRequestIngDIv>
                <div>
                    <img src="https://www.masileng.com/images/illust_new_ingredient.png" alt="" />
                    <div>
                        <h2>새 재료 요청하기</h2>
                        <div>이런~ 필요한 재료가 마실랭에 없나요?</div>
                        <div>
                        마실랭에 등록되어있지 않은 새로운 재료를 요청해주세요.<br/> 관리자 확인 후 재료등록이 완료되면<br/> 새로운 재료들이 다양한 칵테일로 탄생될 거예요.
                        </div>
                    </div>
                </div>
                <form onSubmit={uploadFecth}>
                    <div>
                        <IngImgUpload />
                    </div>
                    <div>
                        <TextInput title="재료 이름" maxText="50" data="name_kor" heigth="46px"/>
                    </div>
                    <div>
                        <TextInput title="재료 영문 이름" maxText="50" data="name_eng" heigth="46px" inputRule={onlyEngInput}/>
                    </div>
                    <div>
                        <IngReqTitle title="재료 카테고리"/>
                        <div>
                            {lists.categoryList.map((vo, idx) => (
                                <SelectBtn 
                                    setGuide = {setGuide}
                                    idx={idx} 
                                    name={vo.ingCategoryName} 
                                    no ={vo.categoryNo}
                                    setState = {setCategoryNo}
                                    setBtnActive = {setBtnActive}
                                    btnActive = {btnActive}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ display: parseInt(categoryNo, 10) === 1 || parseInt(categoryNo, 10) === 2 ? 'block' : 'none' }}>
                        <IngReqTitle title="재료 베이스선택"/>
                        <div>
                            {lists.baseList.map((vo, idx) => (
                                <SelectBtn
                                    setGuide = {setGuide}
                                    idx={idx} 
                                    name={vo.baseName} 
                                    no ={vo.baseNo}
                                    setState = {setBaseNo}
                                    setBtnActive = {setBtnActive2}
                                    btnActive = {btnActive2}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ display: parseInt(categoryNo, 10) === 1 || parseInt(categoryNo, 10) === 2 ? 'block' : 'none' }}>
                        <IngReqTitle title="알콜 도수"/>
                        <input name="alc" type="number" max="100" />
                        <div><span className='guide'>{guide}</span></div>
                    </div>
                    <div>
                        <IngGuide guide="guide"/>
                    </div>
                    <div>
                        <button>업로드</button>
                    </div>
                </form>
            </StyledRequestIngDIv >
            <br /><br />
        </>
    );
};

export default  RequestIngMain;