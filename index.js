
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger = require("./src/helpers/log")
const database = require('./src/services/database.service')
const controller = require('./src/controllers/default.controller')
const apiRoutes = require('./src/routes/api.routes')
database.connect();

app.use(express.json())

app.use(controller.getAll)

app.use('/api', apiRoutes)

app.use('/*', controller.endpointNotFound)

app.use(controller.showError)

app.listen(port, () => {
    // database.seed(100)
    logger.info('Server is running')
})

module.exports = app



// const express = require("express");
// const app = express();
// const User = require("./userModel");

// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Middleware tracer for logging function calls
// app.use((req, res, next) => {
//   console.log(`Function ${req.path} called with parameters:`, req.body);
//   next();
// });

// // UC-201: Register as new user
// app.post("/api/users", (req, res) => {
//   const { username, password, email } = req.body;
//   // Validate user input
//   if (!username || !password || !email) {
//     return res
//       .status(400)
//       .json({ error: "Please provide username, email, and password" });
//   }
//   // Check if user already exists
//   if (User.find(username)) {
//     return res
//       .status(400)
//       .json({ error: "User with this username already exists" });
//   }
//   // Create new user
//   const newUser = { username, password, email };
//   User.save(newUser)
//     .then((user) => {
//       console.log(`Function ${req.path} returned:`, user);
//       res.status(201).json(user);
//     })
//     .catch((error) => {
//       console.error(error.stack);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// // UC-202: Request overview of users
// app.get("/api/users", (req, res) => {
//   User.getAll()
//     .then((users) => {
//       console.log(`Function ${req.path} returned:`, users);
//       res.json(users);
//     })
//     .catch((error) => {
//       console.error(error.stack);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// // UC-203: Query own user profile
// app.get("/api/users/me", (req, res) => {
//   const user = User.find(req.user.username);
//   console.log(`Function ${req.path} returned:`, user);
//   res.json(user);
// });

// // UC-204: Request user data with ID
// app.get("/api/users/:id", (req, res) => {
//   const { id } = req.params;
//   const user = User.findById(parseInt(id));
//   if (!user) {
//     console.log(`Function ${req.path} returned: User not found`);
//     return res.status(404).json({ error: "User not found" });
//   }
//   console.log(`Function ${req.path} returned:`, user);
//   res.json(user);
// });

// // UC-205: Change own user data
// app.patch("/api/users/me", (req, res) => {
//   const { username, password, email } = req.body;
//   // Validate user input
//   if (!username && !password && !email) {
//     return res
//       .status(400)
//       .json({ error: "Please provide at least one field to update" });
//   }
//   // Update user object
//   const user = User.find(req.user.username);
//   if (username) user.username = username;
//   if (password) user.password = password;
//   if (email) user.email = email;
//   User.update(user)
//     .then((updatedUser) => {
//       console.log(`Function ${req.path} returned:`, updatedUser);
//       res.json(updatedUser);
//     })
//     .catch((error) => {
//       console.error(error.stack);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// // UC-206: Delete own user profile
// app.delete("/api/users/me", (req, res) => {
//   const username = req.user.username;
//   User.delete(username)
//     .then(() => {
//       console.log(`Function ${req.path} returned: User with username ${username} deleted`);
//       res.json({ message: "User deleted successfully" });
//     })
//     .catch((error) => {
//       console.error(error.stack);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });


// app.listen(port, () => {
//   console.log(`Server started listening on port ${port}`);
// });

// module.exports = app;