import React from 'react';
import FontAwesome from "react-fontawesome";

const Header = ({ direction, onChangeDirection }) => {
  return (
    <div>
      {direction === "eng-swa" &&
        <div>
          <a onClick={onChangeDirection}>
            <h1>
              English <FontAwesome name="exchange" /> Swahili
            </h1>
          </a>
          Source: <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/eng-swa/">TUKI English &mdash; Swahili Dictionary</a>
        </div>
      }
      {direction === "swa-eng" &&
        <div>
          <a  onClick={onChangeDirection}>
            <h1>
              Kiswahili <FontAwesome name="exchange" /> Kiingereza
            </h1>
          </a>
          Source: <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/swa-eng/">TUKI Kamusi ya Kiswahili &mdash; Kiingereza</a>
        </div>
      }
    </div>
  );
};

export default Header;