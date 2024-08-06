const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://deepanshumaik:malik123@cluster0.h0gcnnu.mongodb.net/usersignuplogin"
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection error", err));

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  purchasedproducts: [{ type: String }],
});

const productSchema = new mongoose.Schema({
  proid: String,

  product: String,
  rate: String,
  details: String,
  review: String,
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  try {
    await user.save();
    console.log("User created:", user);
    res.send({
      message: "User created successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    if  {
      res.send({ message: "Username or email already exists" });
    } else {
      res.send({ message: "Error creating user" });
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.send({ message: "Invalid username or password" });
    }

    console.log("User logged in:", user);
    res.send({
      message: "User logged in successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    res.send({ message: "Error logging in" });
  }
});

app.post("/products", async (req, res) => {
  const { proid, product, rate, details, review } = req.body;
  const newProduct = new Product({
    proid,
    product,
    rate,
    details,
    review,
  });

  try {
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    res.send({ message: "Error adding product" });
  }
});

app.post("/peruserpurchased", async (req, res) => {
  const { username, password, proid } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.send({ message: "Login failed" });
    }

    const product = await Product.findOne({ proid });
    if (!product) {
      return res.send({ message: "Product not found" });
    }

    user.purchasedproducts.push(product._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.send({ message: "Error adding purchased product" });
  }
});

const PORT = process.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
