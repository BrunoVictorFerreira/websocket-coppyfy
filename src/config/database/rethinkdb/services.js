import rethink from "rethinkdb";
import { rethinkConnection } from "../../..";

export const insert = async (tableName, obj) => {
  return await rethink.table(tableName).insert(obj).run(rethinkConnection);
};

export const FindOne = async (tableName, obj, callback = () => {}) => {
  await rethink
    .table(tableName)
    .filter({ ...obj })
    .filter(rethink.row("status").ne(`FINISHED`))
    .run(rethinkConnection, async function (err, cursor) {
      await cursor.toArray(function (err, res) {
        callback(res?.[0] ?? null);
      });
    });
};

export const update = async (tableName, compare, updated) => {
  return await rethink
    .table(tableName)
    .filter(compare)
    .update(updated)
    .run(rethinkConnection);
};
