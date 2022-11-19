const logger = require('../logger');
const getOrCreateGuild = require('../businessLogic/getOrCreateGuild');
const getOrCreateUser = require('../businessLogic/getOrCreateUser');

module.exports = async (interaction, user) => {
    try {
        if (!interaction.isChatInputCommand()) return;

        const user = await getOrCreateUser(interaction.user.id);
        const guild = await getOrCreateGuild(interaction.guild.id);
        const command = interaction.client.commands.get(interaction.commandName);
        logger.info(`Attempting to execute ${interaction.commandName} for [guildId=${guild.id}]/[userId=${user.id}]`);
        await command.execute(interaction, user, guild);
    } catch (err) {
        logger.error(err, 'An error occured executing a command');
    }
};