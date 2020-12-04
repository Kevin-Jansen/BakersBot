// Require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');

// Require discord token
const config = require('./config.json');

// Construct a new Discord Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Discover what command files exists in the filesystem
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Map through the array of filenames
commandFiles.map(commandFile => {
    // Require the command from the filesystem
    const command = require(`./commands/${commandFile}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
});

// command based features (dynamically injected from ./commands)
client.on("message", (message) => {
    // if a message is sent
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;
    // Seeks command
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Verify that the command has been loaded into the commands collection
    if (!client.commands.has(commandName)) return message.reply('That command does not exists!');
    const command = client.commands.get(commandName);

    try {
        command.execute(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply('Whoopsydoopsie! Something went wrong executing that command!');
    }
});

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
    console.log('Ready');
});

// login to Discord with your app's token
client.login(config.token);