const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
                    .setName('shutdown')
                    .setDescription('Shuts down the bot. Admin only.'),
    async execute(interaction, user){
        throw new Error();
    }
}