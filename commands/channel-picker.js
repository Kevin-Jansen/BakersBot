module.exports = {
  name: "channel-picker",
  description:
    "The initiator for the channel picker. Discord Baker only.",
  guildOnly: true,
  hidden: true,
  async execute(client, message, args) {
    const channel = message.channel;
    const {role_channel} = require('../config.json');

    if (channel.id !== role_channel) return message.reply("Oi! This is only intended to be used by admins.");
    if (!message.member.roles.cache.find(r => (r.name === 'Head Glazer' || r.name === 'Master Baker'))) return message.reply(`Oi! This is only intended to be used by admins.`);

    const emojis = [
      {icon: '📰', role: 'no-news', text: ' **ESO News:** ESO server status, pledges, patch notes, weekly vendor, etc'},
      {icon: '⚔️', role: 'no-dd', text: ' **DD academy:** Any DD related discussions.'},
      {icon: '🛡️', role: 'no-tank', text: ' **Tank academy:** Any tanking related discussions.'},
      {icon: '🚑', role: 'no-healer', text: ' **Healer academy:** Any healer related discussions.'},
      {icon: '🤺', role: 'no-pvp', text: ' **Bakers PvP:** Any PvP discussions.'},
      {icon: '🏡', role: 'no-cribs', text: ' **Housing:** Show off your houses + house related discussions.'},
      {icon: '🤖', role: 'no-bot', text: ' **Bot:** Control our Discord Bots including the music bots.'},
    ];

    let picker = `There are dozens of channels in this server and by default, you will be able to see them all. However, we understand that some channels may not be relevant for you and so, you can choose which channels you want to opt out from.\n\n*By ticking an emoji below you will opt-out of the channel and won’t see it on your end anymore. Tick it again to opt back in.*\n\n`;

    emojis.map(emoji => {
      picker += `${emoji.icon} ${emoji.text}\n`;
    });

    await channel.send(picker)
      .then(async m => {
        emojis.map(emoji => m.react(emoji.icon))
      });

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot || !reaction.message.guild) return;

      if (reaction.message.channel.id === role_channel) {
        const {role} = emojis.filter(emoji => emoji.icon === reaction.emoji.name)[0];
        await reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(r => (r.name === role)));
      }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot || !reaction.message.guild) return;

      if (reaction.message.channel.id === role_channel) {
        const {role} = emojis.filter(emoji => emoji.icon === reaction.emoji.name)[0];
        await reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(r => (r.name === role)));
      }
    });
  },
};