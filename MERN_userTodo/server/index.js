const dotenv = require('dotenv');
const Joi = require('joi');
const express = require('express');
var cors = require('cors')
const conn = require('./db/conn')
const app = express();
const User = require('./models/userSchema');
dotenv.config({ path: './config.env' });
const PORT = (process.env.PORT || 5000);
const { request } = require('express');
const multer  = require('multer')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Todo = require('./models/todoDetailsSchema');
const UserRegistation = require('./models/userRegistation');

app.use(express.json());
app.use(cors())


const schema = Joi.object({
  fullName: Joi.string().required(),
  emailId: Joi.string().email().required(),
  phoneNo: Joi.string().length(10).pattern(/^\d+$/).required(),
  password: Joi.string().pattern(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{6,30}$/).required(),
  cPassword: Joi.string().pattern(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{6,30}$/).required(),
});

const generateToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

app.post('/register', async (req, res) => {
  const { fullName, emailId, phoneNo, password, cPassword } = req.body;
  if (password !== cPassword) {
    return res.status(400).send({ error: 'Passwords do not match.' });
  }

  try {
    const userdata = await User.findOne({ emailId });

    if (userdata) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      emailId,
      phoneNo,
      password: hashedPassword,
    });

    await user.save();
    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ error: 'An error occurred during registration.' });
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
try{
  const user = await User.findOne({ emailId });

  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).send('Invalid email or password');
  }

  const token = await generateToken(user);
  res.send({ user, token });
}catch(err){
console.log("🚀 ~ file: index.js:71 ~ app.post ~ err:", err)

}
});



app.get('/get-users', async (req, res) => {

  const productData = await User.aggregate([
    { $sort : { name : 1 } },
  ]);
  if (productData.length) {
    res.send(productData)
  } else {
    res.send('Product Not Found')
  }
});


app.delete('/delete-user/:emailId', async (req, res) => {
  const { emailId } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ emailId });

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully.', user: deletedUser });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'An error occurred during user deletion.' });
  }
});

app.post('/daily-task-detail', async (req, res) => {
  try {
    const { startDate, endDate, desc, status } = req.body;

    if (!startDate || !endDate || !desc || !status) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new todo item
    const newTodo = new Todo({
      startDate,
      endDate,
      desc,
      status,
    });

    // Save the todo item to the database
    await newTodo.save();

    // Send the new todo item as a response
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error during todo creation:', error);
    res.status(500).json({ error: 'An error occurred during todo creation.' });
  }
});
app.get('/daily-todo-detail', async (req, res) => {

try{
  const todoData = await Todo.find();
  if (todoData.length) {
    res.send(todoData)
  } else {
    res.send('Product Not Found')
  }
}catch(err){
console.log("🚀 ~ file: index.js:161 ~ app.get ~ err:", err)

}
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})