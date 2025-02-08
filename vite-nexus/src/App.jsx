import { Container } from "react-bootstrap";
import "./App.css";

import Footer from "./components/Footer";
import MyCard from "./components/MyCard";

import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar />
      <Container className="text-center d-flex justify-content-center">
        <MyCard />
      </Container>
      <Footer />
    </>
  );
}

export default App;
