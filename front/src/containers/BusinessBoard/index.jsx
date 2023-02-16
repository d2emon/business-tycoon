import React, {
  useEffect,
  useState,
} from 'react';
import GameBoard from '../../components/GameBoard';
import fieldAPI from '../../services/fieldAPI';
import playersAPI from '../../services/playersAPI';

function BusinessBoard() {
  const [fields, setFields] = useState([]);
  const [players, setPlayers] = useState([]);

  const loadFieldData = async () => {
    const response = await fieldAPI.getFields();
    setFields(response);
  };

  const loadPlayersData = async () => {
    const response = await playersAPI.startGame([
      {
        name: 'Игрок 1',
      },
      {
        name: 'Игрок 2',
      },
      {
        name: 'Игрок 3',
      },
      {
        name: 'Игрок 4',
      },
    ]);
    setPlayers(response);
  };

  useEffect(
    () => {
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
