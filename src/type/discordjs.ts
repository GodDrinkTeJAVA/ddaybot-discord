import type { Client, Collection, SlashCommandBuilder } from "discord.js"

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>
}

export type ClientWithCommands<T extends boolean> = Client<T> & {
    commands?: Collection<string, Command>
}