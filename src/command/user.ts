import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../type/discordjs";

const userCommand: Command = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('asdf'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Hello")
    }
};

export default userCommand;
