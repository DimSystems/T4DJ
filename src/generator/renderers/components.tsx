import { DiscordActionRow, DiscordButton } from '@derockdev/discord-components-react';
import { ButtonStyle, ComponentType, type MessageActionRowComponent, type ActionRow, Emoji, APIMessageComponentEmoji } from 'discord.js';
import React from 'react';
import { request } from 'undici';
import twemoji from 'twemoji';
import { RenderMessageContext } from '..';
export default async function renderComponentRow(row: ActionRow<MessageActionRowComponent>, id: number, context: RenderMessageContext) {
  return (
    <DiscordActionRow key={id}>
      {await Promise.all(row.components.map((component, id) => renderComponent(component, id, context)))}
    </DiscordActionRow>
  );
}

const ButtonStyleMapping = {
  [ButtonStyle.Primary]: 'primary',
  [ButtonStyle.Secondary]: 'secondary',
  [ButtonStyle.Success]: 'success',
  [ButtonStyle.Danger]: 'destructive',
  [ButtonStyle.Link]: 'secondary',
} as const;

export async function renderComponent(component: MessageActionRowComponent, id: number, context2: RenderMessageContext) {
  if (component.type === ComponentType.Button) {


   let emojiURL = `${component.emoji ? await parseComponentEmoji(component.emoji!, context2) : ""}`


    return (
      <DiscordButton
        key={id}
        type={ButtonStyleMapping[component.style]}
        url={component.url ?? undefined}
        emoji={emojiURL}
      >
        {component.label}
      </DiscordButton>
    );
  }

  return undefined;
   

}



export async function parseComponentEmoji(Emoji: Emoji | APIMessageComponentEmoji, context2: RenderMessageContext) {

  if (Emoji.id) {
    if(context2.FileConfig?.SaveExternalEmojis && context2.FileConfig.ExternalEmojiOptions?.SaveComponentEmojis){
      const response = await request(`https://cdn.discordapp.com/emojis/${Emoji.id}.${Emoji.animated ? 'gif' : 'png'}`);
  
      const dataURL = await response.body
        .arrayBuffer()
        .then((res) => {
          const data = Buffer.from(res).toString('base64');
          const mime = response.headers['content-type'];
    
          return `data:${mime};base64,${data}`;
        })
        .catch((err) => {
          if (!process.env.HIDE_TRANSCRIPT_ERRORS) {
            console.error(`[T4DJ | Critical Error] Failed to download component emoji for transcript: `, err);
          }
    
          return null;
        });
    
        return dataURL
    }
      return `https://cdn.discordapp.com/emojis/${Emoji.id}.${Emoji.animated ? 'gif' : 'png'}`;
    }
  
    const codepoints = twemoji.convert
      .toCodePoint(
        Emoji.name!.indexOf(String.fromCharCode(0x200d)) < 0 ? Emoji.name!.replace(/\uFE0F/g, '') : Emoji.name!
      )
      .toLowerCase();
  
    return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoints}.svg`;
}
