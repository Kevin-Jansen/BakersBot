const CronJob = require('cron').CronJob;

let totalMessageSize = 0;
const fetchMessages = (channel) => {
  return channel.messages.fetch({limit: 1}).then(messages => {
    return messages
  });
}

const purge = async (channel) => {
  const messages = await fetchMessages(channel);

  // Condition to break from the funciton
  if (messages.size === 0) {
    return true;
  }

  totalMessageSize += messages.size;
  await channel.bulkDelete(messages)
  await purge(channel);
}

module.exports = {
  execute(client) {
    // 0 0 19 * * 0
    let job = new CronJob('0 0 19 * * 0', async () => {
      const cache = client.channels.cache;
      const channel = cache.find((c) => c.name.slice(2) === "request-or-lfg");

      // Initiate the purge
      await purge(channel);

      // Send feedback of the purge
      channel.send(`Messages have been purged, in total I removed ${totalMessageSize} messages.`).then(() => {
        totalMessageSize = 0;
      });
    }, null, true, 'Europe/Amsterdam');
    job.start();
  }
}