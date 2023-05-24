import { v4 as uuidv4 } from "uuid";
import { EnviromentConnection } from "../../enviroment";
import { FindOne, insert, update } from "./services";

export const CreateLogDrHoje = async (payload, callback) => {
  const { identification, status, symptoms, user, connected } = payload;

  const findResult = async (result) => {
    if (!result) {
      await insert(EnviromentConnection.rethinkdb.tableName, {
        id: uuidv4({
          node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          clockseq: 0x1234,
          msecs: new Date().getTime(),
          nsecs: 5678,
        }),
        identification: identification,
        user,
        status: status,
        send_sms: 0,
        max_sms_send: 3,
        reload_page: false,
        symptoms: null,
        created_at: new Date(),
        updated_at: new Date(),
        connected: true,
        history: [
          {
            created_at: new Date(),
            updated_at: new Date(),
            status: status,
            connected: true,
          },
        ],
        sms_send: [],
      });
    }

    if (result?.id) {
      const newHistory = [...result.history];
      newHistory.push({
        created_at: new Date(),
        updated_at: new Date(),
        status: status,
        connected,
      });
      update(
        EnviromentConnection.rethinkdb.tableName,
        { id: result.id },
        {
          status,
          connected,
          symptoms: symptoms ?? null,
          updated_at: new Date(),
          history: newHistory,
        }
      );
    }
    await FindOne(
      EnviromentConnection.rethinkdb.tableName,
      { identification },
      callback
    );
  };
  await FindOne(
    EnviromentConnection.rethinkdb.tableName,
    { identification },
    findResult
  );
};
export const UpdateLogDrHoje = async (payload) => {
  const { identification, connected } = payload;
  const findResult = async (result) => {
    if (result?.id) {
      const newHistory = [...result.history];
      newHistory.push({
        created_at: new Date(),
        updated_at: new Date(),
        status: result.status,
        connected,
      });
      update(
        EnviromentConnection.rethinkdb.tableName,
        { id: result.id },
        {
          connected,
          updated_at: new Date(),
          history: newHistory,
        }
      );
    }
  };
  await FindOne(
    EnviromentConnection.rethinkdb.tableName,
    { identification },
    findResult
  );
};

export const SendSMS = async () => {};

export const ReloadIntegracaoVideo = async () => {};

export const FinalizarAgendamento = async (identification) => {
  const result = await FindOne(EnviromentConnection.rethinkdb.tableName, {
    identification,
  });

  if (result?.id) {
    const newHistory = [...result.history];
    newHistory.push({
      created_at: new Date(),
      updated_at: new Date(),
      status: "FINISHED",
      connected: false,
    });
    update(
      EnviromentConnection.rethinkdb.tableName,
      { id: result.id },
      {
        connected: false,
        status: "FINISHED",
        updated_at: new Date(),
        history: newHistory,
      }
    );
  }
};
export const FindUserConnected = async (payload, callback = () => {}) => {
  return await FindOne(
    EnviromentConnection.rethinkdb.tableName,
    { identification: payload.identification },
    callback
  );
};
