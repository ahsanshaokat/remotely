const express = require('express');
const { userMiddleware } = require('../middlewares');
const { deleteUser, updatePerson, 
    getPerson, createProfileSkill, getProfileSkills, deleteProfileSkill, getUsers} = require('../controllers/user.controller');

const app = express.Router();

app.get('/all', getUsers);
app.delete('/:_id', userMiddleware, deleteUser);
app.post('/profile/skill', createProfileSkill);
app.get('/profile/skills/:_id', getProfileSkills);
app.delete('/profile/skill/:_id', deleteProfileSkill);
app.patch('/profile/:_id', updatePerson);
app.get('/profile/:_id', getPerson);


module.exports = app;