import {
  makeIndices,
} from '../utils';

const MAX_PLAYERS = 16;

const createGame = (id) => {
  const players = {};

  for (let playerId = 0; playerId <= MAX_PLAYERS; playerId += 1) {
    players[playerId] = null;
  }

  return {
    id,
    lastUpdate: 0,
    events: [],
    players,
  };
};

const GAMES = makeIndices([
  createGame('1'),
  createGame('2'),
  createGame('3'),
]);

const withEvents = (game) => {
  const {
    id,
    events,
  } = game;

  return {
    events,
    getEventId: () => events.reduce(
      (lastEventId, event) => ((event.id > lastEventId) ? event.id : lastEventId),
      0,
    ),
    appendEvent: (event, onUpdate) => {
      game.events.push(event);
      if ((game.events.length - game.lastUpdate) > 100) {
        GAMES[id].lastUpdate = game.events.length;
        onUpdate();
      }
    },
  };
};

const withPlayers = (game) => {
  const {
    id,
    players,
  } = game;

  return {
    players,
    getPlayerId: () => Object
      .keys(players)
      .find((itemId) => (!players[itemId])),
    findPlayerByName: (name) => Object
      .values(players)
      .find((player) => (player && (player.name.toLowerCase() === name))),
    updatePlayer: (playerId, update) => {
      const oldData = GAMES[id].players[playerId] || {};
      const player = {
        id,
        ...oldData,
        ...update,
      };
      GAMES[id].players[playerId] = player;
      return player;
    },
  };
};

const withGame = (callback) => (data) => {
  const {
    gameId,
  } = data;

  const game = GAMES[gameId];

  if (!game) {
    throw new Error('Game not found');
  }

  const context = {
    game,
    ...withEvents(game),
    ...withPlayers(game),
  };
  return callback(context, data);
};

export default withGame;
