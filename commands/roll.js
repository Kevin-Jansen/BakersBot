const Discord = require("discord.js");

const endShowdown = (client, message) => {
  client.showdown.isActive = false;
  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
  clearTimeout(client.showdown.timeout);

  if (client.showdown.participants.length === 0) {
    let embed = message.embeds[0];
    embed.fields.push({
      "name": "No one rolled on this item",
      "value": `It was shit anyways.`,
    });
    return message.edit({embed: embed});
  }
  ;

  let winner = null;
  for (let participant of client.showdown.participants) {
    if (winner === null) winner = participant;
    if (participant.roll > winner.roll) winner = participant;
  }

  let embed = message.embeds[0];
  embed.fields.push({
    "name": "Our winner winner chicken dinner is",
    "value": `**${winner.user}** with a roll of **${winner.roll}**`,
  });

  message.edit({embed: embed});
  client.showdown = null;
}

module.exports = {
  name: "roll",
  description:
    "Loot-roller. Just use .roll itemName to start a 30 second loot war. React with ✅ to join the loot war.",
  guildOnly: true,
  async execute(client, message, args) {
    // Escape statements for invalid arguments
    if (args.length === 0 && client.showdown) return message.reply('Hey we changed how you roll for gear, just tap ✅ to enter otherwise I\'ll just ignore you')
    if (args.length === 0) return message.reply('Oi! You forgot to give me an item name, shame on you...')
    if (client.showdown && client.showdown.isActive) return message.reply(`One loot showdown at a time you keen bean! We're currently showdowning for ***${client.showdown.item}***`).then(msg => {
      msg.delete({timeout: 5000})
    });

    const item = args.toString().replace(/,/g, ' ');
    const issuer = await message.guild.member(message.author);

    client.showdown = null
    client.showdown = {
      item: item,
      issuer: issuer.nickname ? issuer.nickname : issuer.user.username,
      messageId: null,
      isActive: true,
      participants: [],
    }

    const embed = {
      "title": `Rolling for *${item}*`,
      "description": "Get yer rolls in you cheeky buggers and may the odds be ever in your favor.",
      "color": 13625642,
      "timestamp": new Date(),
      "author": {
        "name": "The Master Bakers Patented Loot War Roller™️",
        "icon_url": "https://cdn.discordapp.com/icons/733739130156220556/a_835c788d749b465248280d44e2c72482.png?size=128"
      },
      "footer": {
        "icon_url": message.author.displayAvatarURL(),
        "text": `Issued by ${issuer.nickname ? issuer.nickname : issuer.user.username}`
      },
      "fields": [
        {
          "name": "Active looter shooters",
          "value": "none",
        }
      ]
    };

    let rollMessage = await message.channel.send({embed: embed});
    client.showdown.messageId = rollMessage.id;

    client.showdown.timeout = setTimeout(() => {
      if (client.showdown.isActive) return endShowdown(client, rollMessage);
    }, 30050)

    await rollMessage.react("✅");
    await rollMessage.react("❌");

    if (client.showdownWatcher) return;
    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot || !reaction.message.guild) return;
      if (!client.showdown.isActive) return;

      client.showdownWatcher = true;

      if (reaction.message.id === client.showdown.messageId) {
        if (reaction.emoji.name === "✅") {
          const issuer = await reaction.message.guild.members.cache.get(user.id);

          const rollUser = client.showdown.participants.filter((r) => r.user === (issuer.nickname ? issuer.nickname : issuer.user.username));
          if (rollUser.length > 0) {
            return reaction.message.channel.send(`<@${issuer.id}> Oi you cheeky booger! Only one roll per item! Dems the rulez of a showdown!`).then(msg => {
              msg.delete({timeout: 5000})
            })
          }

          let participant = {
            user: issuer.nickname ? issuer.nickname : issuer.user.username,
            roll: Math.floor(Math.random() * 101),
          }
          client.showdown.participants.push(participant)

          let embed = reaction.message.embeds[0];
          if (embed.fields[0].value !== "none") embed.fields[0].value = `${embed.fields[0].value}\n${issuer.nickname ? issuer.nickname : issuer.user.username}`
          if (embed.fields[0].value === "none") embed.fields[0].value = issuer.nickname ? issuer.nickname : issuer.user.username;

          reaction.message.edit({embed: embed});
        }
        if (reaction.emoji.name === "❌") {
          const issuer = await reaction.message.guild.members.cache.get(user.id);

          console.log(issuer.nickname ? issuer.nickname : issuer.user.username);
          console.log(client.showdown.issuer);

          if (issuer.nickname ? issuer.nickname : issuer.user.username !== client.showdown.issuer) {
            // Just to validate emojis starting in the name
            if ((issuer.nickname ? issuer.nickname : issuer.user.username).slice(2) !== client.showdown.issuer.slice(2)) {
              return reaction.message.channel.send(`<@${issuer.id}> Ey! No tempering with dem looter roller showdown, cheeky booger! Only the showdown issuer may stop me from ruining your day!`).then(msg => {
                msg.delete({timeout: 5000})
              })
            }
          }

          endShowdown(client, reaction.message)
        }
      }
    });
  }
};