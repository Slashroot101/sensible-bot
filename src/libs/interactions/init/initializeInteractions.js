const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {discordClientId, discordToken, shouldCreateCommands} = require('../../config');
const logger = require('../../logger');
const commandCache = require('../../commandCache');

module.exports = async () => {
    const commands = commandCache;

    if(shouldCreateCommands){
        logger.info('Registering interactions with Discord');
        const rest = new REST({ version: '9' }).setToken(discordToken);
        await rest.put(Routes.applicationCommands(discordClientId), { body: commands.map(x => x.data) })
        logger.info('Succesfully created slash interactions with Discord');
    }

    return commands;
}