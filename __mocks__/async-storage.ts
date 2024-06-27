let store: { [key: string]: string } = {};

const AsyncStorage = {
  getItem: jest.fn(async (key: string) => {
    return store[key] || null;
  }),
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value.toString();
  }),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
  }),
  clear: jest.fn(async () => {
    store = {};
  }),
  getAllKeys: jest.fn(async () => {
    return Object.keys(store);
  }),
};

export default AsyncStorage;
