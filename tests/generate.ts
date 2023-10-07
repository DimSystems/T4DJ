import * as discord from 'discord.js';
import { createTranscript } from '../src';

import { config } from 'dotenv';
config();

const client = new discord.Client({
  intents: [discord.IntentsBitField.Flags.GuildMessages, discord.IntentsBitField.Flags.Guilds],
});

client.on('ready', async () => {
  const channel = await client.channels.fetch("");

  if (!channel || !channel.isTextBased()) {
    console.error('Invalid channel provided.');
    process.exit(1);
  }

  const attachment = await createTranscript(channel, {
   Language: "Dutch",
   hydrate: true
  });

  await channel.send({
    files: [attachment],
  });

  client.destroy();
  process.exit(0);
});

client.login(""); // You can use whatever method of entering a ID or Token you wish. Aslong as it works. ENV may be recommanded though 
