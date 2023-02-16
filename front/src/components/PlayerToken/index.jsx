import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function PlayerToken(props) {
  const {
    name,
  } = props;

  return (
    <Card className="my-2">
      <Card.Header>
        <Card.Title>
          { name }
        </Card.Title>
      </Card.Header>
    </Card>
  );
}

PlayerToken.defaultProps = {
  name: null,
};

PlayerToken.propTypes = {
  name: PropTypes.string,
};

export default PlayerToken;
