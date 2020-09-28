// Require the discord.js module
const Discord = require('discord.js');

// Construct a new Discord Client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready');
})

// login to Discord with your app's token
client.login('NzYwMTE5MTk0NjQwOTczODI0.X3HaKg.T8W_lJs2oNUFV7jxXcjIB6H34-4');