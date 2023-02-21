import Events from './events';
import Players from './players';

const Game = (values) => {
  const players = Players([]);

  const initialize = async () => {
    await players.initialize();
  };

  return {
    id: null,
    isReady: false,
    lastUpdate: 0,
    events: Events([]),
    players,
    ...values,
    initialize,
  };
};

export default Game;
