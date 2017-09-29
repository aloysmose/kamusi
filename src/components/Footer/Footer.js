import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  font-size: 1em;
`;
const Footer = ({ direction }) => {
  return (
    <Container>
      {direction === 'eng-swa' ? "Source: " : "Chanzo: "}
      {direction === 'eng-swa' && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/eng-swa/">TUKI English &mdash; Swahili Dictionary</a>}
      {direction === 'swa-eng' && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/swa-eng/">TUKI Kamusi ya Kiswahili &mdash; Kiingereza</a>}
    </Container>
  );
};

export default Footer;