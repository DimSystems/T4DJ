export type State = {
  key?: string | number | undefined;
  inline?: boolean | undefined;
  callbacks: {
    resolveChannel: (channelId: string) => string;
    resolveUser: (userId: string) => string;
    resolveEmoji: (emojiId: string) => string;
    resolveRole: (roleId: string) => string;
  };
  // customCSS: {
  //   Primary: (Primary: string) => string;
  //   TextTheme: (TextTheme: string) => string;
  // };
};
