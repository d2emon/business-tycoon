import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Game(props) {
  const {
    name,
    userId,
    children,
    onStart,
  } = props;

  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleStart = useCallback(
    () => {
      if (onStart) {
        onStart(userId, name);
      }
    },
    [
      name,
      userId,
      onStart,
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
        setError(<h1>Пользователь не найден!</h1>);
        return;
      }

      setIsReady(!!name && !!userId);
    },
    [
      name,
      userId,
    ],
  );

  if (error) {
    return (
      <Container data-testid="error">
        { error }
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
    </Container>
  );
}

Game.defaultProps = {
  name: null,
  userId: null,
  children: null,
  onStart: null,
};

Game.propTypes = {
  name: PropTypes.string,
  userId: PropTypes.string,
  children: PropTypes.node,
  onStart: PropTypes.func,
};

export default Game;
