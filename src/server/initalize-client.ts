import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { ClientWithCommands, Command } from '../type/discordjs';

export default function getInitializedClient(slashCommands: typeof import('../command')) {
    const client: ClientWithCommands<boolean> = new Client({intents: [GatewayIntentBits.Guilds]});

    client.commands = new Collection<string, Command>();
    for (const commandName in slashCommands) {
        const command = slashCommands[commandName as keyof typeof slashCommands];
        client.commands.set(command.data.name, command);
    }

    return client;
}
