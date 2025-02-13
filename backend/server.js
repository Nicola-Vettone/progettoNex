import connectDb from "./dbConfig.js";
import express from "express";
import cors from "cors";
import { User } from "./user.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use("/", express.static("./public"));
app.use(cors());

// GET - Ottieni tutti gli utenti
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crea un nuovo utente
app.post("/post/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    hobby: req.body.hobby,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// PUT - modifica i dati di un utente
app.put("/put/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID ricevuto:", id);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        hobby: req.body.hobby,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Connetti al database e avvia il server
try {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server avviato su localhost:${port}`);
  });
} catch (error) {
  console.error("Errore durante l'inizializzazione:", error);
  process.exit(1);
}
