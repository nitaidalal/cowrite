import { Server } from '@hocuspocus/server';
import { env } from '../config/env.js';

export const collabServer = new Server({
  port: env.COLLAB_PORT,

  async onConnect({ documentName }) {
    console.log(`[collab] client connected to "${documentName}"`);
  },

  async onDisconnect({ documentName }) {
    console.log(`[collab] client left "${documentName}"`);
  },
});
