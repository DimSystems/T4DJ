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
  // let dscmsg4 = ""

  if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "ENGLISH"){
    dscmsg1 = "Message"
    dscmsg2 = "View Thread"
    dscmsg3 = "Thread messages not saved."
    // dscmsg4 = "This <u>interaction</u> failed to respond!"
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "BRAZILIAN") {
    dscmsg1 = "Mensage"
    dscmsg2 = "Ver Thread"
    dscmsg3 = " do Thread não foram salvas."
  } else if(AvailableLanguages.includes(context.Language?.toUpperCase() || "ENGLISH") && context.Language?.toUpperCase() == "DUTCH") {
    dscmsg1 = "Bericht"
    dscmsg2 = "Bekijk Thread"
    dscmsg3 = "Thread bericht niet opgeslagen."
    // dscmsg4 = "Deze <u>interactie</u> is mislukt!"
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
       { message.interaction && message.content.length == 0 && message.embeds.length == 0 && message.components.length == 0 && message.attachments.size == 0 && (
       <>
       <h4 style={ { color: "#ed4550" } }>This <u>interaction</u> failed to respond! </h4>
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
