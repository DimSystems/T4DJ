import {
  DiscordAttachments,
  DiscordCommand,
  DiscordMessage,
  DiscordThread,
  DiscordThreadMessage,
} from '@derockdev/discord-components-react';
import type { Message } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '..';
import renderAttachments from './attachment';
import renderComponentRow from './components';
import renderContent, { RenderType } from './content';
import { renderEmbed } from './embed';
import renderReply from './reply';
import renderSticker from './sticker';
import renderSystemMessage from './systemMessage';
import renderReaction from './reaction';


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

{    /* Stickers */ }
     {await renderSticker(message, context)}

      {/* reply */}
      {await renderReply(message, context)}


      {/* reactions */}
      {await renderReaction(message, context)}

       {/* Interaction Failure Check */}
       { message.interaction && message.content.length == 0 && message.embeds.length == 0 && (
       <>
       <svg aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 20 20" fill='#ed4550'><path d="M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z"></path></svg>
       <h4 style={ { color: "#ed4550" } }>This interaction failed to respond! </h4>
       </> 
      )}

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
          { await Promise.all(message.components.map((component, id) => renderComponentRow(component, id, context)))}
        </DiscordAttachments>
      )}


      

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
