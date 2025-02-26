const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
  commandInfo: {
    name: "ping",
    description: "Check if the backend is online!"
  },
  execute: async (interaction) => {
    try {
      const embed = new MessageEmbed()
        .setColor("#ffffff") // White
        .setTitle("Pong!")
        .setDescription("Reverse Manager is up!")
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing ping command:', error);
      const embed = new MessageEmbed()
        .setColor("#ff0000") // Red
        .setTitle("An Error Occurred!")
        .setDescription("Please Report This To The Staff/Developers!")
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
