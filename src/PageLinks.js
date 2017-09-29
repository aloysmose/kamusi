import React from 'react';
import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { getLetter } from './utilities';

const Links = styled.ul`
  font-size: .9em;
  margin: 10px 0;
`;
const Link = styled.a`
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
const PageLinks = ({ page, direction, onLoadEntries, onShowSaved, showingSaved }) => {
  const handleClick = event => {
    onLoadEntries(event.target.textContent.toLowerCase());
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
        <Link active={active} onClick={(event) => handleClick(event)}>{getLetter(i)}</Link>
      </li>
    );
  });
  return (
    <Links className="links">
      <SavedLink showingSaved={showingSaved} onClick={onShowSaved}>
        <FontAwesome name="star" />
      </SavedLink>
      {links}
    </Links>
  );
};

export default PageLinks;