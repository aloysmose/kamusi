import React, { Component } from "react";

class Search extends Component {
  handleChange = event => {
    this.props.onSearch(event.target.value);
  };

  render() {
    const { searching, results } = this.props;
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="Search"
          ref={input => (this.inputRef = input)}
          onBlur={() => (this.inputRef.value = "")}
        />
        <div>{searching && results}</div>
      </div>
    );
  }
}

export default Search;
