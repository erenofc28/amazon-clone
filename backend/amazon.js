const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const addProdcut = require("./addProducts");
const stripe = require("stripe")(
  "sk_test_51PCYrfSEYyqAMtmgXoXORL1vEbg9vxxDlrlyxgvVnKHeZAfz3kBO7YiDbPFT9YDSCsicmwgyFz2QLYd5oSfRhP1e00ZyjXbWQ8"
);
const usersModel = require("./usersModel");
const cartModel = require("./cartModel");
const orderModel = require("./orderModel");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rcdanteff:dhinesh509509@cluster0.ogxjaoh.mongodb.net/amazon-clone?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 3000;

// app.use('/',(req,res)=>{
//     res.status(200).send("hii broo")
// })

app.post("/addProducts/", (req, res) => {
  const item = req.body;
  addProdcut.create(item);
  console.log(item);
  res
    .status(201)
    .json({ item })
    .then(() => {
      console.log("item successfully added to mongo db", item);
    })
    .catch((err) => {
      alert("ERROR ! ", err);
    });
});



app.get("/", async (req, res) => {
  try {
    const value = await addProdcut.find();
    res.status(201).json(value);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/checkout/address/payment", async (req, res) => {
  const total = req.body.amount;
  // console.log("total",total)

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

app.post("/signUp", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;
  const orders = req.body.orders;
  const cart = req.body.cart;
  const addProducts = req.body.add_product;

  const user = await usersModel.create({
    name: name,
    email: email,
    password: pass,
    orders: orders,
    cart: cart,
    addProducts: addProducts,
  });

  res.status(201).send({ user });
});

app.get("/signUp", async (req, res) => {
  const data = await usersModel.find();
  res.status(201).json({ data });
});

// app.post('/addCart/:id',async(req,res)=>{

//   const id = req.params.id;
//   const {cart} = req.body;

//   const spec = usersModel.findByIdAndUpdate(id)

//   const user = await spec.create({

//     cart:cart

//     });

//     res.status(201).send({user})

//   })

app.put('/orders/:id',async(req,res)=>{
  try {  
  const id = req.params.id;
  const payment = req.body.payment
  const updated = await orderModel.findByIdAndUpdate(id,{payment},{new:true});
  if (!updated) {
      return res.status(404).json({message:"not found"})
  } else {
      return res.json(updated)
  }
      
  } catch (error) {
      console.log(error)
      res.status(500).json({error})
  }


})

app.post("/addCart/", async (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;

  const cart = await cartModel.create({
    email: email,
    title: title,
    image: image,
    price: price,
  });

  res.status(201).send({ cart });
});

app.post("/orders/", async (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  const products = req.body.products;
  const payment = req.body.payment;
  const price = req.body.price;

  const cart = await orderModel.create({
    price: price,
    products: products,
    payment: payment,
    email: email,
    address: address,
  });

  res.status(201).send({ cart });
});

app.delete("/addCart/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await cartModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


app.delete("/addProducts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await addProdcut.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


app.get("/addCart/", async (req, res) => {
  const data = await cartModel.find();
  res.status(201).json({ data });
});

app.get("/orders/", async (req, res) => {
  const data = await orderModel.find();
  res.status(201).json({ data });
});
app.get("/addProducts/", async (req, res) => {
  const data = await addProdcut.find();
  res.status(201).json({ data });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
