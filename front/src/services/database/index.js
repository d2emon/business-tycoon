import Collection from './collection';

const COLLECTIONS = {};

const addCollection = (id) => new Promise((resolve) => {
  setTimeout(() => {
    const collection = Collection();
    COLLECTIONS[id] = collection;
    return resolve(collection);
  }, 500);
});

const getCollection = (id) => new Promise((resolve) => {
  setTimeout(() => resolve(COLLECTIONS[id]), 500);
});

const database = {
  addCollection,
  getCollection,
};

export default database;
