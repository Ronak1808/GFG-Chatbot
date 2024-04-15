const mongoose = require('mongoose');

  
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
});
const ClientSchema = new mongoose.Schema({
    message: { type: String, required: true },
});
const ServerSchema = new mongoose.Schema({
    message: { type: String, required: true },
});
const UnansSchema = new mongoose.Schema({
    message: { type: String, required: true },
});

const Client = mongoose.model('Client', ClientSchema);
const Server = mongoose.model('Server', ServerSchema);
const User = mongoose.model('User', UserSchema);
const Unans = mongoose.model('Unans', UnansSchema);

module.exports = {User, Client, Server, Unans};