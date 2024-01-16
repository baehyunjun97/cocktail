import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Search from './Search';
import Main from './Main';
import Ranking from './Ranking';


const Layout = ( ) => {

    const StyledLayoutDiv = styled.div`

    `;

    return (
        <StyledLayoutDiv>
            <Header />
            <Search />
            <Ranking />
            <Main />
        </StyledLayoutDiv>
    );
};
export default Layout;