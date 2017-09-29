import React from 'react';
import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { getLetter } from '../../utilities';

const List = styled.ul`
  font-size: .9em;
  margin: 10px 0;
`;
const Anchor = styled.a`
  font-weight: bold;
  cursor: pointer;
  &:hover, active {
    color: purple;
  }
  color: ${({ active }) => active ? "purple" : "blue" }
`;
const SavedLink = styled.a`
  cursor: pointer;
  &:hover, active {
    color: purple;
  }
  color: ${({ showingSaved }) => showingSaved ? "purple" : "blue" }
`;
const Links = ({ page, direction, onChangePage, onShowSaved, showingSaved }) => {
  const handleClick = event => {
    onChangePage(event.target.textContent.toLowerCase());
  };
  const links = [...Array(26)].map((l, i) => {
    let linkClassName = "";
    const letter = getLetter(i).toLowerCase();

    if (direction === "eng-swa" && letter === "s") {
      linkClassName = "hide";
    } else if (direction === "swa-eng" && (letter === "q" || letter === "x")) {
      linkClassName = "hide";
    }
    const active = letter === page && !showingSaved ? true : false;
    
    return (
      <li className={linkClassName} key={letter} >
        <Anchor active={active} onClick={(event) => handleClick(event)}>{getLetter(i)}</Anchor>
      </li>
    );
  });
  return (
    <List className="links">
      <SavedLink showingSaved={showingSaved} onClick={onShowSaved}>
        <FontAwesome name="star" />
      </SavedLink>
      {links}
    </List>
  );
};

export default Links;