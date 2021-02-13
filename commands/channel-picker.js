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

    const picker = `We provide a lot of text channels for you to explore, in order to keep it clean we serve channels on a opt-in basis. 

*By ticking an emoji below you will opt-in to the category you wish to see. Tick it again to opt-out.*

📰  **ESO News:** Live status, pledges, patch notes, weekly stuff.
🏫  **Bakers Academy:** DD and Healer discussions.
⚔️ **Bakers PvP:** PvP discussions.
💰  **Crafting & Trading:** The place where crafting and trading requests can be found.
🏡  **Housing:** Show your bakers crib.
🕹️  **Off topic:** Anything off topic such as gaming, memes and pet or food pics.
🤖  **Bot:** Control our Discord Bots.`;

    const emojis = [{icon: '📰', role: 'news'}, {icon: '🏫', role: 'academy'}, {icon: '⚔️', role: 'pvp'}, {icon: '💰', role: 'crafting'}, {icon: '🏡', role: 'housing'}, {icon: '🕹️', role: 'off-topic'}, {icon: '🤖', role: 'bot-control'}];
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