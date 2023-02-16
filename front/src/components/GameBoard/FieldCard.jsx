import React from 'react';
import {
  Card,
  Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import PlayerToken from '../PlayerToken';

function FieldCard(props) {
  const {
    players,
    subtitle,
    title,
    children,
  } = props;

  return (
    <Card
      className="my-2 field-card"
    >
      <Card.Header>
        <Card.Title>
          { title }
        </Card.Title>

        { subtitle && (
          <Card.Subtitle>
            { subtitle }
          </Card.Subtitle>
        ) }
      </Card.Header>

      <Card.Body>
        {children}
        <Container>
          { players.map((player) => (
            <PlayerToken
              key={player.name}
              name={player.name}
            />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
}

FieldCard.defaultProps = {
  players: [],
  subtitle: null,
  title: null,
  children: null,
};

FieldCard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  subtitle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default FieldCard;