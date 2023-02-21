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
