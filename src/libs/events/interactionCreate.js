
module.exports = async (interaction, user) => {
    const command = interaction.client.commands.get(interaction.commandName);

    await command.execute(interaction, user);
};