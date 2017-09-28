import React, { Component } from "react";
import uuid from "uuid/v4";
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
      searching: false,
      direction: "eng-swa",
      page: "a",
      dictionary: engSwaDict
    };
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
  loadEntries = (letter = "a") => {
    this.setState({
      page: letter,
      searching: false
    });
  }
  changeDirection = () => {
    const { direction } = this.state;
    this.setState({
      searching: false,
      direction: direction === "eng-swa" ? "swa-eng" : "eng-swa",
      dictionary: direction === "eng-swa" ? swaEngDict : engSwaDict
    });
  };
  
  render() {
    const {
      page,
      searching,
      direction,
      dictionary
    } = this.state;
    
    const keys = Object.keys(loadEntries(dictionary, page));
    const values = Object.values(loadEntries(dictionary, page));

    // Virtual row
    const rowRenderer = ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style // Style object to be applied to row (to position it)
    }) => {
      return (
        <div className="dictionary_entry" key={key} style={style}>
          <p dangerouslySetInnerHTML={{ __html: keys[index] }} />
          <p dangerouslySetInnerHTML={{ __html: values[index] }} />
        </div>
      );
    };

    const filteredEntries = this.state.filteredEntries.map(entry => {
      return (
        <ul key={entry.key} className="dictionary_entry">
          <li dangerouslySetInnerHTML={{ __html: entry.key }} />
          <li dangerouslySetInnerHTML={{ __html: entry.value }} />
        </ul>
      );
    });

    return (
      <div className="App">
        <Header direction={direction} onChangeDirection={this.changeDirection} />
        <PageLinks direction={direction} onLoadEntries={this.loadEntries} />
        <Search
          onSearch={this.search}
          searching={searching}
          results={filteredEntries.length}
        />
        {searching && filteredEntries}
        {!searching && (
          <List
            width={700}
            height={700}
            rowCount={keys.length}
            rowHeight={300}
            rowRenderer={rowRenderer}
          />
        )}
      </div>
    );
  }
}

export default App;
