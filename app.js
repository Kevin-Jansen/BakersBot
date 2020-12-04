// Require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');

// Require discord token
const config = require('./config.json');

// Construct a new Discord Client
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.prefix = config.prefix;

// Discover what command files exists in the filesystem
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Map through the array of filenames
commandFiles.map(commandFile => {
    // Require the command from the filesystem
    const command = require(`./commands/${commandFile}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    console.log(`Loading ${command.name} command.`)
    client.commands.set(command.name, command);
});
console.log('All commands have been loaded')

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
eventFiles.map(eventFile => {
    const event = require(`./events/${eventFile}`);

    let eventName = eventFile.split('.')[0]
    console.log(`Watching for ${eventName} event.`)
    client.on(eventName, event.bind(null, client));
})

console.log('All event are being watched.')

// Automated features
client.on("guildMemberAdd", member => {

    console.log('New member')

    //guild variables
    const guild = member.guild;

    //member variables
    const owner = guild.owner
    const kevin = client.users.cache.get('253176948128350208')

    // channels
    const cache = guild.channels.cache;
    const event = cache.find(c => c.name.slice(2) === 'event-signup');
    const vote = cache.get('736625344294944898');
    const ranks = cache.get('735601656330190908');

    kevin.send("Someone has joined, copy pasta the following and and welcome them!")
    kevin.send(`Welcome ${member}! As a starter, I suggest you check out our ${event} and ${vote}. If you're into trials, check out ${ranks}. Hope you enjoy your stay here and let us know if you have questions :)`)
})

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Bakers Bot is ready to Rock & Roll!');
});

// login to Discord with your app's token
client.login(config.token);