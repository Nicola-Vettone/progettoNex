import mongoose from "mongoose";

const MioSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  age: Number,
  email: String,
  hobby: [String],
});

const User = mongoose.model("user", MioSchema);

// Funzione per creare un nuovo utente
async function createUser() {
  try {
    const newUser = new User({
      name: "Nicola",
      lastName: "Vettone",
      age: 25,
      email: "nicolavettone57@gmail.com",
      hobby: ["calcio", "lettura", "videogames"],
    });

    const savedUser = await newUser.save();
    console.log("Utente salvato:", savedUser);
  } catch (error) {
    console.error("Errore nel salvare l'utente:", error);
  }
}

// Funzione per ottenere tutti gli utenti
async function getAllUsers() {
  try {
    const users = await User.find();
    console.log("Tutti gli utenti:", users);
  } catch (error) {
    console.error("Errore nel recuperare gli utenti:", error);
  }
}

export { User, createUser, getAllUsers };
