import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import GameBoard from '../../components/GameBoard';
import fieldAPI from '../../services/fieldAPI';

function BusinessBoard() {
  const [fields, setFields] = useState([]);

  const loadData = async () => {
    const response = await fieldAPI.getFields();
    setFields(response);
  };

  useEffect(
    () => {
      loadData();
    },
    [],
  );

  return (
    <GameBoard
      fields={fields}
    />
  );
}

export default BusinessBoard;