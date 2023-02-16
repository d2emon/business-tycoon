import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ErrorCard from '../ErrorCard';

function Game(props) {
  const {
    name,
    userId,
    children,
    onCanStop,
    onStart,
    onStop,
  } = props;

  const [error, setError] = useState(null);
  const [isHandlingNextTurn, setIsHandlingNextTurn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState(null);

  const handleCanStop = useCallback(
    async () => {
      if (!onCanStop) {
        return true;
      }

      return onCanStop();
    },
    [
      onCanStop,
    ],
  );

  const handleError = useCallback(
    async (e) => {
      if (onStop) {
        await onStop();
      }

      setMessages(null);
      setError(<h1>{e}</h1>);
    },
    [
      onStop,
    ],
  );

  const handleNextTurn = useCallback(
    () => {
      if (!onStart) {
        return;
      }

      if (isHandlingNextTurn) {
        return;
      }

      setIsHandlingNextTurn(true);
      onStart(userId, name);
      setIsHandlingNextTurn(false);
    },
    [
      isHandlingNextTurn,
      name,
      userId,
      onStart,
    ],
  );

  const handleStart = useCallback(
    () => {
      if (!onStart) {
        return;
      }

      onStart(userId, name);
    },
    [
      name,
      userId,
      onStart,
    ],
  );

  const handleStop = useCallback(
    async () => {
      const canStop = await handleCanStop();
      if (!canStop) {
        return;
      }

      handleError(new Error('До новых встреч!'));
    },
    [
      handleCanStop,
      handleError,
    ],
  );

  useEffect(
    () => {
      if (!isReady) {
        return;
      }

      handleStart();
    },
    [
      isReady,
      handleStart,
    ],
  );

  useEffect(
    () => {
      if (!name || !userId) {
        setIsReady(false);
        handleError(new Error('Пользователь не найден!'));
        return;
      }

      setIsReady(true);
    },
    [
      name,
      userId,
    ],
  );

  if (error) {
    return (
      <Container data-testid="error">
        <ErrorCard messages={messages}>
          { error }
        </ErrorCard>
      </Container>
    );
  }

  if (!isReady) {
    return (
      <Container data-testid="loader">
        <h1>Идёт загрузка...</h1>
      </Container>
    );
  }

  return (
    <Container
      data-testid="main"
    >
      <div
        data-testid="greetings"
      >
        Добро пожаловать,
        {' '}
        { name }
        !
      </div>

      <div
        data-testid="game"
      >
        { children }
      </div>

      <div
        data-testid="controls"
      >
        <Button onClick={handleNextTurn}>
          Следующий ход
        </Button>
        <Button onClick={handleStop}>
          Закончить
        </Button>
      </div>
    </Container>
  );
}

Game.defaultProps = {
  name: null,
  userId: null,
  children: null,
  onCanStop: null,
  onStart: null,
  onStop: null,
};

Game.propTypes = {
  name: PropTypes.string,
  userId: PropTypes.string,
  children: PropTypes.node,
  onCanStop: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default Game;
