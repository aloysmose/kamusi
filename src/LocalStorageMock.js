export class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  
  get length() {
    return Object.keys(this.store).length;
  }
  
  getItem = key => this.store.key || null;

  setItem = (key, value) => this.store.key = value;

  clear = () => this.store = {};

  // add removeItem other methods if needed
}



