import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';

import Links from '../Links/Links';
import FontAwesome from "react-fontawesome";

const Container = styled.header`
  margin-top: 50px;
`;
const FromDirection = styled.span`
  color: red;
`;
const ToDirection = styled.span`
  color: green;
`;
const ExchangeIcon = styled(FontAwesome)`
  color: black;
`;
const Header = ({ 
  direction, 
  onChangeDirection, 
  onChangePage,
  showingSaved, 
  page, 
  onShowSaved 
}) => {

  return (
    <Container>
      <Footer direction={direction} />
      {direction === "eng-swa" &&
        <div>
          <a onClick={onChangeDirection}>
            <h1>
              <FromDirection>English</FromDirection> <ExchangeIcon name="exchange" /> <ToDirection>Swahili</ToDirection>
            </h1>
          </a>
        </div>
      }
      {direction === "swa-eng" &&
        <div>
          <a  onClick={onChangeDirection}>
            <h1>
              <FromDirection>Kiswahili</FromDirection> <ExchangeIcon name="exchange" /> <ToDirection>Kiingereza</ToDirection>
            </h1>
          </a>
        </div>
      }
      <Links 
        showingSaved={showingSaved} 
        page={page} 
        direction={direction} 
        onShowSaved={onShowSaved} 
        onChangePage={onChangePage}
      />
    </Container>
  );
};

export default Header;