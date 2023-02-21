import React from 'react';
import {
  Card,
  Container,
} from 'react-bootstrap';
import BusinessBoard from '../../containers/BusinessBoard';

import './App.css';

function App() {
  return (
    <Container className="App">
      <Card>
        <Card.Body>
          <BusinessBoard />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
