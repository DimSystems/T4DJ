import { DiscordAttachment, DiscordAttachments, DiscordCodeBlock } from '@derockdev/discord-components-react';
import React from 'react';
import type { Attachment, Message } from 'discord.js';
import type { RenderMessageContext } from '..';
import type { AttachmentTypes } from '../../types';
import { downloadFileAndGetData, downloadImageToDataURL, formatBytes } from '../../utils/utils';
import LanguageJson from "./Language.json"

export default async function renderAttachments(message: Message, context: RenderMessageContext) {
  if (message.attachments.size === 0) return null;

  return (
    <DiscordAttachments slot="attachments">
      {await Promise.all(message.attachments.map((attachment) => renderAttachment(attachment, context)))}
    </DiscordAttachments>
  );
}

// "audio" | "video" | "image" | "file"
function getAttachmentType(attachment: Attachment): AttachmentTypes {
  const type = attachment.contentType?.split('/')?.[0] ?? 'unknown';
  if (['audio', 'video', 'image'].includes(type)) return type as AttachmentTypes;
  return 'file';
}

let AttachTypeArray = ['audio', 'video', 'image'];


function getAttachmentExtension(attachment: Attachment) {

   let TypeArray = [""] // ['.js', '.py', '.cs', '.ts', '.jsx', '.tsx', '.readme', '.html', '.c', '.', '.abap',]
  LanguageJson.forEach((Lan) => {
      Lan.extensions?.forEach((Lane) => {
        TypeArray.push(Lane);
      })
  })
  const type = attachment.name?.substring(attachment.name.indexOf('.'), 1000) ?? 'unknown';
  if(TypeArray.includes(type)) return type;
  return 'file';
}

export async function renderAttachment(attachment: Attachment, context: RenderMessageContext) {
  let url = attachment.url;
  const name = attachment.name;
  const width = attachment.width;
  const height = attachment.height;

  const type = getAttachmentType(attachment);
  const extension = getAttachmentExtension(attachment);
  
  // // if the attachment is an image, download it to a data url
  // if (context.FileConfig?.SaveAttachments && type === 'image') {
  //   const downloaded = await downloadImageToDataURL(url);
  //   if (downloaded) {
  //     url = downloaded;
  //   }
  // }

  if(context.FileConfig?.SaveAttachments && AttachTypeArray.includes(type)){
      const downloaded = await downloadImageToDataURL(url);
    if (downloaded) {
      url = downloaded;
    }
  }
  

 if(context.FileConfig?.AttachmentOptions?.FetchAttachmentFiles){
  if(extension !== "file"){
    let data = ""
    const downloadCheck = await downloadFileAndGetData(url);
    if(downloadCheck){
      data = downloadCheck
    }


    return (
      <><DiscordCodeBlock language={extension.replace(".", '')} code={data} />
           <h3>{attachment.name}</h3>
      <h3>{formatBytes(attachment.size)}</h3>
      <a href={attachment.url}><i>Download Link</i> </a>
      </>
   
    )
  }
 }
  if(type === "audio"){
   return (
    <audio controls>
        <source src={url}></source>
    </audio>
   )
  } else {
    return (
      <DiscordAttachment
        type={type}
        size={formatBytes(attachment.size)}
        key={attachment.id}
        slot="attachment"
        url={url}
        alt={name ?? undefined}
        width={width ?? undefined}
        height={height ?? undefined}
      />
    );
  }
  
}
