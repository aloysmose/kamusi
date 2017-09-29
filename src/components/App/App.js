import React, { Component } from "react";
import Header from '../Header/Header';
import Main from '../Main/Main';
import * as engSwaDict from "../../dictionary/eng-swa";
import * as swaEngDict from "../../dictionary/swa-eng";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      filtered: [],
      // saved: JSON.parse(localStorage.getItem('kamusi-saved-entries')) || {},
      saved: JSON.parse(localStorage.getItem('kamusi-saved-entries-dev')) || {},
      showingSaved: false,
      searching: false,
      direction: "eng-swa",
      page: "a",
      dictionary: engSwaDict
    };
  }

  componentDidUpdate() {
    localStorage.setItem('kamusi-saved-entries-dev', JSON.stringify(this.state.saved));
    // localStorage.setItem('kamusi-saved-entries', JSON.stringify(this.state.saved));
  }

  search = query => {
    const entries = this.state.dictionary[this.state.page];
    const filteredKeys = Object.keys(entries).filter(key => {
      return key.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    const filtered = filteredKeys.map(key => {
      const value = entries[key];
      return {
        key,
        value
      };
    });

    this.setState({
      filtered,
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

  changePage = (letter = "a") => {
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
      filtered,
      showingSaved,
      searching,
      direction,
      dictionary
    } = this.state;
    
    return (
      <div className="App">
        <Header 
          page={page}
          direction={direction} 
          onChangeDirection={this.changeDirection}
          onChangePage={this.changePage}
          onShowSaved={this.showSaved}
          showingSaved={showingSaved}
        />
        <Main 
          direction={direction}
          saved={saved}
          page={page}
          filtered={filtered}
          dictionary={dictionary}
          showingSaved={showingSaved}
          onSearch={this.search}
          onSaveEntry={this.saveEntry}
          searching={searching}
        />
      </div>
    );
  }
}

export default App;
