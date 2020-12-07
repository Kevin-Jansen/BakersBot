module.exports = {
    name: 'ping',
    description: 'Just a funny ping pong match. Usage: `.ping`',
    guildOnly: true,
    execute(client, message, args) {
        message.reply('Pong!');
    }
}