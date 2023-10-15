
import { Sticker, type Message } from 'discord.js';
import React from 'react';
import { downloadImageToDataURL } from '../../utils/utils';
import type { RenderMessageContext } from '..';

export default async function renderSticker(message: Message, context: RenderMessageContext) {
if(message.stickers.size === 0) return null;

  return (
    <>
 {await Promise.all(message.stickers.map((sticker) => renderStickers1(sticker, context)))}
 </>
   

        );           
}

export async function renderStickers1(sticker: Sticker, context: RenderMessageContext) {
let url = '';

  if(context.FileConfig?.SaveStickers){
    let DataURL = await downloadImageToDataURL(sticker.url, context);
if(DataURL){
  url = DataURL;
}

}   else {
   url = sticker.url
}  

return (
<img src={url} key={sticker.id} width={160} height={160}/>
)    


}
