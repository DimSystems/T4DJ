import { DiscordReply } from '@derockdev/discord-components-react';
import { type Message, UserFlags } from 'discord.js';
import type { RenderMessageContext } from '..';
import React from 'react';
import renderContent, { RenderType } from './content';

export default async function renderReply(message: Message, context: RenderMessageContext) {
  if (!message.reference) return null;
  if (message.reference.guildId !== message.guild?.id) return null;

  const referencedMessage = context.messages.find((m) => m.id === message.reference!.messageId);

  if (!referencedMessage) return <DiscordReply slot="reply">Message could not be loaded.</DiscordReply>;

  const isCrosspost = referencedMessage.reference && referencedMessage.reference.guildId !== message.guild?.id;
  const isCommand = referencedMessage.interaction !== null;


const AvailableLanguages = [
  "ENGLISH", "BRAZILIAN", "DUTCH"
]

  let dscmsg1 = ""
  let dscmsg2 = ""

  if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "ENGLISH"){
    dscmsg1 = "Click to see command."
    dscmsg2 = "Click to see attachment."
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "BRAZILIAN") {
    dscmsg1 = "Clique para ver o comando."
    dscmsg2 = "Clique para ver o anexo.."
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "DUTCH") {
    dscmsg1 = "klik om het commando te zien."
    dscmsg2 = "Klik om bijlage te zien."
  }

  return (
    <DiscordReply
      slot="reply"
      edited={!isCommand && referencedMessage.editedAt !== null}
      attachment={referencedMessage.attachments.size > 0}
      author={referencedMessage.member?.nickname ?? referencedMessage.author.username}
      avatar={referencedMessage.author.avatarURL({ size: 32 }) ?? undefined}
      roleColor={referencedMessage.member?.displayHexColor ?? undefined}
      bot={!isCrosspost && referencedMessage.author.bot}
      verified={referencedMessage.author.flags?.has(UserFlags.VerifiedBot)}
      op={message.channel.isThread() && referencedMessage.author.id === message.channel.ownerId}
      server={isCrosspost ?? undefined}
      command={isCommand}
    >
      {referencedMessage.content ? (
        <span data-goto={referencedMessage.id}>
          {await renderContent(referencedMessage.content, { ...context, type: RenderType.REPLY })}
        </span>
      ) : isCommand ? (
        <em data-goto={referencedMessage.id}>{dscmsg1}</em>
      ) : (
        <em data-goto={referencedMessage.id}>{dscmsg2}</em>
      )}
    </DiscordReply>
  );
}