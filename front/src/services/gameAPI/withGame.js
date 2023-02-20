import database from '../database';

export const collectionId = 'games';
export const eventsCollectionId = 'events';
export const playersCollectionId = 'players';

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
  const collection = await database.addCollection(playersCollectionId);
  await collection.addItem(Game({
    id: '1',
  }));
})();

const withGame = (callback) => async (data) => {
  const {
    gameId,
  } = data;

  const collection = await database.getCollection(collectionId);
  const game = await collection.getById(gameId);
  if (!game) {
    throw new Error('Game not found');
  }

  const eventsCollection = await database.getCollection(eventsCollectionId);
  const playersCollection = await database.getCollection(playersCollectionId);

  const getLastUpdate = async () => {
    const g = await collection.getById(gameId);
    return g && g.lastUpdate;
  };

  const setLastUpdate = async (lastUpdate) => collection.update(gameId, {
    lastUpdate,
  });

  const context = {
    game,
    eventsCollection,
    playersCollection,
    getLastUpdate,
    setLastUpdate,
  };
  return callback(context, data);
};

export default withGame;
