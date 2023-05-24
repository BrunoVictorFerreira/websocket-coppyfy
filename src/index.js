import dotenv from "dotenv";
import CreateServer from "http";
import CreateIo from "socket.io";
dotenv.config();

import app from "./app";
import RethinkDBInit from "./config/database/rethinkdb";
import PostgresInit from "./config/database/postgres";
import Socket from "./websocket/index";
import { EnviromentConnection } from "./config/enviroment";
import { CorsFunction } from "./config/cors";

let rethinkConnection = null;
let postgresConnection = null;

RethinkDBInit(async (connection) => {
  rethinkConnection = connection;
  PostgresInit(async (_postgresConnection) => {
    postgresConnection = _postgresConnection;
    const server = CreateServer.createServer(app);
    const { allowlist } = CorsFunction();
    const io = CreateIo(server, {
      allowRequest: (req, callback) => {
        const noOriginHeader = allowlist.includes(req.headers.origin);
        callback(null, true);
      },
    });
    Socket(io);
    server.listen(EnviromentConnection.port, () => {
      console.log(`Rethinkdb is connected!`);
      console.log(`PostgresSQL is connected!`);
      console.log(`App Express is running!`);
    });
  });
});

export { rethinkConnection, postgresConnection };
