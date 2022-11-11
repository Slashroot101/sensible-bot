const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.createGuild = async (props) => {
    logger.info(`Creating guild with axios post for guild for [guildId=${props.discordSnowflake}]`);
    const guild = await axios.post(`${apiUrl}/discord-guild`, {discordGuild: props});

    return guild.data;
}

exports.getGuild = async (props) => {
    logger.info(`Getting guild with axios get for guild [guildId=${props.discordSnowflake}]`);
    const guilds = await axios.get(`${apiUrl}/discord-guild`, {params: props});

    return guilds.data;
}