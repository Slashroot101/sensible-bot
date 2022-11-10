const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.createGuild = async (props) => {
    const guild = await axios.post(`${apiUrl}/discord-guild`, {discordGuild: props});

    return guild.data;
}

exports.getGuild = async (props) => {
    const guilds = await axios.get(`${apiUrl}/discord-guild`, {params: props});

    return guilds.data;
}