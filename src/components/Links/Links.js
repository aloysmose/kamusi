import React from 'react';
import styled from 'styled-components';
import { getLetter } from '../../utilities';

const List = styled.ul`
  font-size: .9em;
  margin: 0 0 10px 0;
  text-decoration: ${({ active }) => active ? "underline" : "none" };
`;
const Anchor = styled.a`
  // color: #70B7FD;
  color: cornflowerblue;
  font-weight: bold;
  cursor: pointer;
  text-decoration: ${({ active }) => active ? "underline" : "none" };
`;

const Links = ({ page, englishToSwahili, onChangePage, onShowSaved, showingSaved }) => {
  const handleClick = event => {
    onChangePage(event.target.textContent.toLowerCase());
  };
  const links = [...Array(26)].map((l, i) => {
    let anchorClassName = "";
    const letter = getLetter(i).toLowerCase();

    if (englishToSwahili && letter === "s") {
      anchorClassName = "disabled";
    } else if (!englishToSwahili && (letter === "q" || letter === "x")) {
      anchorClassName = "disabled";
    }
    const active = letter === page && !showingSaved ? true : false;

    return (
      <li key={letter} >
        <Anchor className={anchorClassName} active={active} onClick={(event) => handleClick(event)}>{getLetter(i)}</Anchor>
      </li>
    );
  });
  return (
    <List className="links">
      {links}
    </List>
  );
};

export default Links;