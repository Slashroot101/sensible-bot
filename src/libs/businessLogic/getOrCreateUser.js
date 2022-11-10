const { getUsers, createUser } = require("../api/discordUser");
const logger = require("../logger")

module.exports = async (discordSnowflake) => {
    logger.info(`Attempting to find or create user for [discordSnowflake=${discordSnowflake}]`);
    const users = await getUsers({discordSnowflake});

    let user = null;
    if(!users.discordUsers.length){
        logger.info(`User did not exist for [discordSnowflake=${discordSnowflake}], creating.`)
        return await createUser({discordSnowflake}).discordUser;
    }
    if(users.discordUsers.length > 1) {
        throw new Error(`More than one user with the same snowflake exists for [discordSnowflake=${users[0].discordSnowflake}]`);
    }

    if(users.discordUsers.length === 1){
        user = users.discordUsers[0];
    }

    return user;
}