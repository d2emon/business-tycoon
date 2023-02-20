import database from '../database';
import userAPI from '../userAPI';
import withGame, { playersCollectionId } from './withGame';

(async () => {
  await database.addCollection(playersCollectionId);
})();

const DEFAULT_CHANNEL = 1;

const Player = (values) => ({
  gameId: null,
  id: null,
  channelId: DEFAULT_CHANNEL,
  eventId: null,
  name: null,
  userId: null,
  //
  money: 60000,
  position: '1',
  //
  ...values,
});

const findByName = (collection, name) => collection
  .query()
  .find((player) => (player && (player.name.toLowerCase() === name)))
  .any();

export const addNewPlayer = withGame(async (context, data) => {
  const {
    playersCollection,
  } = context;
  const {
    gameId,
    userId,
  } = data;

  const user = await userAPI.getUser({
    userId,
  });
  if (!user) {
    throw new Error('Пользователь не найден!');
  }

  // eslint-disable-next-line no-console
  console.log(`ENTERING GAME: ${user.name}[${user.id}]`);

  const found = await findByName(playersCollection, user.name);
  if (found) {
    throw new Error('Пользователь с таким именем уже находится в игре');
  }

  const id = playersCollection.getEmpty();
  if (!id) {
    throw new Error('На данный момент свободные места отсутствуют');
  }

  // TODO: Set random channel id
  const player = await playersCollection.update(id, Player({
    id,
    gameId,
    userId: user.id,
    name: user.name,
  }));

  return player;
});

export const findPlayerByName = withGame(async (context, data) => {
  const {
    playersCollection,
  } = context;

  return findByName(playersCollection, data.name);
});

export const getPlayers = withGame(async (context) => {
  const {
    playersCollection,
  } = context;

  return playersCollection
    .query()
    .all();
});
