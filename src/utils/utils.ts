import type { APIMessageComponentEmoji, Emoji } from 'discord.js';
import { request } from 'undici';
import twemoji from 'twemoji';
import { RenderMessageContext } from '../generator';
import { Languages } from '../Languages';

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export function parseDiscordEmoji(emoji: Emoji | APIMessageComponentEmoji) {
  if (emoji.id) {
    return `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;
  }

  const codepoints = twemoji.convert
    .toCodePoint(
      emoji.name!.indexOf(String.fromCharCode(0x200d)) < 0 ? emoji.name!.replace(/\uFE0F/g, '') : emoji.name!
    )
    .toLowerCase();

  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoints}.svg`;
}

export async function downloadImageToDataURL(url: string, context2: RenderMessageContext): Promise<string | null> {


  const AvailableLanguages = Languages.TotalLanguages;

let errorMessage = "";
if(AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "ENGLISH"){
  errorMessage = Languages.LanguageSectionUtil.English.errorMessage1;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "DUTCH"){
  errorMessage = Languages.LanguageSectionUtil.Dutch.errorMessage1;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "BRAZILIAN"){
  errorMessage = Languages.LanguageSectionUtil.Brazilian.errorMessage1;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "FRENCH"){
  errorMessage = Languages.LanguageSectionUtil.French.errorMessage1;
}

  const response = await request(url);

  const dataURL = await response.body
    .arrayBuffer()
    .then((res) => {
      const data = Buffer.from(res).toString('base64');
      const mime = response.headers['content-type'];

      return `data:${mime};base64,${data}`;
    })
    .catch((err) => {
      if (!process.env.HIDE_TRANSCRIPT_ERRORS) {
        console.error(`${errorMessage}`, err);
      }

      return null;
    });

  return dataURL;
}
 

export async function downloadFileAndGetData(url: string, context2: RenderMessageContext): Promise<string | null> {


  const AvailableLanguages = Languages.TotalLanguages;

let errorMessage = "";
if(AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "ENGLISH"){
  errorMessage = Languages.LanguageSectionUtil.English.errorMessage0;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "DUTCH"){
  errorMessage = Languages.LanguageSectionUtil.Dutch.errorMessage0;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "BRAZILIAN"){
  errorMessage = Languages.LanguageSectionUtil.Brazilian.errorMessage0;
}  else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "FRENCH"){
  errorMessage = Languages.LanguageSectionUtil.French.errorMessage0;
}

  const response = await request(url);

  const dataURL = await response.body
    .text()
    .then((res) => {
      const data = res.substring(0, 1000)
      function byteSize(str: string){
        let Bytes = new Blob([str]).size;
        return Bytes
      } 

      const data2 = res.substring(1000, 999999999999999);
      let remainingBytes = byteSize(data2);

      if(data.length === 1000){
        return `${data} (${formatBytes(remainingBytes)} left)`
      }

      return `${data}`;
    })
    .catch((err) => {
      if (!process.env.HIDE_TRANSCRIPT_ERRORS) {
        console.error(`${errorMessage}`, err);
      }

      return null;
    });

  return dataURL;
}
 