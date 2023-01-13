import fs from 'fs';
import { REST, Routes } from 'discord.js';
import { CLIENT_ID, DISCORD_BOT_TOKEN } from '../env-variables';

export default function deployCommands(commands: typeof import('../command')) {
    const guildId = '1062707904488144899';

    const jsonfiedCommands = [];

    for (const commandName in commands) {
        jsonfiedCommands.push(commands[commandName as keyof typeof commands].data.toJSON());
    }

    if (DISCORD_BOT_TOKEN === undefined || CLIENT_ID === undefined) {
        throw "Discord bot token not provided";
    }

    const rest = new REST({version: '10'}).setToken(DISCORD_BOT_TOKEN);

    (async () => {
        try {
            console.log('Refreshing commands');
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, guildId),
                {body: jsonfiedCommands}
            )

            console.log(`Successfully reloaded`)
        } catch (e) {
            console.error(e);
        }
    })();
}
