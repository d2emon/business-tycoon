import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import GameBoard from '../../components/GameBoard';
import fieldAPI from '../../services/fieldAPI';
import gameAPI from '../../services/gameAPI';

function BusinessBoard() {
  const gameId = '1';
  const userId = '1';

  const [isReady, setIsReady] = useState(false);

  const [fields, setFields] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState([]);

  const loadFieldData = useCallback(
    async () => {
      const response = await fieldAPI.getFields();
      setFields(response);
    },
    [],
  );

  const loadPlayersData = useCallback(
    async () => {
      const playersData = await gameAPI.getPlayers({
        gameId,
      });
      setPlayers(playersData);
    },
    [gameId],
  );

  const refreshData = useCallback(
    async () => {
      await Promise.all([
        loadFieldData(),
        loadPlayersData(),
      ]);
    },
    [
      loadFieldData,
      loadPlayersData,
    ],
  );

  const startGame = useCallback(
    async () => {
      const player = await gameAPI.addPlayer({
        gameId,
        userId,
      });
      setPlayerId(player.id);

      await refreshData();
      setIsReady(true);
    },
    [
      gameId,
      userId,
      refreshData,
    ],
  );

  const startTurn = useCallback(
    async () => {
      setIsReady(false);
      const player = await gameAPI.startTurn({
        gameId,
        playerId,
      });
      console.log(player);

      await refreshData();
      setIsReady(true);
    },
    [
      gameId,
      playerId,
      refreshData,
    ],
  );

  useEffect(
    () => {
      setIsReady(false);
      refreshData();
    },
    [refreshData],
  );

  return (
    <Container>
      <Row>
        <Col md="2">
          <Card>
            <Card.Body className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={startGame}
              >
                Начать игру
              </Button>
              <Button
                variant="primary"
                onClick={refreshData}
              >
                Обновить
              </Button>
              <Button
                disabled={!isReady}
                variant="primary"
                onClick={startTurn}
              >
                Сделать ход
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <GameBoard
            fields={fields}
            players={players}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BusinessBoard;
