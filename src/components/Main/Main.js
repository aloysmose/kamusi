import React from 'react';
import styled from 'styled-components';
import FontAwesome from "react-fontawesome";
import { List } from "react-virtualized";
import Search from "../Search/Search";
import { loadEntries } from '../../utilities';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  ul {
    width: 720px;
  }
`;
const Entry = styled.li`
  box-shadow: 5px 5px 5px #555;
  min-height: 100px;
  margin: 0 0 20px 0;
  padding: 0;
  width: 97% !important;
  text-align: left;
  list-style-type: none;
  `;
const VirtualEntry = styled.li`
  list-style-type: none;
  width: 97% !important;
  // margin: 0 0 20px 0;
  // padding: 0;

`;
const EntryHeader = styled.div`
  padding: 10px;

  color: #fff;
  background-color: cornflowerblue;
  // background-color: rgba(100, 149, 237, .75);
  display: flex;
  justify-content: center;
  margin: 0;
  p {
    font-size: 2em;
    margin: 0 10px 0 0;
  }
`;
const EntryBody = styled.p`
  min-height: 100px;
  line-height: 1.5;
  font-size: 1.2em;
  margin: 0;
  // color: #fff;
  padding: 10px;
  background-color: #64CEAA;  // Green 2
  // background-color: rgba(100, 206, 170, .75);  // Green 2
`;
const Anchor = styled.a`
  font-size: 1em;
  // color: #70B7FD;
  // color: cornflowerblue;
  color: #64CEAA;  // Green 2
  cursor: pointer;
  text-decoration: ${({ active }) => active ? "underline" : "none" };
  display: inline-block;
  margin-bottom: 10px;
  align-self: flex-end;
`;
const SavedCount = styled.div`
  margin-bottom: 10px;
`;

const Main = ({ 
  page, 
  direction,
  englishToSwahili,
  saved,
  filtered,
  dictionary, 
  showingSaved, 
  onShowSaved,
  onSearch, 
  onSaveEntry,
  searching 
}) => {
  
  const entries = loadEntries(dictionary, page);
  const entryKeys = Object.keys(entries);
  // const entryValues = Object.values(loadEntries(dictionary, page));
  const entryValues = Object.keys(entries).map(key => entries[key]);

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
      <VirtualEntry className="dictionary_entry" key={key} style={style}>
        <EntryHeader>
          <p dangerouslySetInnerHTML={{ __html: entryKey }} />
          <a onClick={() => onSaveEntry(entryKey, { value: entryValue, saved: saved[entryKey] })}>
            <FontAwesome name={saved[entryKey] ? "star" : "star-o"} />
          </a>
        </EntryHeader>
        <EntryBody dangerouslySetInnerHTML={{ __html: entryValue }} />
      </VirtualEntry> 
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
          <a onClick={() => onSaveEntry(key, entry)}>
            <FontAwesome name={saved[key] ? "star" : "star-o"} />
          </a>
        </EntryHeader>
        <EntryBody dangerouslySetInnerHTML={{ __html: value }} />
      </Entry>
    );
  });
  const savedCount = Object.keys(savedEntries).length;

  return (
    <Container className="main">
        <Anchor active={showingSaved} onClick={onShowSaved}>
          {englishToSwahili ? "Phrasebook" : "Kitabu cha Tafsiri"}
        </Anchor>
        {!showingSaved && 
          <Search
            page={page.toUpperCase()}
            englishToSwahili={englishToSwahili}
            onSearch={onSearch}
            searching={searching}
            wordCount={filteredEntries.length}
          />
        }
      {showingSaved && 
        <ul>
          {/*<Anchor active={showingSaved} onClick={onShowSaved}>
            {englishToSwahili ? "Save to Google Drive" : "Hifadhi kwa Google Drive"}
      </Anchor>*/}
          <SavedCount>
            {englishToSwahili
              ? `${savedCount.toLocaleString()} words` 
              : `Maneno ${savedCount.toLocaleString()}`
            }
          </SavedCount>
          {savedEntries}
        </ul>
      }
      {searching && !showingSaved && 
        <ul>{filteredEntries}</ul>
      }
      {!searching && !showingSaved &&
        <List
        width={700}
        height={450}
        rowCount={entryKeys.length}
        rowHeight={300}
        rowRenderer={rowRenderer}
          />
      }
    </Container>
  );
};

export default Main;