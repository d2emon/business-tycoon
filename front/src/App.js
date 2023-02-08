import logo from './logo.svg';
import './App.css';
import BusinessBoard from './containers/BusinessBoard';
import { Card, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Card>
          <BusinessBoard />
        </Card>
      </Container>
      { /*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */ }
    </div>
  );
}

export default App;
