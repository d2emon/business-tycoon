import { mockResponse } from '../utils';

const USERS = {};

const USER_DATA = {
  id: null,
  name: null,
};

const withUser = (callback) => async (data) => {
  const {
    userId,
  } = data;

  const user = userId ? USERS[userId] : null;

  const context = {
    user,
    createUser: (userData) => {
      const id = USERS.length;
      const newUser = {
        ...USER_DATA,
        ...userData,
        id,
      };
      USERS[id] = newUser;
      return newUser;
    },
  };

  return callback(context, data);
};

const addUser = withUser((context, data) => {
  const {
    user,
    createUser,
  } = context;

  const {
    name,
  } = data;

  if (user) {
    throw new Error('Пользователь уже существует!');
  }

  return createUser({
    name,
  });
});

const getUser = withUser(async (context) => {
  const {
    user,
  } = context;

  if (!user) {
    throw new Error('Пользователь не найден!');
  }

  return user;
});

const userAPI = {
  addUser: mockResponse(addUser),
  getUser: mockResponse(getUser),
};

export default userAPI;
