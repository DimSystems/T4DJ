import { DiscordReaction, DiscordReactions, DiscordSystemMessage } from '@derockdev/discord-components-react';
import { MessageType, type GuildMember, type Message, type User } from 'discord.js';
import React from 'react';
import { parseDiscordEmoji } from '../../utils/utils';
import { RenderMessageContext } from '..';
import { Languages } from '../../Languages';


const AvailableLanguages = Languages.TotalLanguages

export default async function renderSystemMessage(message: Message, context: RenderMessageContext) {
  
    let dscmsg1 = ""
    let dscmsg2 = ""
    let dscmsg3 = ""
    let dscmsg4 = ""
    let dscmsg5 = ""
  
    if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "ENGLISH"){
      dscmsg1 = Languages.LanguageSectionSysMessages.English.dscmsg1
      dscmsg2 = Languages.LanguageSectionSysMessages.English.dscmsg2
      dscmsg3 = Languages.LanguageSectionSysMessages.English.dscmsg3
      dscmsg4 = Languages.LanguageSectionSysMessages.English.dscmsg4
      dscmsg5 = Languages.LanguageSectionSysMessages.English.dscmsg5
    } else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "BRAZILIAN") {
      dscmsg1 = Languages.LanguageSectionSysMessages.Brazilian.dscmsg1
      dscmsg2 = Languages.LanguageSectionSysMessages.Brazilian.dscmsg2
      dscmsg3 = Languages.LanguageSectionSysMessages.Brazilian.dscmsg3
      dscmsg4 = Languages.LanguageSectionSysMessages.Brazilian.dscmsg4
      dscmsg5 = Languages.LanguageSectionSysMessages.Brazilian.dscmsg5
    }  else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "DUTCH") {
      dscmsg1 = Languages.LanguageSectionSysMessages.Dutch.dscmsg1
      dscmsg2 = Languages.LanguageSectionSysMessages.Dutch.dscmsg2
      dscmsg3 = Languages.LanguageSectionSysMessages.Dutch.dscmsg3
      dscmsg4 = Languages.LanguageSectionSysMessages.Dutch.dscmsg4
      dscmsg5 = Languages.LanguageSectionSysMessages.Dutch.dscmsg5
    }  else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "FRENCH") {
      dscmsg1 = Languages.LanguageSectionSysMessages.French.dscmsg1
      dscmsg2 = Languages.LanguageSectionSysMessages.French.dscmsg2
      dscmsg3 = Languages.LanguageSectionSysMessages.French.dscmsg3
      dscmsg4 = Languages.LanguageSectionSysMessages.French.dscmsg4
      dscmsg5 = Languages.LanguageSectionSysMessages.French.dscmsg5
    }

 
  switch (message.type) {
    case MessageType.RecipientAdd:
    case MessageType.UserJoin:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="join">
          {JoinMessage(message.member, message.author, context)}
        </DiscordSystemMessage>
      );

    case MessageType.ChannelPinnedMessage:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="pin">
          <Highlight color={message.member?.roles.color?.hexColor}>{message.author.username}</Highlight> {dscmsg1}{' '}
          <i data-goto={message.reference?.messageId}>{dscmsg2}</i> {dscmsg3}
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
        </DiscordSystemMessage>
      );

    case MessageType.GuildBoost:
    case MessageType.GuildBoostTier1:
    case MessageType.GuildBoostTier2:
    case MessageType.GuildBoostTier3:
      return (
        <DiscordSystemMessage id={`m-${message.id}`} key={message.id} type="boost">
          <Highlight color={message.member?.roles.color?.hexColor}>{message.author.username}</Highlight> {dscmsg4}
        </DiscordSystemMessage>
      );

    case MessageType.ThreadStarterMessage:
      return (
        <DiscordSystemMessage id={`ms-${message.id}`} key={message.id} type="thread">
          <Highlight color={message.member?.roles.color?.hexColor}>{message.author.username}</Highlight> {dscmsg5} <i data-goto={message.reference?.messageId}>{message.content}</i>
        </DiscordSystemMessage>
      );

    default:
      return undefined;
  }
}

export function Highlight({ children, color }: { children: React.ReactNode; color?: string }) {
  return <i style={{ color: color ?? 'white' }}>{children}</i>;
}



export function JoinMessage(member: GuildMember | null, fallbackUser: User, context: RenderMessageContext) {
  if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "ENGLISH"){
    let allJoinMessages = Languages.LanguageSectionSysMessages.English.allJoinMessages;

    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];

    return randomMessage
      .split('{user}')
      .flatMap((item, i) => [
        item,
        <Highlight color={member?.roles.color?.hexColor} key={i}>
          {member?.nickname ?? fallbackUser.username}
        </Highlight>,
      ])
      .slice(0, -1);
  } else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "BRAZILIAN") {
    let allJoinMessages = Languages.LanguageSectionSysMessages.Brazilian.allJoinMessages;
    
    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];

    return randomMessage
      .split('{user}')
      .flatMap((item, i) => [
        item,
        <Highlight color={member?.roles.color?.hexColor} key={i}>
          {member?.nickname ?? fallbackUser.username}
        </Highlight>,
      ])
      .slice(0, -1);
  } else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "DUTCH") {
    let allJoinMessages = Languages.LanguageSectionSysMessages.Dutch.allJoinMessages;
    
    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];

    return randomMessage
      .split('{user}')
      .flatMap((item, i) => [
        item,
        <Highlight color={member?.roles.color?.hexColor} key={i}>
          {member?.nickname ?? fallbackUser.username}
        </Highlight>,
      ])
      .slice(0, -1);
  } else if(AvailableLanguages.includes(context?.Language?.toUpperCase() || "ENGLISH") && context?.Language?.toUpperCase() == "FRENCH") {
    let allJoinMessages = Languages.LanguageSectionSysMessages.French.allJoinMessages;
    
    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];

    return randomMessage
      .split('{user}')
      .flatMap((item, i) => [
        item,
        <Highlight color={member?.roles.color?.hexColor} key={i}>
          {member?.nickname ?? fallbackUser.username}
        </Highlight>,
      ])
      .slice(0, -1);
  }
  

 
}
