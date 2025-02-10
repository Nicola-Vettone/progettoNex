import { Container } from "react-bootstrap";
import "./App.css";

import Footer from "./components/Footer";
import MyCard from "./components/MyCard";

import TopBar from "./components/TopBar";
import WeatherComponent from "./components/Weather";

function App() {
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <TopBar />
        <Container className="text-center d-flex justify-content-center">
          <MyCard />
        </Container>
        <WeatherComponent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
