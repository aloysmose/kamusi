import React from 'react';
import { getLetter } from './utilities';

const PageLinks = ({ direction, onLoadEntries }) => {
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

    return (
      <li className={linkClassName} key={getLetter(i)} >
        <a onClick={(event) => handleClick(event)}>{getLetter(i)}</a>
      </li>
    );
  });
    return (
       <ul className="links">{links}</ul>
    );
};

export default PageLinks;