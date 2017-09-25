import React, { Component } from "react";
import uuid from "uuid/v4";
import "./App.css";
import a from "./eng-swa/eng-swa-a-entries.json";
import b from "./eng-swa/eng-swa-b-entries.json";
import c from "./eng-swa/eng-swa-c-entries.json";

const dictionary = {
  a: a,
  b: b,
  c: c
  // d: d,
  // e: e,
  // f: f,
  // g: g,
  // h: h,
  // i: i,
  // j: j,
  // k: k,
  // l: l,
  // m: m,
  // n: n,
  // o: o,
  // p: p,
  // q: q,
  // r: r,
  // s: s,
  // t: t,
  // u: u,
  // v: v,
  // w: w,
  // x: x,
  // y: y,
  // z: z
};
console.log(dictionary);
class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: a
    };
  }
  loadEntries(letter = "a") {
    // console.log(letter);
    // console.log(dictionary[letter]);
    this.setState({
      entries: dictionary[letter]
    });
  }
  handleClick = event => {
    // console.log(event.target.textContent);
    // console.log(event.currentTarget.textContent);
    this.loadEntries(event.target.textContent.toLowerCase());
  };
  render() {
    const links = [...Array(26)].map((l, i) => {
      return (
        <li key={uuid()}>
          <a onClick={this.handleClick}>{String.fromCharCode(65 + i)}</a>
        </li>
      );
    });

    const entries = this.state.entries.map((entry, i) => {
      return (
        <li key={uuid()} className="entry">
          {i + 1}
          <p dangerouslySetInnerHTML={{ __html: entry }} />
        </li>
      );
    });

    return (
      <div className="App">
        <h1>Kamusi</h1>
        <ul className="links">{links}</ul>
        {<ul>{entries}</ul>}
      </div>
    );
  }
}

export default App;
