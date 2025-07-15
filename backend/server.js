const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./files/authentication.js');
const shopRoutes=require("./files/shopping.js")
const cors=require('cors');
const app = express();
const  connectDB = require('./db/config.js');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());
app.use(userRoutes);
app.use(shopRoutes);
connectDB();
const PORT = 8000;
app.get("/", (req, res) => {
  res.send(`
    <body style="background: #f9fafb; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div style="text-align: center;">
        <h1 style="color: #10b981; font-size: 3rem;">✨ Welcome to the Backend! ✨</h1>
        <p style="font-size: 1.25rem; color: #6b7280;">Your API is ready to serve 🚀</p>
      </div>
    </body>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});