import './App.css';
import "bootswatch/dist/quartz/bootstrap.min.css";

import CurrentWeatherDisplay from './components/CurrentWeatherDisplay.js'
import LocationDisplayTable from './components/LocationDisplayTable'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Container fluid>
        <br />
        <div style={{ fontSize: "300%" }}>Simple Weather App</div>
        <br />
        <CurrentWeatherDisplay />
        <hr />
        <LocationDisplayTable />
      </Container>
    </div>
  );
}

export default App;
