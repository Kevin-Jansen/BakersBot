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

        const embed = {
            "title": setup,
            "description": punchline,
            "color": 13625642,
            "timestamp": new Date(),
            "author": {
                "name": "The Master Bakers Patented Dad-Joke Teller™️",
                "icon_url": "https://cdn.discordapp.com/icons/733739130156220556/a_835c788d749b465248280d44e2c72482.png?size=128"
            },
            "footer": {
                "icon_url": message.author.displayAvatarURL(),
                "text": `gg ez`
            },
        };

        await message.channel.send({embed: embed});
    }
}