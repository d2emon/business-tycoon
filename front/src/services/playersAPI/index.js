import database from '../database';
import eventsAPI from '../eventsAPI';
import gameAPI from '../gameAPI';
import { mockResponse } from '../utils';

const collectionId = 'players';

(async () => {
  await database.addCollection(collectionId);
})();

// TODO: Error Handler
// TODO: Exit Handler
// TODO: Action Handler
// TODO: Next Turn Handler

const addPlayer = async (data) => {
  const {
    gameId,
    userId,
  } = data;

  const player = await gameAPI.addNewPlayer({
    gameId,
    userId,
  });

  if (!player) {
    return player;
  }

  eventsAPI.eventEnterGame({
    gameId,
    player,
  });

  // TODO: Perform player checks
  // TODO: Return channel data
  // TODO: Return mode 1
  // TODO: Return player is ready

  return player;
};

const playersAPI = {
  addPlayer: mockResponse('POST /players/', addPlayer),
  getPlayers: mockResponse('GET /players/', gameAPI.getPlayers),
};

(() => {
  const players = [
    { gameId: '1', userId: '1' },
    { gameId: '1', userId: '2' },
    { gameId: '1', userId: '3' },
    { gameId: '1', userId: '4' },
  ];
  players.forEach(playersAPI.addPlayer);
})();

export default playersAPI;
