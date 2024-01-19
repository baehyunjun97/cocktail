import React, {  useCallback, useContext,  useEffect,  useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { MemberMemory } from '../../context/MemberContext';
import Header from '../Header';
import Search from '../Search';
import Ranking from '../Ranking';
import CocktailItems from '../cocktail/cocktailList/CocktailItems';




const StyledMypageAreaDiv = styled.div`
    &>div:nth-child(1){
     max-width: 1030px;
    margin: 0px auto;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
    /* box-sizing: border-box; */
    }
    .profilebox{
    width: 100%;
    height: 260px;
    padding: 0px 50px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(29, 12, 23, 0.18) 1.5px 1.5px 4.5px;
    border-radius: 10px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 36px;
    }
    div{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    }
    img{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    }
    .img1{
    width: 200px;
    height: 200px;
    border-radius: 100px;
    }
    .profilecontent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 0%;
    }
    .label{
    font-size: 14px;
    font-weight: 600;
    color: #a2a2a2;
    }
    .profilename{
    margin-top: 5px ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .name{
    color: #303030;
    font-size: 1.6rem;
    font-weight: bold;
    }
    h2:after{
    content: "님";
    font-size: 18px;
    margin-left: 5px;
    }
    .personaledit{
    font-size: 14px;
    font-weight: 600;
    color: #6e6e6e;
    transition: all .2s;
    border: 1.4px solid #e6e4e8;
    padding: 8px 18px;
    line-height: 20px;
    border-radius: 100px;
    background-color: transparent;
    &:hover{
        border: 1.7px solid gray;
    }
    }
    .profilecount{
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    gap: 8px;
    }
    .recipe{
    margin: 0;
    color: #6e6e6e;
    font-weight: 600;
    font-size: 14px;
    }
    .recipe:before{
    content: "🍸";
    margin-right: 5px;
    }
    .like{
    margin: 0;
    color: #6e6e6e;
    font-weight: 600;
    letter-spacing: -1px;
    font-size: 14px;
    }
    .like:before{
    content: "💚";
    margin-right: 5px;
    }
    b{
    margin-left: 6px;
    font-weight: 900;
    color: #303030;
    font-size: 20px;
    }
    .uploadrecipe{
    width: 1045px;
    height: 60px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: -15px;
    }
    h3{
    font-size: 16px;
    line-height: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: rgb(79, 79, 79);
    }
    h3:after{
        content: "";
    background-image: url(https://www.masileng.com/test/ic_arrow_bottom.png);
    background-size: 10px 6px;
    width: 10px;
    height: 6px;
    display: inline-block;
    margin-left: 5px;
    }

    & > div > form{
        & > div:nth-child(3) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                &> img {
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
                /* height: 62px; */
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


    & > div > form{
        & > div:nth-child(5) {
        display: grid;
        grid-template-columns: repeat(auto-fill,302px);
        grid-gap: 30px 20px;
        justify-content: center;
        width: 1000px;
        margin: auto;
        & > .noSearch {
            height: 60px;
            border-radius: 10px;
            background-color: rgb(242, 242, 242);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            gap: 8px;
            width: 1000px;
            flex-direction: row;
            justify-content: center;
            & > div {
                color: rgb(161, 161, 161);
                font-weight: 600;
                font-size: 14px;
            }
        }
        & > div {
            width: 302px;
            height: 292px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            gap: 10px;
            & > div:nth-child(1) {
                position: relative;
                height: 220px;
                background-color: #f3f3f3;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                &> img {
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
                /* height: 62px; */
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
`;

const Mypage = () => {
    const navigate=useNavigate();
    
    const obj=useContext(MemberMemory);

    const [voList, setVoList] = useState([]);
    const [voList2,setVoList2]= useState([]);

   
    // useCallBack을 이용해서 useEffect안에 에러 처리후 url이동가능
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 렌더링 시 화면 변경
    
    useEffect(()=>{
        // 요청 보냄
        fetch("http://127.0.0.1:8888/app/mypage/myCocktails?MemberNo="+obj.vo.no)
        .then(resp => {
            if(!resp.ok){
                throw new Error("상태코드 이상함");
            }
            return resp.json();
        })
        .then((data) => {
            setVoList(data.bookmark);
            setVoList2(data.upload);
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
            navigateCallback();
        })
    },[navigateCallback])


        
   
    return (
        <>
            <Header/>
            <Search/>
            <Ranking/>
            <StyledMypageAreaDiv>
            
                <div >
                    <form >
                        <div className='profilebox'>
                            <img src="	https://www.masileng.com/images/illust_profile.png" alt="illust_challenge_left" className='img1' />
                            {/* <img src="	https://www.iei.or.kr/upload/teacher/1dragon_teacher_photo.jpg" alt="illust_challenge_left" className='img1' /> */}
                            <div className='profilecontent'>
                                <div class="label">마실랭 홈텐더</div>
                                <div className='profilename'>
                                    <h2 className='name' name="name">{ obj.vo.nick} </h2>
                                    <button className='personaledit' onClick={() => {navigate("/pwdcheck");}} >개인정보 편집</button> 
                                </div>
                                <div className='profilecount'>
                                    <div className='recipe'>
                                        올린레시피
                                        <b>0</b>
                                        개
                                    </div>
                                    <div className='like'>
                                        즐겨찾기
                                        <b>2</b>
                                        개
                                    </div>
                                </div> {/* profilecount */}
                            </div>{/* profilecontent */}
                        </div> {/* profilebox */}

                        <div className='uploadrecipe'>
                            <img src="	https://www.masileng.com/test/ic_challenge.svg" alt="illust_challenge_left"/>
                            <h3 >내가 업로드한 레시피</h3>
                        </div>
                        <CocktailItems cocktailVoList={voList2} />


                        <div className='uploadrecipe'>
                            <img src="	https://www.masileng.com/test/ic_favorite.svg" alt="illust_challenge_left"/>
                            <h3 >내 즐겨찾기</h3>
                        </div>
                        <CocktailItems cocktailVoList={voList} />
                        

                    </form >
                </div>
            
            
            </StyledMypageAreaDiv>
        </>
    );
};

export default Mypage;