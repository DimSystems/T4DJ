import { type GuildMember, type Message, type User, UserFlags } from 'discord.js';
import { request } from 'undici';
import { Languages } from '../Languages';
import { RenderMessageContext } from '../generator';

export type Profile = {
  author: string; // author of the message
  avatar?: string; // avatar of the author
  roleColor?: string; // role color of the author
  roleIcon?: string; // role color of the author
  roleName?: string; // role name of the author

  bot?: boolean; // is the author a bot
  verified?: boolean; // is the author verified
};

export async function buildProfiles(messages: Message[], context: any) {
  const profiles: Record<string, Profile> = {};

  // loop through messages
  for (const message of messages) {
    // add all users
    const author = message.author;
    if (!profiles[author.id]) {
      // add profile
       profiles[author.id] = await buildProfile(message.member, author, context);
    }

    // add interaction users
    if (message.interaction) {
      const user = message.interaction.user;
      if (!profiles[user.id]) {
        profiles[user.id] = await buildProfile(null, user, context);
      }
    }

    // threads
    if (message.thread && message.thread.lastMessage) {
      profiles[message.thread.lastMessage.author.id] = await buildProfile(
        message.thread.lastMessage.member,
        message.thread.lastMessage.author, context
      );
    }
  }

  // return as a JSON
  return profiles;
}

async function buildProfile(member: GuildMember | null, author: User, context: any) {
  return {
    author: member?.nickname ?? author.username,
    avatar: context.FileConfig?.SaveAvaters ? `${await DownloadAvatar(member, author, context)}` : member?.displayAvatarURL({ size: 64 }) ?? author.displayAvatarURL({ size: 64 }),
    roleColor: member?.displayHexColor,
    roleIcon: member?.roles.icon?.iconURL() ?? undefined,
    roleName: member?.roles.hoist?.name ?? undefined,
    bot: author.bot,
    verified: author.flags?.has(UserFlags.VerifiedBot),
  };
}

async function DownloadAvatar(member: GuildMember | null, author: User, context2: RenderMessageContext){



  const AvailableLanguages = Languages.TotalLanguages;

let errorMessage = "";
if(AvailableLanguages.includes(context2.Language?.toUpperCase() || "ENGLISH") && context2.Language?.toUpperCase() == "ENGLISH"){
  errorMessage = Languages.LanguageSectionAvatars.English.errorMessage;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "DUTCH") && context2.Language?.toUpperCase() == "DUTCH"){
  errorMessage = Languages.LanguageSectionAvatars.Dutch.errorMessage;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "BRAZILIAN") && context2.Language?.toUpperCase() == "BRAZILIAN"){
  errorMessage = Languages.LanguageSectionAvatars.Brazilian.errorMessage;
} else if (AvailableLanguages.includes(context2.Language?.toUpperCase() || "BRAZILIAN") && context2.Language?.toUpperCase() == "FRENCH"){
  errorMessage = Languages.LanguageSectionAvatars.French.errorMessage;
}

  const response = await request(`${member?.displayAvatarURL({ size: 64 }) ?? author.displayAvatarURL({ size: 64 })}`);

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