import {
  DiscordAttachments,
  DiscordCommand,
  DiscordMessage,
  DiscordReaction,
  DiscordReactions,
  DiscordThread,
  DiscordThreadMessage,
} from '@derockdev/discord-components-react';
import type { Message } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '..';
import { parseDiscordEmoji } from '../../utils/utils';
import renderAttachments from './attachment';
import renderComponentRow from './components';
import renderContent, { RenderType } from './content';
import { renderEmbed } from './embed';
import renderReply from './reply';
import renderSystemMessage from './systemMessage';


const AvailableLanguages = [
  "ENGLISH", "BRAZILIAN", "DUTCH"
]
export default async function renderMessage(message: Message, context: RenderMessageContext) {
  if (message.system) return renderSystemMessage(message, context);

  const isCrosspost = message.reference && message.reference.guildId !== message.guild?.id;
  let dscmsg1 = ""
  let dscmsg2 = ""
  let dscmsg3 = ""

  if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "ENGLISH"){
    dscmsg1 = "Message"
    dscmsg2 = "View Thread"
    dscmsg3 = "Thread messages not saved."
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "BRAZILIAN") {
    dscmsg1 = "Mensage"
    dscmsg2 = "Ver Thread"
    dscmsg3 = " do Thread não foram salvas."
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "DUTCH") {
    dscmsg1 = "Bericht"
    dscmsg2 = "Bekijk Thread"
    dscmsg3 = "Thread bericht niet opgeslagen."
  }

  return (
    
    <DiscordMessage
      id={`m-${message.id}`}
      timestamp={message.createdAt.toISOString()}
      key={message.id}
      edited={message.editedAt !== null}
      server={isCrosspost ?? undefined}
      highlight={message.mentions.everyone}
      profile={message.author.id}
    >
      {/* reply */}
      {await renderReply(message, context)}

      {/* slash command */}
      {message.interaction && (
        <DiscordCommand
          slot="reply"
          profile={message.interaction.user.id}
          command={'/' + message.interaction.commandName}
        />
      )}

      {/* message content */}
      {message.content &&
        (await renderContent(message.content, {
          ...context,
          type: message.webhookId ? RenderType.WEBHOOK : RenderType.NORMAL,
        }))}

      {/* attachments */}
      {await renderAttachments(message, context)}

      {/* message embeds */}
      {message.embeds.length > 0 &&
        (await Promise.all(
          message.embeds.map(async (embed, id) => await renderEmbed(embed, { ...context, index: id, message }))
        ))}

      {/* components */}
      {message.components.length > 0 && (
        <DiscordAttachments slot="components">
          {message.components.map((component, id) => renderComponentRow(component, id))}
        </DiscordAttachments>
      )}

      {/* reactions */}
      {message.reactions.cache.size > 0 && (
        <DiscordReactions slot="reactions">
          {message.reactions.cache.map((reaction, id) => (
            <DiscordReaction
              key={`${message.id}r${id}`}
              name={reaction.emoji.name!}
              emoji={parseDiscordEmoji(reaction.emoji)}
              count={reaction.count}
            />
          ))}
        </DiscordReactions>
      )}

      { // I will work on it when i have time :(
        message.stickers.size > 0 && (
          <h1>Stickers are NOT supported yet :( Coming in the next update!</h1>
        )
      }

      {/* threads */}
      {message.hasThread && message.thread && (
        <DiscordThread
          slot="thread"
          name={message.thread.name}
          cta={
            message.thread.messageCount
              ? `${message.thread.messageCount} ${dscmsg1}${message.thread.messageCount > 1 ? 's' : ''}`
              : dscmsg2
          }
        >
          {message.thread.lastMessage ? (
            <DiscordThreadMessage profile={message.thread.lastMessage.author.id}>
              {await renderContent(
                message.thread.lastMessage.content.length > 128
                  ? message.thread.lastMessage.content.substring(0, 125) + '...'
                  : message.thread.lastMessage.content,
                { ...context, type: RenderType.REPLY }
              )}
            </DiscordThreadMessage>
          ) : (
            `${dscmsg3}`
          )}
        </DiscordThread>
      )}
    </DiscordMessage>
  );
}
