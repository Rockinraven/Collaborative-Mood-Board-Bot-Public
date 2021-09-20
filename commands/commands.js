module.exports = {
	name: 'commands',
	description: 'Sends a description of all available commands',
	async execute(message,Discord){
    const channel = message.channel;
      const embedMessage = new Discord.MessageEmbed()
      .setTitle('Commands')
      .setDescription("A list of all commands.")
      .addFields (
        {name: '!commands ', value: 'You just typed this one, it lists all the commands'}
      )
      channel.send(embedMessage)
		
	}
}