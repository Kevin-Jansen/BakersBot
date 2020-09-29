module.exports = {
    name: 'purge',
    description: 'Purges the given amount of messages in a channel. Usage: `.purge {amount}`',
    execute(client, message, args) {
        //admin privelage commands below only
        if (!message.member.roles.cache.find(r => (r.name === 'Head Glazer' || r.name === 'Master Baker'))) return message.reply(`You don't have enough permissions for that sorry!`);

        // Purge Command
        const kekw = client.emojis.cache.find(emoji => emoji.name === "kekw");
        const amountInt = parseInt(args[0])

        // Command errors
        if (isNaN(amountInt)) return message.reply(`That's not a vaild number silly! ${kekw}`);
        if (amountInt >= 100) return message.reply(`That's too many silly! Try a number below 100... ${kekw}`);

        // Purge process
        message.channel.messages.fetch({limit: amountInt}).then(messages => {
            message.channel.bulkDelete(messages)
            message.channel.send(` I've cleared ${messages.size} messages! Don't worry I'll clear this one too :)`).then(msg => {
                msg.delete({timeout: 5000})
            })
        });
    }
}