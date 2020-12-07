module.exports = (client, member) => {
    console.log('New member')

    //guild variables
    const guild = member.guild;

    //member variables
    const owner = guild.owner

    const kevin = member.guild.members.cache.get('253176948128350208')

    // channels
    const cache = guild.channels.cache;
    const event = cache.find(c => c.name.slice(2) === 'event-signup');
    const vote = cache.get('736625344294944898');
    const ranks = cache.get('735601656330190908');

    kevin.send("Someone has joined, copy pasta the following and and welcome them!")
    kevin.send(`Welcome ${member}! As a starter, I suggest you check out our ${event} and ${vote}. If you're into trials, check out ${ranks}. Hope you enjoy your stay here and let us know if you have questions :)`)
};