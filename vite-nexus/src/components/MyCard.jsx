import { Component } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import ModUsers from "./Mod";

class MyCard extends Component {
  state = {
    users: [],
    isLoading: true,
    selectedUser: null,
    showModal: false,
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
      this.setState({ users: data, isLoading: false });
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
      this.setState({ isLoading: false });
    }
  };

  // Apri il mod e imposta l'utente selezionato
  handleOpenModal = (user) => {
    this.setState({ selectedUser: user, showModal: true });
  };

  // Chiudi il mod
  handleCloseModal = () => {
    this.setState({ showModal: false, selectedUser: null });
  };

  // Aggiorna l'utente dopo la modifica
  handleSaveUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
      showModal: false,
      selectedUser: null,
    }));
  };

  render() {
    const { users, isLoading, selectedUser, showModal } = this.state;

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
              <Card.Text>
                <strong>Età:</strong> {user.age}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Hobby:</strong> {user.hobby.join(", ")}
              </Card.Text>

              {/* Bottone per aprire il mod */}
              <Button variant="primary" onClick={() => this.handleOpenModal(user)}>
                Modifica
              </Button>
            </Card.Body>
          </Card>
        ))}

        {/* Modale per modificare */}
        {selectedUser && (
          <ModUsers user={selectedUser} show={showModal} onClose={this.handleCloseModal} onSave={this.handleSaveUser} />
        )}
      </div>
    );
  }
}

export default MyCard;
