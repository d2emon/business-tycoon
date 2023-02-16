import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FieldCard from './FieldCard';

function CompanyCard(props) {
  const {
    cost,
    icon,
    players,
    title,
  } = props;

  const icons = {
    car: 'Автомобили',
    plane: 'Авиация',
    hotel: 'Гостиницы',
    music: 'Развлечения',
    food: 'Питание',
    smoking: 'Табак',
    fashion: 'Мода',
    gun: 'Оружие',
    sail: 'Корабли',
  };

  const subtitle = useMemo(() => `${cost}`, [cost]);

  return (
    <FieldCard
      title={title}
      subtitle={subtitle}
      players={players}
    >
      {icons[icon] || `Неизвестно ${icon}`}
    </FieldCard>
  );
}

CompanyCard.defaultProps = {
  cost: null,
  icon: null,
  players: [],
  title: null,
};

CompanyCard.propTypes = {
  cost: PropTypes.number,
  icon: PropTypes.string,
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  title: PropTypes.string,
};

export default CompanyCard;
