import React, { Component } from "react";
import uuid from "uuid/v4";
import { List } from "react-virtualized";
import Search from "./Search";
import * as dictionary from "./dictionary";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      filteredEntries: [],
      searching: false,
      active: "a",
      ...dictionary
    };
  }
  search = query => {
    const entries = this.state[this.state.active];
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
      // searching: true,
      filteredEntries,
      searching: true
    });
  };
  loadEntries(letter = "a") {
    // console.log(letter);
    // console.log(dictionary[letter]);
    this.setState({
      active: letter
    });
  }
  handleClick = event => {
    // console.log(event.target.textContent);
    // console.log(event.currentTarget.textContent);
    this.loadEntries(event.target.textContent.toLowerCase());
    this.setState({ searching: false });
  };
  render() {
    const {
      active,
      searching,
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      // s,
      t,
      u,
      v,
      w,
      x,
      y,
      z
    } = this.state;
    const links = [...Array(26)].map((l, i) => {
      return (
        <li key={uuid()}>
          <a onClick={this.handleClick}>{String.fromCharCode(65 + i)}</a>
        </li>
      );
    });

    const loadList = () => {
      switch (active) {
        case "a":
          return a;
        case "b":
          return b;
        case "c":
          return c;
        case "d":
          return d;
        case "e":
          return e;
        case "f":
          return f;
        case "g":
          return g;
        case "h":
          return h;
        case "i":
          return i;
        case "j":
          return j;
        case "k":
          return k;
        case "l":
          return l;
        case "m":
          return m;
        case "n":
          return n;
        case "o":
          return o;
        case "p":
          return p;
        case "q":
          return q;
        case "r":
          return r;
        case "s":
          return ["Not available"];
        case "t":
          return t;
        case "u":
          return u;
        case "v":
          return v;
        case "w":
          return w;
        case "x":
          return x;
        case "y":
          return y;
        case "z":
          return z;
        default:
          return a;
      }
    };
    const listKeys = Object.keys(loadList());
    const listValues = Object.values(loadList());

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
          <p dangerouslySetInnerHTML={{ __html: listKeys[index] }} />
          <p dangerouslySetInnerHTML={{ __html: listValues[index] }} />
        </div>
      );
    };

    const filteredEntries = this.state.filteredEntries.map(entry => {
      return (
        <div key={entry.key} className="dictionary_entry">
          <p dangerouslySetInnerHTML={{ __html: entry.key }} />
          <p dangerouslySetInnerHTML={{ __html: entry.value }} />
        </div>
      );
    });

    return (
      <div className="App">
        <h1>Kamusi</h1>
        <h2>English - Kiswahili</h2>
        <ul className="links">{links}</ul>
        <Search onSearch={this.search} results={filteredEntries.length} />
        {searching && filteredEntries}
        {!searching && (
          <List
            width={700}
            height={700}
            rowCount={listKeys.length}
            rowHeight={300}
            rowRenderer={rowRenderer}
          />
        )}
      </div>
    );
  }
}

export default App;
