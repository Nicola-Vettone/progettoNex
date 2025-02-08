import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

class MyCard extends Component {
  state = {
    users: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchMongo();
  }

  fetchMongo = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      const data = await response.json();
      this.setState({ users: data });
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Caricamento...</p>
        </div>
      );
    }

    return (
      <div className="d-flex flex-wrap justify-content-center">
        {users.map((user) => (
          <Card key={user._id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Img
              variant="top"
              src="https://wips.plug.it/cips/sport.virgilio.it/img/squadre/127.jpg?w=507&a=r"
              alt={user.name}
            />
            <Card.Body>
              <Card.Title>
                {user.name} {user.lastName}
              </Card.Title>
              <Card.Text>Età: {user.age}</Card.Text>
              <Card.Text>Hobby: {user.hobby.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default MyCard;
