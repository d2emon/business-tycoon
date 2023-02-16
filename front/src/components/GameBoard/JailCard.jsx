import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FieldCard from './FieldCard';

function JailCard(props) {
  const {
    fine,
    players,
    title,
  } = props;

  const subtitle = useMemo(() => `-${fine}`, [fine]);

  return (
    <FieldCard
      title={title}
      subtitle={subtitle}
      players={players}
    >
      Заключение
    </FieldCard>
  );
}

JailCard.defaultProps = {
  fine: null,
  players: [],
  title: null,
};

JailCard.propTypes = {
  fine: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  title: PropTypes.string,
};

export default JailCard;
