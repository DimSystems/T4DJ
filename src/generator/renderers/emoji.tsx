import { DiscordCustomEmoji } from '@derockdev/discord-components-react';
import React from 'react';
import type { Emoji,  APIMessageComponentEmoji  } from 'discord.js';
import type { RenderMessageContext, } from '..';
// import type { AttachmentTypes } from '../../types';
// import { downloadImageToDataURL, formatBytes } from '../../utils/utils';
import { request } from 'undici';
import twemoji from 'twemoji';

export enum RenderType {
  EMBED,
  REPLY,
  NORMAL,
  WEBHOOK,
}

type RenderContentContext = RenderMessageContext & {
  type: RenderType;

  _internal?: {
    largeEmojis?: boolean;
  };
};
export default async function renderEmoji(Emoji: Emoji | APIMessageComponentEmoji, context: RenderContentContext, context2: RenderMessageContext) {

 let emojiURL = `${await parseEmoji(Emoji, context2)}`
 

  return (
    <DiscordCustomEmoji
    name={Emoji.name}
    url={emojiURL}
    embedEmoji={context.type === RenderType.EMBED}
    largeEmoji={context._internal?.largeEmojis}
  />
  )


}


export async function parseEmoji(Emoji: Emoji | APIMessageComponentEmoji, context2: RenderMessageContext){


//   const AvailableLanguages = [
//     "ENGLISH", "BRAZILIAN", "DUTCH"
//   ]

// let errorMessage = "";
// if(AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "ENGLISH"){
//   errorMessage = "[T4DJ | Critical Error] Failed to download emoji for transcript: ";
// } else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "DUTCH") && context2.Language?.toUpperCase() == "DUTCH"){
//   errorMessage = "[T4DJ | Fout melding] Kan emoji voor transcriptie niet downloaden: "
// } else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "BRAZILIAN") && context2.Language?.toUpperCase() == "BRAZILIAN"){
// errorMessage = ""
// }


 if (Emoji.id) {
  if(context2.FileConfig?.SaveExternalEmojis && context2.FileConfig.ExternalEmojiOptions?.SaveMessageEmojis){
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
          console.error(`[T4DJ | Critical Error] Failed to download emoji for transcript: `, err);
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