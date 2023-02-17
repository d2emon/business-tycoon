import withGame from './withGame';

const DEFAULT_CHANNEL = 1;

const PLAYER_DATA = {
  id: null,
  channelId: DEFAULT_CHANNEL,
  eventId: null,
  name: null,
  userId: null,
};

export const addNewPlayer = withGame((context, data) => {
  const {
    findPlayerByName,
    getPlayerId,
    updatePlayer,
  } = context;
  const {
    user,
  } = data;

  const found = findPlayerByName(user.name);
  if (found) {
    throw new Error('Пользователь с таким именем уже находится в игре');
  }

  const playerId = getPlayerId();
  if (!playerId) {
    throw new Error('На данный момент свободные места отсутствуют');
  }

  // TODO: Set random channel id
  return updatePlayer(playerId, {
    ...PLAYER_DATA,
    userId: user.id,
    name: user.name,
  });
});

export const findPlayer = withGame((context, data) => {
  const {
    findPlayerByName,
  } = context;
  const {
    name,
  } = data;

  return findPlayerByName(name);
});
