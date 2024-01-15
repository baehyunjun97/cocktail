import React from 'react';

// 타이틀 컴포넌트
const Title = ({title,src}) => {
    return (
        // props로 받아온 데이터를 통해 src title을 설정
        <div>
            <img src={src} alt="" />
            <h3>{title}</h3>
        </div>
    );
};

export default Title;