const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.createUser = async (props) => {
    const user = await axios.post(`${apiUrl}/discord-user/`, {discordUser:props});

    return user.data;
};


exports.getUsers = async (query) => {
    const users = await axios.get(`${apiUrl}/discord-user`, {params: query});

    return users.data;
};