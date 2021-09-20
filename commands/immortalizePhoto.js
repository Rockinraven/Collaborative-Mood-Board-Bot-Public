module.exports = {
	name: 'immortalizePhoto',
	description: 'Moves approved messages into the gallery to immortalize them.',
	async execute(reaction, user, Discord, client, reactMsg) {
    const Database = require("@replit/database")
    const db = new Database(process.env.REPLIT_DB_URL)
    const channel = reaction.message.channel;					//inspo-vote channel
    const botChannel = '870340155951697951';
		const yesEmoji = '✅';
		const arrowRightEmoji = '➡️';
    const noEmoji = '❌';
    const errorEmoji = '❗';
		const galleryChannel = '870364191951822938';
		var inputCounter = 0;

		if (reactMsg.reactions.cache.find(reaction => reaction.emoji.name === arrowRightEmoji).count <= 1) {	//only if it hasn't been moved already.
			reactMsg.reactions.cache.get(arrowRightEmoji).remove().catch(error => client.channels.cache.get(botChannel).send(`<@!473214825833431051> Failed to remove arrow reactions: ${error.message}`)); //remove everyone's reactions to the arrow 

      channel.send("Hm, seems like that one has already been moved into the gallery. Try re-uploading, or contact <@!473214825833431051> if I did something wrong.");

		} else {
      move_to_gallery(Discord, client, reactMsg, user, galleryChannel);
      
      //remove everyone's reactions to the arrow
      reactMsg.reactions.cache.get(arrowRightEmoji).remove().catch(error => client.channels.cache.get(botChannel).send(`<@!473214825833431051> Failed to remove reactions: ${error.message}`)); 
		}

    function move_to_gallery(Discord, client, reactMsg, user, galleryChannel) {
			// console.log(reactMsg.user);
			reactMsg.attachments.forEach(async (attachment) => {
			if (reactMsg.author.bot) return;
			let img = attachment;
      try {
        getUser(reactMsg.author.id);
        const msg = await client.channels.cache.get(galleryChannel)
        .send(`Immortalized image sent by ${sentBy}`, img)
        reactMsg.react(yesEmoji);
        reactMsg.reactions.cache.get(noEmoji).remove()
          .catch(error => client.channels.cache.get(botChannel)
            .send(`<@!473214825833431051> Failed to remove checkmark reactions: ${error.message}`)
          );
        //send confirmation in bot logs
        client.channels.cache.get(botChannel).send('Image approved! Adding to <#836782874287669268>.').catch(error => client.channels.cache.get(botChannel).send(`<@!473214825833431051> Failed to comfirm immortalization: ${error.message}`));
      } catch (err) {
        reactMsg.reactions.cache.get(noEmoji).remove()
        reactMsg.react(errorEmoji);
        client.channels.cache.get(botChannel)
          .send(`<@!473214825833431051> Failed to immortalize image: ${err.message}`)
          //'<@!473214825833431051> Failed to immortalize image: ',
      }
      // .catch(error =>
      //   client.channels.cache.get(botChannel)
      //     .send('<@!473214825833431051> Failed to immortalize image: ', error)
      //if it didnt work then remove the other emojis too
      // );
		  });
    }

    function getUser(user) {
      const raven = '473214825833431051';
      const yara = '472516647786119188';
      const juice = '371080482173091840';
      const daria = '433206006999285760';
      const feso = '748640429876183102';

        // const message = message;
      if (user === raven) {
        sentBy = "Raven";
        // myRole = message.guild.roles.cache.find(role => role.name === "raven colour");
        // message.channel.send("*changing colour to *" + hexCode);
        // message.channel.send("test");

      } else if (user === yara) {
        sentBy = "Yara";
        // myRole = message.guild.roles.cache.find(role => role.name === "yara colour");

      } else if (user === juice) {
        sentBy = "Juice";
        // myRole = message.guild.roles.cache.find(role => role.name === "juice colour");

      } else if (user === daria) {
        sentBy = "Daria";
        // myRole = message.guild.roles.cache.find(role => role.name === "daria colour");

      } else if (user === feso) {
        sentBy = "Feso";
        // myRole = message.guild.roles.cache.find(role => role.name === "feso colour");

      } else {
        sentBy = "Unknown";
        // message.channel.send("You haven't been added to the list yet. Please message <@!473214825833431051> to get this ability.")
        return;
      }
    }

    process.on('unhandledRejection', error => {
    client.channels.cache.get(botChannel).send(`<@!473214825833431051> Unhandled Rejection: ${error.message}`);
    });
  }
}

