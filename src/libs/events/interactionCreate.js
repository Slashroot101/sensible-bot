const logger = require('../logger');

module.exports = async (interaction, user) => {
    try {
        const user = await getOrCreateUser(e.author.id);
        const guild = await getOrCreateGuild(e.guild.id);
        const command = interaction.client.commands.get(interaction.commandName);

        await command.execute(interaction, user);
    } catch (err) {
        logger.err(err, 'An error occured executing a command');
    }
};