import r from "rethinkdb";
import async from "async";
import { EnviromentConnection } from "../../enviroment";

export default function RethinkDBInit(callbackInit) {
  async.waterfall(
    [
      function connect(callback) {
        r.connect(EnviromentConnection.rethinkdb, callback);
      },
      function createDatabase(connection, callback) {
        //Create the database if needed.
        r.dbList()
          .contains(EnviromentConnection.rethinkdb.db)
          .do(function (containsDb) {
            return r.branch(
              containsDb,
              { created: 0 },
              r.dbCreate(EnviromentConnection.rethinkdb.db)
            );
          })
          .run(connection, function (err) {
            callback(err, connection);
          });
      },
      function createTable(connection, callback) {
        //Create the table if needed.
        r.tableList()
          .contains(EnviromentConnection.rethinkdb.tableName)
          .do(function (containsTable) {
            return r.branch(
              containsTable,
              { created: 0 },
              r.tableCreate(EnviromentConnection.rethinkdb.tableName)
            );
          })
          .run(connection, function (err) {
            callback(err, connection);
          });
      },
      function createIndex(connection, callback) {
        //Create the index if needed.
        r.table(EnviromentConnection.rethinkdb.tableName)
          .indexList()
          .contains("identification")
          .do(function (hasIndex) {
            return r.branch(
              hasIndex,
              { created: 0 },
              r
                .table(EnviromentConnection.rethinkdb.tableName)
                .indexCreate("identification")
            );
          })
          .run(connection, function (err) {
            callback(err, connection);
          });
      },
      function waitForIndex(connection, callback) {
        //Wait for the index to be ready.
        r.table(EnviromentConnection.rethinkdb.tableName)
          .indexWait("identification")
          .run(connection, function (err, result) {
            callback(err, connection);
          });
      },
    ],
    function (err, connection) {
      if (err) {
        console.error(err);
        process.exit(1);
        return;
      }

      callbackInit(connection);
    }
  );
}
