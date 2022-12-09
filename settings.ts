import dotenv from 'dotenv';
dotenv.config();

export default {
  token: process.env.TOKEN,
  default: {
    guildId: '997643740581736530',
  },
  log: {
    enabled: true,
    error: {
      channelId: '1046245514930303067'
    },
    member: {
      joined: {
        channelId: '998713878861054052'
      },
      left: {
        channelId: '998713878861054052'
      }
    }
  }
}; 