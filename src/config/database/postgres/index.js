import { Client } from "pg";
import { EnviromentConnection } from "../../enviroment";

export default function (callback) {
  const client = new Client({
    host: EnviromentConnection.postgres.host,
    port: EnviromentConnection.postgres.port,
    database: EnviromentConnection.postgres.db,
    user: EnviromentConnection.postgres.user,
    password: EnviromentConnection.postgres.password,
  });

  client.connect((err) => {
    if (err) {
      callback(null);
    } else {
      callback(client);
    }
  });
}
