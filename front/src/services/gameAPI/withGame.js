import database from '../database';

export const collectionId = 'games';

const withGame = (callback) => async (data) => {
  const {
    gameId,
  } = data;

  const collection = await database.getCollection(collectionId);
  const game = await collection.getById(gameId);
  if (!game) {
    throw new Error('Game not found');
  }

  const context = {
    collection,
    game,
  };

  return callback(context, data);
};

export const update = withGame(async (context, data) => {
  const {
    collection,
    game,
  } = context;
  const {
    timestamp,
  } = data;

  const needUpdate = ((timestamp - game.lastUpdate) > 100);

  if (needUpdate) {
    collection.update(game.id, {
      lastUpdate: timestamp,
    });
  }

  return needUpdate;
});

export default withGame;
