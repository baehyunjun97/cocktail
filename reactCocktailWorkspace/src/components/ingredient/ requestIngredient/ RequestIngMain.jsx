import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../Header';
import TextInput from '../../newcocktails/TextInput';
import IngCategory from './IngCategory';
import IngGuide from './IngGuide';
import IngImgUpload from './IngImgUpload';

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
    }
`;

const  RequestIngMain = () => {

    const [category,setCategory] = useState();

    const uploadFecth = (e) => {

        e.preventDefault()
        const nameKor = e.target.name_kor.value;
        const nameEng = e.target.name_eng.value;
        const guide = e.target.guide.value;
        const file = e.target.fileUpload.files;

        console.log(file[0]);
        console.log(nameKor);
        console.log(nameEng);
        console.log(guide);
        console.log(category);

        const formData = new FormData();

        formData.append('name_kor', nameKor);
        formData.append('name_eng', nameEng);
        formData.append('category', category);
        formData.append('guide', guide);
        formData.append('file', file[0]);

        fetch("http://127.0.0.1:8888/app/ingredient",{
            method : "POST",
            body: formData,
        })
        .then(resp => resp.json)
        .then((data) => {
            console.log(data.msg);
        })

    }

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
                        <TextInput title="재료 영문 이름" maxText="50" data="name_eng" heigth="46px"/>
                    </div>
                    <div>
                        <IngCategory setCategory = {setCategory}/>
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