import React, {
  useCallback,
  useEffect,
  useMemo,
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
import PlayerToken from '../../components/PlayerToken';
import fieldAPI from '../../services/fieldAPI';
import gameAPI from '../../services/gameAPI';

function BusinessBoard() {
  const gameId = '1';
  const userId = '1';

  const [isReady, setIsReady] = useState(false);

  const [fields, setFields] = useState([]);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);

  const playerId = useMemo(() => (player && player.id), [player]);

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
      const result = await gameAPI.addPlayer({
        gameId,
        userId,
      });
      setPlayer(result);

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
      const result = await gameAPI.startTurn({
        gameId,
        playerId,
      });
      setPlayer(result);

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
          { player && (
            <PlayerToken
              controls
              disabled={!isReady}
              money={player.money}
              name={player.name}
              roll={player.roll}
              onNextTurn={startTurn}
            />
          ) }
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
