import React, { Component } from "react";
import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { List } from "react-virtualized";
import { loadEntries } from './utilities';
import Header from './Header';
import PageLinks from './PageLinks';
import Search from "./Search";
import * as engSwaDict from "./eng-swa-dictionary";
import * as swaEngDict from "./swa-eng-dictionary";
import "./App.css";

const Entry = styled.li`
  min-height: 100px;
  margin: 0 0 20px 0;
  padding: 10px;
  // background-color: rgb(250, 250, 250);
  width: 97% !important;
  text-align: left;
  list-style-type: none;
`;
const EntryHeader = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  p {
    font-size: 2em;
    margin: 0 10px 0 0;
  }
`;
const EntryBody = styled.p`
  line-height: 1.5;
  font-size: 1.2em;
  margin: 10px;
`;
const Footer = styled.footer`
  font-size: 1.2em;
  margin-top: 30px;
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      filteredEntries: [],
      saved: JSON.parse(localStorage.getItem('kamusi-saved-entries')) || {},
      showingSaved: false,
      searching: false,
      direction: "eng-swa",
      page: "a",
      dictionary: engSwaDict
    };
  }
  componentDidUpdate() {
    localStorage.setItem('kamusi-saved-entries', JSON.stringify(this.state.saved));
  }
  search = query => {
    const entries = this.state.dictionary[this.state.page];
    const filteredKeys = Object.keys(entries).filter(key => {
      return key.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    const filteredEntries = filteredKeys.map(key => {
      const value = entries[key];
      return {
        key,
        value
      };
    });

    this.setState({
      filteredEntries,
      searching: true
    });
  };
  saveEntry = (entryKey, entry) => {
    const { saved } = this.state;
    const savedKey = Object.keys(saved).filter(key => {
      return key === entryKey;
    })
    if (savedKey.length) {
      const { [entryKey]: removed, ...rest } = saved;
      this.setState({
        saved: {
          ...rest
        }
      });
    } else {
      this.setState({
        saved: {
          ...this.state.saved,
          [entryKey]: {
            ...entry,
            saved: !entry.saved
          }
        }
      });
    }
  }
  showSaved = () => {
    this.setState({
      showingSaved: !this.state.showingSaved
    })
  }
  loadEntries = (letter = "a") => {
    this.setState({
      page: letter,
      searching: false,
      showingSaved: false
    });
  }
  changeDirection = () => {
    const { direction } = this.state;
    this.setState({
      searching: false,
      showingSaved: false,
      direction: direction === "eng-swa" ? "swa-eng" : "eng-swa",
      dictionary: direction === "eng-swa" ? swaEngDict : engSwaDict
    });
  };
  
  render() {
    const {
      page,
      saved,
      showingSaved,
      searching,
      direction,
      dictionary
    } = this.state;
    
    const entryKeys = Object.keys(loadEntries(dictionary, page));
    const entryValues = Object.values(loadEntries(dictionary, page));

    // Virtual row
    const rowRenderer = ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style // Style object to be applied to row (to position it)
    }) => {
      const entryKey = entryKeys[index];
      const entryValue = entryValues[index];

      return (
        <Entry className="dictionary_entry" key={key} style={style}>
          <EntryHeader>
            <p dangerouslySetInnerHTML={{ __html: entryKey }} />
            <a onClick={() => this.saveEntry(entryKey, { value: entryValue, saved: saved[entryKey] })}>
              <FontAwesome name={saved[entryKey] ? "star" : "star-o"} />
            </a>
          </EntryHeader>
          <EntryBody dangerouslySetInnerHTML={{ __html: entryValue }} />
        </Entry> 
      );
    };

    const savedEntries = Object.keys(saved).map(key => {
      const entry = saved[key];

      return (
        <Entry key={key} className="dictionary_entry">
          <EntryHeader>
            <p dangerouslySetInnerHTML={{ __html: key }} />
            <a onClick={() => this.saveEntry(key, entry)}>
              <FontAwesome name={saved[key] ? "star" : "star-o"} />
            </a>
          </EntryHeader>
          <EntryBody dangerouslySetInnerHTML={{ __html: entry.value }} />
        </Entry>
      );
    });

    const filteredEntries = this.state.filteredEntries.map(entry => {
      const { key, value } = entry;
      return (
        <Entry key={entry.key} className="dictionary_entry">
          <EntryHeader>
            <p dangerouslySetInnerHTML={{ __html: key }} />
            <a onClick={() => this.saveEntry(key, entry)}>
              <FontAwesome name={saved[key] ? "star" : "star-o"} />
            </a>
          </EntryHeader>
          <EntryBody dangerouslySetInnerHTML={{ __html: value }} />
        </Entry>
      );
    });
    return (
      <div className="App">
        <Header direction={direction} onChangeDirection={this.changeDirection} />
        <PageLinks showingSaved={showingSaved} page={page} direction={direction} onLoadEntries={this.loadEntries} onShowSaved={this.showSaved} />
        {!showingSaved && 
          <Search
          onSearch={this.search}
          searching={searching}
          results={filteredEntries.length}
          />
        }
        {showingSaved && 
          <ul>
            <div>{Object.keys(savedEntries).length + " saved"}</div>
            {savedEntries}
          </ul>
        }
        {searching && !showingSaved && 
          <ul>{filteredEntries}</ul>
        }
        {!searching && !showingSaved &&
          <List
            width={700}
            height={600}
            rowCount={entryKeys.length}
            rowHeight={300}
            rowRenderer={rowRenderer}
          />
        }
        <Footer>
          {direction === 'eng-swa' && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/eng-swa/">TUKI English &mdash; Swahili Dictionary</a>}
          {direction === 'swa-eng' && <a className="sub-heading" href="http://www.elimuyetu.co.tz/subjects/arts/swa-eng/">TUKI Kamusi ya Kiswahili &mdash; Kiingereza</a>}
        </Footer>
      </div>
    );
  }
}

export default App;
