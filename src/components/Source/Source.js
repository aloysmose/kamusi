import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  a { 
    color: #64CEAA;  // Green 2
    // color: cornflowerblue;
  }
  font-size: 1em;
`;
const Source = ({ englishToSwahili }) => {
  return (
    <Container>
      {englishToSwahili ? "Source: " : "Chanzo: "}
      {englishToSwahili && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/eng-swa/">TUKI English &mdash; Swahili Dictionary</a>}
      {!englishToSwahili && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/swa-eng/">TUKI Kamusi ya Kiswahili &mdash; Kiingereza</a>}
    </Container>
  );
};

export default Source;