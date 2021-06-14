// Require the discord.js module
const Discord = require("discord.js");
const fs = require("fs");

// Require discord token
const config = require("./config.json");

// Construct a new Discord Client
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();
client.prefix = config.prefix;
client.showdown = null;

// Discover what command files exists in the filesystem
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
// Map through the array of filenames
commandFiles.map((commandFile) => {
  // Require the command from the filesystem
  const command = require(`./commands/${commandFile}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  console.log(`Loading ${command.name} command.`);
  client.commands.set(command.name, command);
});
console.log("All commands have been loaded");

// Discover what event files exists in the filesystem
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
// Map through the array of filenames
eventFiles.map((eventFile) => {
  // Require the event from the filesystem
  const event = require(`./events/${eventFile}`);

  // Get the event name & bind the event to a client event
  let eventName = eventFile.split(".")[0];
  console.log(`Watching for ${eventName} event.`);
  client.on(eventName, event.bind(null, client));
});

console.log("All event are being watched.");

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Bakers Bot is ready to Rock & Roll!");

  client.user.setActivity('Baking Cupcakes', {
    status: 'online',
    type: 'WATCHING'
  })

  // Notify the server that the bot is back online if app is in production mode
  if (config.environment === 'production') {
    const notify = client.channels.cache.get(config.notify_channel);
    notify.send("I'm back online.");
  }

  // Boot up all cron jobs after the client is initiated
  const jobFiles = fs.readdirSync("./jobs")
    .filter((file) => file.endsWith(".js"))
    .map(jobFile => {
      require(`./jobs/${jobFile}`).execute(client);
    })

  console.log("CronJobs are booted up.");
});

// login to Discord with your app's token
client.login(config.token);