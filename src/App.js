import React, { Component } from "react";
// import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { List } from "react-virtualized";
import { loadEntries } from './utilities';
import Header from './Header';
import PageLinks from './PageLinks';
import Search from "./Search";
import * as engSwaDict from "./eng-swa-dictionary";
import * as swaEngDict from "./swa-eng-dictionary";
import "./App.css";

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
        <ul className="dictionary_entry" key={key} style={style}>
          <li dangerouslySetInnerHTML={{ __html: entryKey }} />
          <li dangerouslySetInnerHTML={{ __html: entryValue }} />
          <a onClick={() => this.saveEntry(entryKey, { value: entryValue, saved: saved[entryKey] })}>
            <FontAwesome name={saved[entryKey] ? "star" : "star-o"} />
          </a>
        </ul> 
      );
    };

    const savedEntries = Object.keys(saved).map(key => {
      const entry = saved[key];

      return (
        <li key={key} className="dictionary_entry">
          <p dangerouslySetInnerHTML={{ __html: key }} />
          <p dangerouslySetInnerHTML={{ __html: entry.value }} />
          <a onClick={() => this.saveEntry(key, entry)}>
            <FontAwesome name={saved[key] ? "star" : "star-o"} />
          </a>
        </li>
      );
    });

    const filteredEntries = this.state.filteredEntries.map(entry => {
      const { key, value } = entry;
      return (
        <li key={entry.key} className="dictionary_entry">
          <p dangerouslySetInnerHTML={{ __html: key }} />
          <p dangerouslySetInnerHTML={{ __html: value }} />
          <a onClick={() => this.saveEntry(key, entry)}>
            <FontAwesome name={saved[key] ? "star" : "star-o"} />
          </a>
        </li>
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
            <div>{Object.keys(savedEntries).length}</div>
            {savedEntries}
          </ul>
        }
        {searching && !showingSaved && 
          <ul>{filteredEntries}</ul>
        }
        {!searching && !showingSaved &&
          <List
            width={700}
            height={700}
            rowCount={entryKeys.length}
            rowHeight={300}
            rowRenderer={rowRenderer}
          />
        }
      </div>
    );
  }
}

export default App;
