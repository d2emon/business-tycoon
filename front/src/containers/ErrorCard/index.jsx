import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ErrorCard(props) {
  const {
    messages,
    children,
  } = props;

  return (
    <>
      <div
        data-testid="messages"
      >
        { messages }
      </div>

      <Card>
        <Card.Body
          data-testid="errorMessage"
        >
          { children }
        </Card.Body>
      </Card>
    </>
  );
}

ErrorCard.defaultProps = {
  messages: null,
  children: null,
};

ErrorCard.propTypes = {
  messages: PropTypes.node,
  children: PropTypes.node,
};

export default ErrorCard;
