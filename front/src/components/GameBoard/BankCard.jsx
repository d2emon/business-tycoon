import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FieldCard from './FieldCard';

function BankCard(props) {
  const {
    payment,
    players,
    title,
  } = props;

  const subtitle = useMemo(() => `+${payment}`, [payment]);

  return (
    <FieldCard
      title={title}
      subtitle={subtitle}
      players={players}
    >
      Банк
    </FieldCard>
  );
}

BankCard.defaultProps = {
  payment: null,
  players: [],
  title: null,
};

BankCard.propTypes = {
  payment: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  title: PropTypes.string,
};

export default BankCard;
