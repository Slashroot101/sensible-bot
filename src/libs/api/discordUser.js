const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.createUser = async (props) => {
    logger.info(`Creating user with Axios post with [discordSnowflake=${props.discordSnowflake}]`)
    const user = await axios.post(`${apiUrl}/discord-user/`, {discordUser:props});

    return user.data;
};


exports.getUsers = async (query) => {
    logger.info(`Querying for users with Axios get with [discordSnowflake=${query.discordSnowflake}]`);
    const users = await axios.get(`${apiUrl}/discord-user`, {params: query});

    return users.data;
};