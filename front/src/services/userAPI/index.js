import database from '../database';
import { mockResponse } from '../utils';
import usersData, { collectionId } from './data';

(async () => {
  const collection = await database.addCollection(collectionId);
  collection.fill(usersData);
})();

const withUser = (callback) => async (data) => {
  const {
    userId,
  } = data;

  const collection = await database.getCollection(collectionId);
  const user = await collection.getById(userId);

  const context = {
    collection,
    user,
  };

  return callback(context, data);
};

const addUser = withUser((context, data) => {
  const {
    collection,
    user,
  } = context;

  if (user) {
    throw new Error('Пользователь уже существует!');
  }

  return collection.addUser({
    name: data.name,
  });
});

const getUser = withUser((context) => {
  const {
    user,
  } = context;

  if (!user) {
    throw new Error('Пользователь не найден!');
  }

  return user;
});

const userAPI = {
  addUser: mockResponse('POST users/', addUser),
  getUser: mockResponse('GET users/', getUser),
};

export default userAPI;
