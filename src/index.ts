import { AttachmentBuilder, version, Collection, type Channel, type Message, type TextBasedChannel } from 'discord.js';
import renderMessages from './generator';
import {
  ExportReturnType,
  type CreateTranscriptOptions,
  type GenerateFromMessagesOptions,
  type ObjectType,
} from './types';

// version check
const versionPrefix = version.split('.')[0];

if (versionPrefix !== '14' && versionPrefix !== '15') {
  console.error(
    `[T4DJ] T4DJ only supports Discord.JS Version 14 or 15. Any earlier releases are NOT usable!`
  );
  process.exit(1);
}

/**
 *
 * @param messages The messages to generate a transcript from
 * @param channel  The channel the messages are from (used for header and guild name)
 * @param options  The options to use when generating the transcript
 * @returns        The generated transcript
 */
export async function generateFromMessages<T extends ExportReturnType = ExportReturnType.Attachment>(
  messages: Message[] | Collection<string, Message>,
  channel: Channel,
  options: GenerateFromMessagesOptions<T> = {}
): Promise<ObjectType<T>> {
  // turn messages into an array
  const transformedMessages = messages instanceof Collection ? Array.from(messages.values()) : messages;

  // const startTime = process.hrtime();

  // render the messages
  const html = await renderMessages({
    messages: transformedMessages,
    channel,
    FileConfig: {
      SaveAttachments: options.FileConfig?.SaveAttachments ?? false,
      SaveExternalEmojis: options.FileConfig?.SaveExternalEmojis ?? false,
      SaveStickers: options.FileConfig?.SaveStickers ?? false ,

      ...(options.FileConfig ?? {}),
    },
    // saveImages: options.saveImages ?? false,
    callbacks: {
      resolveChannel: async (id) => channel.client.channels.fetch(id).catch(() => null),
      resolveUser: async (id) => channel.client.users.fetch(id).catch(() => null),
      resolveRole: channel.isDMBased() ? () => null : async (id) => channel.guild?.roles.fetch(id).catch(() => null),

      ...(options.callbacks ?? {}),
    },
    customCSS: {
      GlobalCSS: {
        BackgroundColor: options.customCSS?.GlobalCSS?.BackgroundColor, 
        Color: options.customCSS?.GlobalCSS?.Color,
      },
      MessagesCSS1: {
       Color: options.customCSS?.MessagesCSS1?.Color ?? "#afafaf",
       BackgroundColor: options.customCSS?.MessagesCSS1?.BackgroundColor ?? "#1a1818",
       Display: options.customCSS?.MessagesCSS1?.Display ?? "block",
       FontSize: options.customCSS?.MessagesCSS1?.FontSize ?? "16px",
       FontFamily: options.customCSS?.MessagesCSS1?.FontFamily ?? `Whitney, 'Source Sans Pro', ui-sans-serif, system-ui, -apple-system, 'system-ui', 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
       sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
       LineHeight: options.customCSS?.MessagesCSS1?.LineHeight ?? "170%",
       Border: options.customCSS?.MessagesCSS1?.Border ?? "5px solid rgba(255, 255, 255, 0.05);"
      }, 
      MessagesCSS2: {
        Color: options.customCSS?.MessagesCSS2?.Color ?? "#afafaf",
        Display: options.customCSS?.MessagesCSS2?.Display ?? "flex",
        FontSize: options.customCSS?.MessagesCSS2?.FontSize ?? "0.9em",
        FontFamily: options.customCSS?.MessagesCSS2?.FontFamily ?? `Whitney, 'Source Sans Pro', ui-sans-serif, system-ui, -apple-system, 'system-ui', 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        Padding: options.customCSS?.MessagesCSS2?.Padding ?? "0px 1em",
        Position: options.customCSS?.MessagesCSS2?.Position ?? "relative",
        WordWrap: options.customCSS?.MessagesCSS2?.WordWrap ?? "break-word",
        Flex: options.customCSS?.MessagesCSS2?.Flex ?? "0 0 auto",
        MinHeight: options.customCSS?.MessagesCSS2?.MinHeight ?? "1.375rem",
        PaddingRight: options.customCSS?.MessagesCSS2?.PaddingRight ?? "48px !important;",
        MarginTop: options.customCSS?.MessagesCSS2?.MarginTop ?? "1.0625rem"
      }, 
      MessageReplyCSS: {
        Color: options.customCSS?.MessageReplyCSS?.Color ?? "#b9bbbe",
        Display: options.customCSS?.MessageReplyCSS?.Display ?? "flex",
        FontSize: options.customCSS?.MessageReplyCSS?.FontSize ?? "0.875rem",
        FontFamily: options.customCSS?.MessageReplyCSS?.FontFamily ?? `Whitney, 'Source Sans Pro', ui-sans-serif, system-ui, -apple-system, 'system-ui', 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        PaddingTop: options.customCSS?.MessageReplyCSS?.PaddingTop ?? "2px",
        MarginLeft: options.customCSS?.MessageReplyCSS?.MarginLeft ?? "56px",
        MarginBottom: options.customCSS?.MessageReplyCSS?.MarginBottom ?? "4px",
        AlignItems: options.customCSS?.MessageReplyCSS?.AlignItems ?? "center",
        Position: options.customCSS?.MessageReplyCSS?.Position ?? "relative",
        WhiteSpace: options.customCSS?.MessageReplyCSS?.WhiteSpace ?? "pre",
        UserSelect: options.customCSS?.MessageReplyCSS?.UserSelect ?? "none"
      },
   
      ...(options.customCSS ?? { }),
    },
    poweredBy: options.poweredBy ?? true,
    useNewCSS: options.useNewCSS ?? true,
    footerText: options.footerText ?? 'Exported {number} message{s}.',
    headerText: options.headerText ?? '',
    Language: options.Language ?? 'English',
    headerColor: options.headerColor ?? 'green',
    hydrate: options.hydrate ?? false,
    favicon: options.favicon ?? 'guild',

  });

  if (options.returnType === ExportReturnType.Buffer) {
    return Buffer.from(html) as unknown as ObjectType<T>;
  }

  if (options.returnType === ExportReturnType.String) {
    return html as unknown as ObjectType<T>;
  }

  return new AttachmentBuilder(Buffer.from(html), {
    name: options.filename ?? `transcript-${channel.id}.html`,
  }) as unknown as ObjectType<T>;
}

/**
 *
 * @param channel The channel to create a transcript from
 * @param options The options to use when creating the transcript
 * @returns       The generated transcript
 */
export async function createTranscript<T extends ExportReturnType = ExportReturnType.Attachment>(
  channel: TextBasedChannel,
  options: CreateTranscriptOptions<T> = {}
): Promise<ObjectType<T>> {
  // validate type
  if (!channel.isTextBased()) {
    // @ts-expect-error(2339): run-time check
    throw new TypeError(`Provided channel must be text-based, received ${channel.type}`);
  }

  // fetch messages
  let allMessages: Message[] = [];
  let lastMessageId: string | undefined;
  const { limit } = options;
  const resolvedLimit = typeof limit === 'undefined' || limit === -1 ? Infinity : limit;

  // until there are no more messages, keep fetching
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // create fetch options
    const fetchLimitOptions = { limit: 100, before: lastMessageId };
    if (!lastMessageId) delete fetchLimitOptions.before;

    // fetch messages
    const messages = await channel.messages.fetch(fetchLimitOptions);

    // add the messages to the array
    allMessages.push(...messages.values());
    lastMessageId = messages.lastKey();

    // if there are no more messages, break
    if (messages.size < 100) break;

    // if the limit has been reached, break
    if (allMessages.length >= resolvedLimit) break;
  }

  if (resolvedLimit < allMessages.length) allMessages = allMessages.slice(0, limit);

  // generate the transcript
  return generateFromMessages<T>(allMessages.reverse(), channel, options);
}

export default {
  createTranscript,
  generateFromMessages,
};
export * from './types';
