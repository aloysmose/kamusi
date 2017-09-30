import React, { Component } from "react";
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Input = styled.input`
  width: 300px;
  font-size: 1.5em;
  padding: 5px;
  &:focus {
    outline: none;
  }
`;
const Results = styled.div`
  font-size: .9em;
  height: 15px;
  margin: 10px 0;
`;
const SearchIcon = styled(FontAwesome)`
  font-size: 1.5em !important;
  position: relative;
  left: -30px;
  opacity: .5
`;
class Search extends Component {
  handleChange = event => {
    this.props.onSearch(event.target.value);
  };

  render() {
    const { page, searching, wordCount, englishToSwahili } = this.props;
    return (
      <div>
        <Input
          autoFocus
          type="text"
          onChange={this.handleChange}
          placeholder={englishToSwahili ? `Search for "${page}" words` : `Tafuta maneno ya "${page}"`} 
          innerRef={comp => this.input = comp}
          onBlur={() => this.input.value = ""}
        />
        <SearchIcon name="search" />
        <Results className="results">
          {searching && 
            (englishToSwahili 
              ? `${wordCount.toLocaleString()} words` 
              : `Maneno ${wordCount.toLocaleString()}`)
          }
        </Results>
      </div>
    );
  }
}

export default Search;
