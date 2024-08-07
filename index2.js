// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://deepanshumaik:malik123@cluster0.h0gcnnu.mongodb.net/usersignuplogin"
//   )
//   .then(() => console.log("Connected to MongoDB!"))
//   .catch((err) => console.error("Connection error", err));

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Signup Route
// app.post("/signup", async (req, res) => {
//   const { username, password, email } = req.body;
//   const user = new User({ username, password, email });

//   try {
//     await user.save();
//     res.send({ message: "User created successfully" });
//   } catch (err) {
//     if (err.code) {
//       res.send({ message: "Username or email already exists" });
//     } else {
//       res.send({ message: "Error creating user" });
//     }
//   }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user || user.password !== password) {
//     return res.send({ message: "Invalid username or password" });
//   }
//   res.send({ message: "User logged in successfully" });
// });

// // Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
