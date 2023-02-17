import eventsAPI from '../eventsAPI';
import gameAPI from '../gameAPI';
import userAPI from '../userAPI';
import { mockResponse } from '../utils';

let PLAYERS = [];

// TODO: Error Handler
// TODO: Exit Handler
// TODO: Action Handler
// TODO: Next Turn Handler

const addPlayer = async (data) => {
  const {
    gameId,
    userId,
  } = data;

  const user = await userAPI.getUser({ userId });
  if (!user) {
    throw new Error('Пользователь не найден!');
  }

  console.log(`ENTERING GAME: ${user.name}[${user.id}]`);

  const player = await gameAPI.addNewPlayer({
    gameId,
    user,
  });

  eventsAPI.eventEnterGame({
    gameId,
    player,
  });

  // TODO: Perform player checks
  // TODO: Return channel data
  // TODO: Return mode 1
  // TODO: Return player is ready
  return {
    player,
  };
};

const startGame = (players) => {
  PLAYERS = players.map((player) => ({
    ...player,
    money: 60000,
    position: '1',
  }));
  return [...PLAYERS];
};

const playersAPI = {
  addPlayer: mockResponse(addPlayer),
  startGame: mockResponse(startGame),
};

export default playersAPI;
