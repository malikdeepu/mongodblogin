const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://deepanshumaik:malik123@cluster0.h0gcnnu.mongodb.net/usersignuplogin"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  purchasedProducts: [
    {
      productid: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
});

const productSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existUser = await User.findOne({ username, email });
  if (existUser) {
    return res.json({ message: "Username or email already exist" });
  } else {
    const user = new User({ username, email, password });
    await user.save();
  }
  res.json({
    message: "User Created Successfully",
    username,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const logon = await User.findOne({ email, password });
  if (logon) {
    res.json({
      message: "Login Successfully",
    });
  } else {
    res.json({
      message: "Invalid email or password",
    });
  }
});

app.post("/addproduct", async (req, res) => {
  const { productid, title, price } = req.body;

  const existProduct = await Product.findOne({ productid });
  if (existProduct) {
    res.send({
      message: "Product already added",
    });
  } else {
    const product = new Product({ productid, title, price });
    await product.save();
    res.json({
      message: "Product added successfully",
      productid,
    });
  }
});

app.post("/peruserpurchaseproduct", async (req, res) => {
  const { email, password, productid } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({
      message: "User Not found",
    });
  }

  const product = await Product.findOne({ productid });
  if (product) {
    user.purchasedProducts.push(product);
    await user.save();
    return res.json({
      message: "Purchased Successfully",
      product,
    });
  } else {
    return res.send({
      message: "Wrong ProductId or Email",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
