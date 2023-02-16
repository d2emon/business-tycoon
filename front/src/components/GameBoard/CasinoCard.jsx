import React from 'react';
import PropTypes from 'prop-types';
import FieldCard from './FieldCard';

function CasinoCard(props) {
  const {
    players,
    title,
  } = props;

  return (
    <FieldCard
      title={title}
      subtitle="Ваша ставка"
      players={players}
    >
      Казино
    </FieldCard>
  );
}

CasinoCard.defaultProps = {
  players: [],
  title: null,
};

CasinoCard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  title: PropTypes.string,
};

export default CasinoCard;
