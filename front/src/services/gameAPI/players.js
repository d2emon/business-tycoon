import userAPI from '../userAPI';
import withGame from './withGame';

export const addNewPlayer = withGame(async (context, data) => {
  const {
    game,
  } = context;
  const {
    userId,
  } = data;

  const user = await userAPI.getUser({
    userId,
  });
  return game.players.addFromUser(user);
});

export const getPlayers = withGame(async (context) => {
  const {
    game,
  } = context;
  return game
    .players
    .getActive()
    .all();
});

const withPlayer = (callback) => withGame(async (gameContext, data) => {
  const {
    game,
  } = gameContext;
  const {
    playerId,
  } = data;

  const player = await game
    .players
    .getById(playerId);
  if (!player) {
    throw new Error('Игрок не найден');
  }

  const context = {
    game,
    player,
  };
  return callback(context, data);
});

export const startTurn = withPlayer(async (context) => {
  const {
    game,
    player,
  } = context;

  const roll = Math.floor(Math.random() * 6) + 1;
  let position = player.position + roll;
  if (position >= 48) {
    position = 0;
  }

  return game
    .players
    .update(player.id, {
      position,
      roll,
    });
});
