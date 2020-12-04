module.exports = (client, message) => {
    // if a message is sent
    if (message.author.bot || !message.content.startsWith(client.prefix)) return;
    // Seeks command
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
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
};