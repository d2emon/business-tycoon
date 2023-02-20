import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import GameBoard from '../../components/GameBoard';
import fieldAPI from '../../services/fieldAPI';
import playersAPI from '../../services/playersAPI';

function BusinessBoard() {
  const [fields, setFields] = useState([]);
  const [players, setPlayers] = useState([]);

  const startGame = useCallback(
    async () => {
      const gameId = '1';
      /*
      const users = [
        '1',
        '2',
        '3',
        '4',
      ];

      const playersData = await Promise.all(users.map((userId) => playersAPI.addPlayer({
        gameId,
        userId,
      })));
      setPlayers(playersData);
      */
      const playersData = await playersAPI.getPlayers({
        gameId,
      });
      setPlayers(playersData);
    },
    [],
  );

  const loadFieldData = async () => {
    const response = await fieldAPI.getFields();
    setFields(response);
  };

  const loadPlayersData = async () => {
    /*
    const gameId = '1';
    const users = [
      '1',
      '2',
      '3',
      '4',
    ];

    const playersData = await Promise.all(users.map((userId) => playersAPI.addPlayer({
      gameId,
      userId,
    })));
    setPlayers(playersData);
    */
  };

  useEffect(
    () => {
      startGame();
      loadFieldData();
      loadPlayersData();
    },
    [],
  );

  return (
    <GameBoard
      fields={fields}
      players={players}
    />
  );
}

export default BusinessBoard;
