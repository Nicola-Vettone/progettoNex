import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const ModUsers = ({ user, show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    hobby: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        hobby: user.hobby?.join(", ") || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!show) {
      setFormData({
        name: "",
        email: "",
        age: "",
        hobby: "",
      });
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Validazione
    if (!formData.name || !formData.email || !formData.age || !formData.hobby) {
      alert("Tutti i campi sono obbligatori");
      return;
    }

    if (isNaN(formData.age)) {
      alert("L'età deve essere un numero");
      return;
    }

    setIsLoading(true);
    console.log(user._id);
    try {
      const response = await fetch(`http://localhost:8080/put/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: formData.age,
          hobby: formData.hobby.split(",").map((hobby) => hobby.trim()),
        }),
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento");
      }

      const updatedUser = await response.json();
      console.log("Utente aggiornato:", updatedUser);
      onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore durante il salvataggio dell'utente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Profilo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Età</Form.Label>
            <Form.Control
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hobby (separati da virgola)</Form.Label>
            <Form.Control
              type="text"
              value={formData.hobby}
              onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Annulla
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Salvataggio in corso..." : "Salva"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModUsers;
