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
    if(message.author.bot || !message.content.startsWith(config.prefix))return;
    
    const kekw = client.emojis.cache.find(emoji => emoji.name === "kekw");

    // Seeks command
    const amount = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = amount.shift().toLowerCase();
    
    //admin privelage commands below only
    if (!message.member.roles.cache.find(r => (r.name === 'Head Glazer' || r.name === 'Master Baker'))) return message.channel.send(`You don't have enough permissions for that sorry!`);

    // Purge Command
    if(command === 'purge') {    
        const amountInt = parseInt(amount[0])
        // Command errors
        if(isNaN(amountInt))return message.channel.send(`That's not a vaild number silly! ${kekw}`);
        if(amountInt >= 100)return message.channel.send(`That's too many silly! Try a number below 100... ${kekw}`);

        // Purge process
        message.channel.messages.fetch({ limit: amountInt }).then(messages => { 
            message.channel.bulkDelete(messages)
            message.channel.send(` I've cleared ${messages.size} messages! Don't worry I'll clear this one too :)`).then(msg => {msg.delete({timeout: 5000})})
        });

    }
})

// login to Discord with your app's token
client.login(config.token);