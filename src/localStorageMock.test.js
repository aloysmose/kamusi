it('saves to localStorage', () => {
  const key = 'dessert', value = 'brownie';
  
  localStorage.setItem(key, value);
  
  expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value);
  expect(localStorage.store.key).toBe(value);
  expect(Object.keys(localStorage.store).length).toBe(1);
});

it('loads from localStorage', () => {
  const key = 'dessert', value = 'fudge brownie';
  
  localStorage.setItem(key, value);
  const dessert = localStorage.getItem(key);
  
  expect(localStorage.getItem).toHaveBeenLastCalledWith(key);
  expect(dessert).toBe(value);
});

it('clears localStorage', () => {
  const key = 'dessert', value = 'brownie';

  localStorage.setItem(key, value);
  localStorage.clear();

  expect(localStorage.clear).toHaveBeenCalled();
  expect(localStorage.store).toEqual({});
  expect(localStorage.length).toBe(0);
});