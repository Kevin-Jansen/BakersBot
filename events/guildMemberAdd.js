module.exports = (client, member) => {
	console.log("New member");

	//guild variables
	const guild = member.guild;

	//member variables
	const owner = guild.owner;

	// channels
	const cache = guild.channels.cache;
	const about = cache.find((c) => c.name.slice(2) === "about-us");
	const event = cache.find((c) => c.name.slice(2) === "event-signup");
	const vote = cache.find((c) => c.name.slice(2) === "event-votes");
	const ranks = cache.find((c) => c.name.slice(2) === "trial-ranks");

	owner.send(
		"Someone has joined, copy pasta the following and and welcome them!"
	);
	owner.send(
		`Welcome ${member}! As a starter, have a look at the ${about}, ${event} and ${vote} if you want to participate in our events and voice what events we should do next week. If you're into trials, check out the ${ranks} channel. Hope you'll enjoy your stay here and let us know if you want an invite to the in game guild in case you're not there already.`
	);
};
