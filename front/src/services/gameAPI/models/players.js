import { Subcollection } from '../../database/collection';

const MAX_PLAYERS = 16;
const DEFAULT_CHANNEL = 1;

export const Player = (values) => ({
  id: null,
  active: false,
  channelId: DEFAULT_CHANNEL,
  eventId: null,
  name: null,
  userId: null,
  //
  money: 60000,
  position: 0,
  roll: null,
  //
  ...values,
});

const Players = (items) => {
  const collection = Subcollection(items);

  // Initialize

  const initialize = async () => {
    const promises = [];
    for (let playerId = 0; playerId < MAX_PLAYERS; playerId += 1) {
      promises
        .push(collection
          .addItem(Player({
            id: `${playerId + 1}`,
            active: false,
          })));
    }
    return Promise.all(promises);
  };

  // Queries

  const getActive = () => collection
    .query()
    .find((player) => (player && player.active));

  const getInactive = () => collection
    .query()
    .find((player) => (player && !player.active));

  const findByName = (name) => getActive()
    .find((player) => (player && (player.name.toLowerCase() === name.toLowerCase())));

  const findByUserId = (userId) => getActive()
    .find((player) => (player && (player.userId === userId)));

  //

  const addFromUser = async (user) => {
    if (!user) {
      throw new Error('Пользователь не найден!');
    }

    // eslint-disable-next-line no-console
    console.log(`ENTERING GAME: ${user.name}[${user.id}]`);

    const found = await findByUserId(user.id).any();
    if (found) {
      throw new Error(`Пользователь "${user.name}" уже находится в игре`);
    }

    const empty = await getInactive().first();
    if (!empty) {
      throw new Error('На данный момент свободные места отсутствуют');
    }

    const { id } = empty;
    // TODO: Set random channel id
    return collection.update(id, {
      active: true,
      name: user.name,
      userId: user.id,
    });
  };

  return {
    ...collection,
    addFromUser,
    findByName,
    getActive,
    getInactive,
    initialize,
  };
};

export default Players;
