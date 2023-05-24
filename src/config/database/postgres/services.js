import { postgresConnection } from "../../..";

export async function findOne(documento, triagem) {
  const res = await postgresConnection.query(
    `SELECT * FROM telemedicina_sessions WHERE documento = '${documento}' and triagem = '${triagem}' and status <> 'FINALIZADO'`
  );

  return res.rows?.[0] ?? null;
}

export async function updateOne(connected, user, identification, history, id) {
  try {
    const res = await postgresConnection.query(
      `update telemedicina_sessions set connected = ${connected}, data_user = '${user}', identification = '${identification}', history = '${history}'  where id = ${id}`
    );
    return res;
  } catch (err) {
    console.log(err.stack);
    return null;
  }
}
