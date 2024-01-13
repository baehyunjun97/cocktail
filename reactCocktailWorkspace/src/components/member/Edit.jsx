import React from 'react';
import styled from 'styled-components';

const StyledEditAreaDiv = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: orange;

    &>form{
    position: relative;
    top: -10%;
    padding: 50px;
    border: 1px solid rgba(242, 92, 92, 0.3);
    border-radius: 10px;
    background-color: rgba(255,255,255,.5);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;
    }
    div{
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    }
    .text1{
    color: rgb(79, 79, 79);
    font-size: 32px;
    letter-spacing: -1px;
    line-height: 1.2;
    font-weight: 800;
    text-align: center;
    }
    .text2{
    margin-top: 20px;
    text-align: center;
    color: rgb(131, 131, 131);
    font-size: 14px;
    letter-spacing: -0.5px;
    line-height: 26px;
    white-space: pre;
    }
    .text3{
    font-size: 16px;
    line-height: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: rgb(79, 79, 79);
    margin-top: 42px;
    }
    h3:after{
    content: "";
    background-image: url(https://www.masileng.com/test/ic_arrow_bottom.png);
    background-size: 10px 6px;
    width: 10px;
    height: 6px;
    display: inline-block;
    margin-left: 5px;
    text-align: center;
    vertical-align: middle;
    }
    .editcollection{
    position: relative;
    display: flex;
    flex-direction: column;
    }
    .edit{
    width: 100%;
    margin-top: 22px;
    padding: 12.5px 15px;
    line-height: 19px;
    font-size: 16px;
    border: 1.4px solid rgb(230, 228, 232);
    border-radius: 10px;
    height: 46px;
    color: rgb(48, 48, 48);
    font-weight: 600;
    }
    input:focus{
    border: 2px solid rgb(131, 131, 131);
    outline: none;
}
    .editnumber{
    margin-top: 5px;
    font-size: 12px;
    color: rgb(162, 162, 162);
    align-self: flex-end;
    }
    .editnumber:after{
    content: "10자 이내로 작성해주세요.";
    position: absolute;
    bottom: 0px;
    left: 0px;
    font-size: 12.8px;
    color: rgb(242, 92, 92);
    }
    .change{
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border-radius: 10px;
    background-color: rgb(242, 92, 92);
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    }
    .img2{
        position: absolute;
        width: calc(100% + 23px);
        height: 133px;
        bottom: 0px;
        left: -24px;
    }

`;

const Edit = () => {
    return (
        <StyledEditAreaDiv >
            <form>
            <h2 class="text1">멋진 홈텐더 닉네임을 만들어보세요</h2>
            <p className='text2'>닉네임은 언제든 변경할 수 있습니다.</p>
            <h3 class="text3">닉네임</h3>
            <div class="editcollection">
                <input placeholder="변경할 닉네임을 적어주세요." className='edit' />
                <div class="editnumber">0/10</div>
            </div>
            <button className='change'>변경하기</button>
            </form>
            <img src="https://www.masileng.com/test/login_background.png" className="img2" alt="illust_challenge_left"  />
        </StyledEditAreaDiv>
    );
};

export default Edit;