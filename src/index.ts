import { Events } from "discord.js";

import * as commands from './command';
import { DISCORD_BOT_TOKEN } from "./env-variables";
import deployCommands from "./server/deploy-command";
import getInitializedClient from "./server/initalize-client";
import { ClientWithCommands } from "./type/discordjs";

function init() {
    const client = getInitializedClient(commands);

    client.on(Events.ClientReady, calleeClient => {
        console.log(`Bot logged in as ${calleeClient.user.tag}`);
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) {
            return;
        }
        console.log(interaction);
        const client: ClientWithCommands<true> = interaction.client;
        const command = client.commands?.get(interaction.commandName);

		await command?.execute(interaction);
    });

    client.login(DISCORD_BOT_TOKEN);
}

init();
deployCommands(commands);
