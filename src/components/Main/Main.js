import React from 'react';
import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { List } from "react-virtualized";
import Search from "../Search/Search";
import { loadEntries } from '../../utilities';

const Entry = styled.li`
  min-height: 100px;
  margin: 0 0 20px 0;
  padding: 10px;
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

const Main = ({ 
  page, 
  saved,
  filtered,
  dictionary, 
  showingSaved, 
  onSearch, 
  onSaveEntry,
  searching 
}) => {
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
          <a onClick={() => onSaveEntry(entryKey, { value: entryValue, saved: saved[entryKey] })}>
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
          <a onClick={() => onSaveEntry(key, entry)}>
            <FontAwesome name={saved[key] ? "star" : "star-o"} />
          </a>
        </EntryHeader>
        <EntryBody dangerouslySetInnerHTML={{ __html: entry.value }} />
      </Entry>
    );
  });

  const filteredEntries = filtered.map(entry => {
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
    <main className="main">
      {!showingSaved && 
        <Search
        onSearch={onSearch}
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
    </main>
  );
};

export default Main;