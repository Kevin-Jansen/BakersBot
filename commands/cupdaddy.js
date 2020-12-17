const Discord = require("discord.js");

module.exports = {
	name: "cupdaddy",
	description: "A toolkit to both help and be helped by cupdaddy",
	guildOnly: true,
	execute(client, message, args) {
		const file = new Discord.MessageAttachment("./assets/cupdaddy.png");
		const file2 = new Discord.MessageAttachment("./assets/purgedaddy.png");

		if (args == "inspire") {
			let embed = {
				title:
					"The inspiration we all needed. Especially Cup! (ง︡'-'︠)ง",
				image: {
					url: "attachment://cupdaddy.png",
				},
			};

			message.channel.send({ files: [file], embed: embed });
		} else if (args == "purge") {
			let embed = {
				title: "When you're debuffed up... What should you shout?",
				image: {
					url: "attachment://purgedaddy.png",
				},
			};

			message.channel.send({ files: [file2], embed: embed });
		} else {
			return message.reply(
				"To use this command correctly - use .cupdaddy {argument}. Here are the arguments: - inspire"
			);
		}
	},
};
