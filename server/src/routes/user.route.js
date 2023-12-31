const express = require('express');
const { userMiddleware } = require('../middlewares');
const { deleteUser, updatePerson, getPerson } = require('../controllers/user.controller');

const app = express.Router();

app.delete('/:_id', userMiddleware, deleteUser);
app.patch('/profile/:_id', updatePerson);
app.get('/profile/:_id', getPerson);


module.exports = app;