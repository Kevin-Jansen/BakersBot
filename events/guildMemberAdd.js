module.exports = (client, member) => {
    console.log('New member')

    //guild variables
    const guild = member.guild;

    //member variables
    const owner = guild.owner

    // channels
    const cache = guild.channels.cache;
    const event = cache.find(c => c.name.slice(2) === 'event-signup');
    const vote = cache.find(c => c.name.slice(2) === 'event-votes');
    const ranks = cache.find(c => c.name.slice(2) === 'trial-ranks');

    owner.send("Someone has joined, copy pasta the following and and welcome them!")
    owner.send(`Welcome ${member}! As a starter, I suggest you check out our ${event} and ${vote}. If you're into trials, check out ${ranks}. Hope you enjoy your stay here and let us know if you have questions :)`)
};