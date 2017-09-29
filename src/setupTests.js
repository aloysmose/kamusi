import { LocalStorageMock } from './LocalStorageMock';

const localStorage = new LocalStorageMock();

global.localStorage = {
  // get store object
  get store() {
    return localStorage.store;
  },
  
  // set store object
  set store(store) {
    localStorage.store = store;
  },
  
  // get number of items in store
  get length() {
    return localStorage.length;
  },

  getItem: jest.fn(key => localStorage.getItem(key)),

  setItem: jest.fn((key, value) => localStorage.setItem(key, value)),

  clear: jest.fn(() => localStorage.clear())

  // add removeItem other methods if needed
};