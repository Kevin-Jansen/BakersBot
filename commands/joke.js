const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
    name: 'joke',
    description: 'Tells you a funny joke. Usage: `.joke`',
    guildOnly: true,
    async execute(client, message, args) {
        const {setup, punchline} = await fetch('https://official-joke-api.appspot.com/jokes/random')
            .then(response => response.json())
            .catch(console.error);

        const embed = new Discord.MessageEmbed();
        embed.setTitle(setup);
        embed.setDescription(punchline);

        await message.channel.send(embed);
    }
}