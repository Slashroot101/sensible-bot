const { getGuild, createGuild } = require("../api/discordGuild");
const logger = require("../logger")

module.exports = async (discordSnowflake) => {
    logger.info(`Attempting to find or create guild for [discordSnowflake=${discordSnowflake}]`);
    const guilds = await getGuild({discordSnowflake});
    let guild = null;

    if(!guilds.discordGuilds.length){
        return (await createGuild({discordSnowflake})).discordGuild;
    }

    if(guilds.discordGuilds.length > 1) {
        throw new Error(`More than one guild with the same snowflake exists for [discordSnowflake=${guilds[0].discordSnowflake}]`);
    }

    if(guilds.discordGuilds.length === 1){
        guild = guilds.discordGuilds[0];
    }

    return guild;
}