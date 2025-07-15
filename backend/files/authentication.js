//* Declare all the classes and modules
const express= require('express');
const users= require('../data/users.json');
const cors=require('cors');
const app = express();
const router = express.Router();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken,authorizeRoles }=require("../middleware/authMiddleware.js")
app.use(express.json());
const User= require('../schemas/User.js');
//*Add Data in Mongodb
   const addDataToMongodb = async() => {
    await User.deleteMany();
    const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      hasheduserpassword: await bcrypt.hash(user.password, 10)
    }))
  );
    await User.insertMany(hashedUsers);
}
addDataToMongodb();
//* Setup Different HTTPS methods
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password, hasheduserpassword:hashedPassword, role: 'user' }); 
  await user.save();
  return res.json({ message: 'User registered', user: { username: user.username, role: user.role } });
})
router.post("/login",async(req,res)=>{
    const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'User not found' });
  const isMatch = await bcrypt.compare(password, user.hasheduserpassword);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, username: user.username, role: user.role });
});
router.post('/forget',async(req,res)=>{
    const { username,password } = req.body;
    const person=await User.findOne({username})
  if (!person) return res.status(400).json({ error: 'User not found' });
  const newpassword=await bcrypt.hash(password,10);
  person.password=password
  person.hasheduserpassword=newpassword
  await person.save()
  res.json({ message: 'Password Updated Successfully' });
})
router.get("/admin", authenticateToken, authorizeRoles("admin"),async(req,res)=>{
  const datauser= await User.find();
  res.json(datauser)
})

module.exports = router;