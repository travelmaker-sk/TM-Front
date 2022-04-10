import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import MainNavContainer from '../containers/Navigation/MainNavContainer';

const Wrapper = styled(Responsive)``;

const PostListPage = () => {
  return (
    <div>
      <MainNavContainer />
      <HeaderContainer />
      <Wrapper>
        <div>POST LIST</div>
      </Wrapper>
    </div>
  );
};

export default PostListPage;
