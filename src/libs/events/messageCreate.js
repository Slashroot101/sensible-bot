const getOrCreateGuild = require("../businessLogic/getOrCreateGuild");
const getOrCreateUser = require("../businessLogic/getOrCreateUser");
const logger = require("../logger");

module.exports = async (e) => {
    logger.info(`MessageCreate interaction for user [discordSnowflake=${e.author.id}]`);

    if(e.author.bot === true) return;

    const user = await getOrCreateUser(e.author.id);
    const guild = await getOrCreateGuild(e.guild.id);
};