import React, { Component } from "react";

class Search extends Component {
  handleChange = event => {
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="Search"
          ref={input => (this.inputRef = input)}
          onBlur={() => (this.inputRef.value = "")}
        />
        <div>{this.props.results}</div>
      </div>
    );
  }
}

export default Search;
