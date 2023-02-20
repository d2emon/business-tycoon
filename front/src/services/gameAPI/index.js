import database from '../database';
import {
  mockResponse,
} from '../utils';
import {
  createEvent,
  getEvents,
} from './events';
import {
  addNewPlayer, getPlayers,
} from './players';

export const collectionId = 'games';

const MAX_PLAYERS = 16;

const Game = (values) => {
  const players = {};

  for (let playerId = 0; playerId <= MAX_PLAYERS; playerId += 1) {
    players[playerId] = null;
  }

  return {
    id: null,
    lastUpdate: 0,
    events: [],
    players,
    ...values,
  };
};

(async () => {
  const collection = await database.addCollection(collectionId);
  await collection.addItem(Game({
    id: '1',
  }));
})();

const gameAPI = {
  // Events
  createEvent: mockResponse('POST /game/events/', (data) => createEvent({
    ...data,
    onUpdate: () => {
      // TODO: Cleanup events
      // TODO: Perform onUpdate events
    },
  })),
  getEvents: mockResponse('GET /game/events/', getEvents),

  // Players
  addNewPlayer: mockResponse('POST /game/players/', addNewPlayer),
  getPlayers: mockResponse('GET /game/players/', getPlayers),
};

export default gameAPI;
