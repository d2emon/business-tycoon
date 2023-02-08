import { mockResponse } from '../utils';

let PLAYERS = [];

const startGame = (players) => {
  PLAYERS = players.map((player) => ({
    ...player,
    money: 60000,
    position: 1,
  }));
  return [...PLAYERS];
};

const playersAPI = {
  startGame: mockResponse(startGame),
};

export default playersAPI;
