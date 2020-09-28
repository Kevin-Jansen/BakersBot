// Require the discord.js module
const Discord = require('discord.js');

// Require discord token
const config = require ('./config.json');

// Construct a new Discord Client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready');
})

// if a message is sent, creep on non bots
client.on("message", (message) => { 
    if(message.author.bot)return;
    message.channel.send(`${message.author.username} I'm watching you...`);
})

// login to Discord with your app's token
client.login(config.token);