const getOrCreateGuild = require("../businessLogic/getOrCreateGuild")

module.exports = async e => {
    await getOrCreateGuild(e.id);
}