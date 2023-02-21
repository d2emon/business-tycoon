/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import BankCard from './BankCard';
import CasinoCard from './CasinoCard';
import CompanyCard from './CompanyCard';
import JailCard from './JailCard';

import './styles.css';

function GameBoard(props) {
  const {
    fields,
    players,
  } = props;

  const cardMd = 3;

  const fieldsData = useMemo(
    () => fields.map((field) => ({
      ...field,
      players: players.filter((player) => (player.position === field.position)),
    })),
    [
      fields,
      players,
    ],
  );

  return (
    <Container>
      <Row>
        { fieldsData.map((field) => (
          <Col
            key={field.id}
            md={cardMd}
          >
            {(field.fieldType === 1) && (
              <CompanyCard
                players={field.players}
                title={field.title}
                cost={field.cost}
                icon={field.icon}
              />
            )}
            {(field.fieldType === 2) && (
              <BankCard
                players={field.players}
                title={field.title}
                payment={field.payment}
              />
            )}
            {(field.fieldType === 3) && (
              <CasinoCard
                players={field.players}
                title={field.title}
              />
            )}
            {(field.fieldType === 4) && (
              <JailCard
                players={field.players}
                title={field.title}
                fine={field.fine}
              />
            )}
          </Col>
        )) }
      </Row>
    </Container>
  );
}

GameBoard.defaultProps = {
  fields: null,
  players: null,
};

GameBoard.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    cost: PropTypes.number,
    fine: PropTypes.number,
    icon: PropTypes.string,
    payment: PropTypes.number,
    position: PropTypes.number,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
  })),
  players: PropTypes.arrayOf(PropTypes.shape({
    //
  })),
};

export default GameBoard;
