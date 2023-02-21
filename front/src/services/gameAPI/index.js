import database from '../database';
import {
  mockResponse,
} from '../utils';
import gamesData, { collectionId } from './data';
import {
  createEvent,
  getEvents,
} from './events';
import Game from './models';
import {
  addNewPlayer,
  getPlayers,
  startTurn,
} from './players';
import senders from './events/senders';
import withGame, {
  update,
} from './withGame';

const addEvent = async (data) => {
  const event = await createEvent(data);

  const updated = await update({
    ...data,
    timestamp: event.timestamp,
  });
  if (updated) {
    // TODO: Cleanup events
    // TODO: Perform onUpdate events
  }

  return {
    event,
    updated,
  };
};

const addPlayer = async (data) => {
  const player = await addNewPlayer(data);

  if (!player) {
    return null;
  }

  senders
    .eventEnterGame(player)
    .forEach((event) => addEvent({
      ...data,
      event,
    }));

  // TODO: Perform player checks
  // TODO: Return channel data
  // TODO: Return mode 1
  // TODO: Return player is ready

  return player;
};

const getGame = withGame(async (context) => {
  const {
    game: {
      id,
      isReady,
      lastUpdate,
      events,
      players,
    },
  } = context;

  const eventsList = await events.query().all();
  const playersList = await players.getActive().all();

  return {
    id,
    isReady,
    lastUpdate,
    events: eventsList,
    players: playersList,
  };
});

const gameAPI = {
  getGame: mockResponse('GET /game/', getGame),

  // Events
  addEvent: mockResponse('POST /game/events/', addEvent),
  getEvents: mockResponse('GET /game/events/', getEvents),

  // Players
  addPlayer: mockResponse('POST /game/players/', addPlayer),
  getPlayers: mockResponse('GET /game/players/', getPlayers),

  startTurn: mockResponse('POST /game/turn/', startTurn),
};

(async () => {
  const collection = await database.addCollection(collectionId);

  const initGame = async (value) => {
    const game = Game(value);
    await game.initialize();
    await collection.addItem(game);

    await addPlayer({
      gameId: game.id,
      userId: '2',
    });
    await addPlayer({
      gameId: game.id,
      userId: '3',
    });
    await addPlayer({
      gameId: game.id,
      userId: '4',
    });

    setTimeout(
      () => {
        collection.update(game.id, {
          isReady: true,
        });
      },
      1000,
    );
  };

  await Promise.all(gamesData.map(initGame));
})();

export default gameAPI;
