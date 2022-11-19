const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.addWord = async (guildId, props) => {
  logger.info(`Creating blacklist word for [guildId=${guildId}] and [word=${props.word}] `);
  const word = await axios.post(`${apiUrl}/guild-blacklist/discord-guild/${guildId}`, {...props});

  return word.data.blacklist;
}

exports.deleteWord = async (guildId, props) => {
  logger.info(`Deleting blacklist word for [guildId=${guildId}] and [word=${props.word}] `);
  await axios.put(`${apiUrl}/guild-blacklist/discord/guild${guildId}/delete`, {...props});
}