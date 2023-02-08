import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

function FieldCard(props) {
  const {
    subtitle,
    title,
    children,
  } = props;

  return (
    <Card className="my-2">
      <Card.Header>
      <Card.Title>
          { title }
        </Card.Title>

        { subtitle && <Card.Subtitle>
          { subtitle }
        </Card.Subtitle> }
      </Card.Header>

      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}

function CompanyCard(props) {
  const {
    cost,
    icon,
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
  }

  return (
    <FieldCard
      title={title}
      subtitle={cost}
    >
      {icons[icon] || `Неизвестно ${icon}`}
    </FieldCard>
  );
}

function BankCard(props) {
  const {
    payment,    
    title,
  } = props;

  return (
    <FieldCard
      title={title}
      subtitle={`+${payment}`}
    >
      Банк
    </FieldCard>
  );
}

function CasinoCard(props) {
  const {
    title,
  } = props;

  return (
    <FieldCard
      title={title}
      subtitle="Ваша ставка"
    >
      Казино
    </FieldCard>
  );
}

function JailCard(props) {
  const {
    fine,
    title,
  } = props;

  return (
    <FieldCard
      title={title}
      subtitle={-fine}
    >
      Заключение
    </FieldCard>
  );
}

function GameBoard(props) {
  const {
    fields,
  } = props;

  return (
    <Container>
      <Row>
        { fields.map((field) => (
          <Col
            key={field.id}
            md={2}
          >
            { (field.fieldType === 1) && <CompanyCard {...field} /> }
            { (field.fieldType === 2) && <BankCard {...field} /> }
            { (field.fieldType === 3) && <CasinoCard {...field} /> }
            { (field.fieldType === 4) && <JailCard {...field} /> }
          </Col>
        )) }
      </Row>
    </Container>
  );
}

export default GameBoard;
