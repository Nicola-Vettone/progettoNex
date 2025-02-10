import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "nihgf9cbxJUEeRmx50yjgB6GU41XUeWC";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city) {
      setError("Per favore inserisci il nome di una città");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Città non trovata");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(
        error.message === "Città non trovata"
          ? "Città non trovata. Controlla il nome e riprova."
          : "Si è verificato un errore. Riprova più tardi."
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Controlla le previsione del Meteo:</h1>

      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group className="mb-3" controlId="cityInput">
          <Form.Control
            type="text"
            placeholder="Inserisci la città..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Caricamento..." : "Cerca"}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {weatherData && (
        <Card>
          <Card.Body>
            <Card.Title>Meteo a {city}</Card.Title>
            <Card.Text>🌡️ Temperatura: {Math.round(weatherData.data.values.temperature)}°C</Card.Text>
            <Card.Text>💧 Umidità: {Math.round(weatherData.data.values.humidity)}%</Card.Text>
            <Card.Text> 🌤️ Copertura nuvolosa: {Math.round(weatherData.data.values.cloudCover)}%</Card.Text>
            <Card.Text> 💨 Velocità del vento: {Math.round(weatherData.data.values.windSpeed)} km/h</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default WeatherComponent;
