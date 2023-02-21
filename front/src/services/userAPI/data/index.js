export const collectionId = 'users';

const User = (name) => ({
  name,
});

const data = [
  User('Игрок'),
  User('Бот 1'),
  User('Бот 2'),
  User('Бот 3'),
];

export default data;
