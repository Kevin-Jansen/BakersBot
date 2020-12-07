module.exports = (client, message) => {
    // if a message is sent
    if (message.author.bot || !message.content.startsWith(client.prefix)) return;
    // Seeks command
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Verify that the command has been loaded into the commands collection
    if (!client.commands.has(commandName)) return message.reply('That command does not exists!');
    const command = client.commands.get(commandName);

    // Conditions for a command to be executed
    if (command.guildOnly && message.channel.type === 'dm') return message.reply('I can\'t execute that command inside DMs!');
    if (command.args && args.length < 1) {
        let response = `You didn't specify any arguments, and I need those you silly!`

        if (command.usage) response += `\nThe proper usage would be: \`${client.prefix}${command.name} ${command.usage}\``

        return message.reply(response)
    }

    try {
        command.execute(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply('Whoopsydoopsie! Something went wrong executing that command!');
    }
};