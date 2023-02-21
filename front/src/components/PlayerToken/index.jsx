import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function PlayerToken(props) {
  const {
    controls,
    disabled,
    money,
    name,
    roll,
    onNextTurn,
  } = props;

  return (
    <Card className="mb-2">
      <Card.Header>
        <Card.Title>
          { name }
        </Card.Title>
        <Card.Subtitle>
          Деньги:
          {' '}
          {money}
        </Card.Subtitle>
        { roll && (
          <Card.Subtitle>
            Бросок:
            {' '}
            {roll}
          </Card.Subtitle>
        ) }
      </Card.Header>
      { controls && (
        <Card.Body className="d-grid gap-2">
          <Button
            disabled={disabled}
            variant="primary"
            onClick={onNextTurn}
          >
            Сделать ход
          </Button>
        </Card.Body>
      ) }
    </Card>
  );
}

PlayerToken.defaultProps = {
  controls: false,
  disabled: false,
  money: null,
  name: null,
  roll: null,
  onNextTurn: null,
};

PlayerToken.propTypes = {
  controls: PropTypes.bool,
  disabled: PropTypes.bool,
  money: PropTypes.number,
  name: PropTypes.string,
  roll: PropTypes.number,
  onNextTurn: PropTypes.func,
};

export default PlayerToken;
