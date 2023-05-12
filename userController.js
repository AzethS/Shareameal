const User = require("./userModel");

exports.registerUser = (req, res, next) => {
  const { username, password, email } = req.body;
  // Validate user input
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Please provide username, email, and password" });
  }
  // Check if user already exists
  if (User.find(username)) {
    return res
      .status(400)
      .json({ error: "User with this username already exists" });
  }
  // Create new user
  const newUser = { username, password, email };
  User.save(newUser)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

exports.getUsers = (req, res, next) => {
  User.getAll()
    .then((users) => res.json(users))
    .catch((error) => next(error));
};

exports.getUserProfile = (req, res, next) => {
  const user = User.find(req.user.username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => next(error));
};

exports.updateUserProfile = (req, res, next) => {
  const { username, password, email } = req.body;
  // Validate user input
  if (!username && !password && !email) {
    return res
      .status(400)
      .json({ error: "Please provide at least one field to update" });
  }
  // Update user object
  const user = User.find(req.user.username);
  if (username) user.username = username;
  if (password) user.password = password;
  if (email) user.email = email;
  User.update(user.id, user)
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => next(error));
};

exports.deleteUserProfile = (req, res, next) => {
  User.delete(req.user.username)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
};