const { Result } = require("express-validator");
const { getByOwner } = require("../services/adventureServices");
const { register, login, updateUser } = require("../services/userServices");

const authController = require("express").Router();

// Register route
authController.post("/register", async (req, res) => {
  const { username, email, password, img } = req.body;
  try {
    const user = await register(username, email, password, img);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  res.end();
});

// Login route
authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.end();
});

// Logout route
authController.get("/logout", (req, res) => {
  res.status(204).end();
});

// Get adventures by owner

authController.get("/profile", async (req, res) => {
  const user = req?.user;
  const adventures = await getByOwner(user);
  res.status(200).json(adventures);
  res.end();
});

authController.put("/profile/edit", async (req, res) => {
  try {
    const user = req?.user._id;
    const updatedUser = await updateUser(user, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
module.exports = authController;
