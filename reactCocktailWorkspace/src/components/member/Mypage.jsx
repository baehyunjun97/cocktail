import React, {  useCallback, useContext,  useEffect,  useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { MemberMemory } from '../../context/MemberContext';
import Header from '../Header';
import Search from '../Search';
import Ranking from '../Ranking';
import CocktailItems from '../cocktail/cocktailList/CocktailItems';



const StyledMypageAreaDiv = styled.div`
    &>form{
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
    .uploadcontext{
    display: grid;
    grid-template-columns: repeat(auto-fill,302px); //그리드 열을 반복하는데, auto-fill은 가능한 많은 열을 채우되 너비가 302px인 열을 채우도록 gksek
    grid-gap: 30px 20px;
    justify-content: center;
    }
`;

const Mypage = () => {
    const navigate=useNavigate();
    
    const obj=useContext(MemberMemory);

    const [voList, setVoList] = useState([]);

   
    // useCallBack을 이용해서 useEffect안에 에러 처리후 url이동가능
    const navigateCallback = useCallback(() => {
        navigate("/error");
    }, [navigate]);

    // 렌더링 시 화면 변경
    
    useEffect(()=>{
        // 요청 보냄
        fetch("http://127.0.0.1:8888/app/mypage/bookmark")
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
    },[navigateCallback])

    
        
    return (
        <>
            <Header/>
            <Search/>
            <Ranking/>
            <StyledMypageAreaDiv>
        <form>
            <div >
            
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

                </div>
                <div></div>
                </div>
                </div>
                <div className='uploadrecipe'>
                    <img src="	https://www.masileng.com/test/ic_challenge.svg" alt="illust_challenge_left"/>
                    <h3 >내가 업로드한 레시피</h3>
                </div>
                <div className='context'>
                <CocktailItems cocktailVoList={voList} />

                </div>
                <br /><br /><br /><br />
                <div className='uploadrecipe'>
                    <img src="	https://www.masileng.com/test/ic_favorite.svg" alt="illust_challenge_left"/>
                    <h3 >내 즐겨찾기</h3>
                </div>
                <div className='context'>
                <CocktailItems cocktailVoList={voList} />
                
                </div>
                
            </div>
            </form >
            
            </StyledMypageAreaDiv>
        </>
    );
}
export default Mypage;