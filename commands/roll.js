const Discord = require("discord.js");

module.exports = {
    name: "roll",
    description:
        "Loot-roller. Just use .roll itemName to start a 30 second loot war.",
    guildOnly: true,
    execute(client, message, args) {
        if (args.length > 0) {
            if (client.showdown)
                return message.reply(
                    `One loot showdown at a time you keen bean! We're currently showdowning for ${client.showdown.item}`
                );

            const item = `${args}`.replace(/,/g, " ");

            // initiate the showdown showdown! Yeehaw
            client.showdown = {
                item: item,
                rolls: [],
            };

            // Create the Leaderboard
            const embed = new Discord.MessageEmbed();
            embed.setTitle(client.showdown.item);
            embed.setDescription("");
            message.channel.send(embed);

            // 30 second competition
            setTimeout(() => {
                let winner = null;
                for (let roll of client.showdown.rolls) {
                    if (winner === null) winner = roll;
                    if (roll.roll > winner.roll) winner = roll;
                }
                const embed = new Discord.MessageEmbed();
                embed.setTitle(
                    `${winner.name} is the winner with a roll of ${winner.roll}!`
                );
                embed.setDescription(`Enjoy your ${client.showdown.item}!`);
                message.channel.send(embed);
            }, 30000);
        } else {
            if (client.showdown === null && args.length == 0)
                return message.reply("No active rolls");
            const user = client.showdown.rolls.filter(
                (r) => r.name == message.author.username
            );
            if (user.length)
                return message.reply(
                    "Oi you cheeky booger! Only one roll per item! Dems the rulez of a showdown!"
                );

            // throw the dice
            diceRoll = Math.floor(Math.random() * 101);

            // add to the array
            client.showdown.rolls.push({
                name: message.author.username,
                roll: diceRoll,
            });

            // tell them what they rolled
            message.reply(`You rolled ${diceRoll}`);

            // update the leaderboard table
            const embed = new Discord.MessageEmbed();
            embed.setTitle(client.showdown.item);
            let scores = "";
            for (const individual of client.showdown.rolls) {
                scores += `${individual.name}: ${individual.roll}\n`;
            }
            embed.setDescription(scores);
            message.channel.send(embed);
        }
    },
};
