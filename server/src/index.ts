import { app } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { collabServer } from './collab/server.js';

async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });

  await collabServer.listen();
  console.log(`Collab WebSocket server on ws://localhost:${env.COLLAB_PORT}`);
}

main();
