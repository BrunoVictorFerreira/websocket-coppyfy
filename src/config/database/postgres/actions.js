import { findOne, updateOne } from "./services";

export const FindOneSession = async (documento, triagem) => {
  return await findOne(documento, triagem);
};

export const UpdateOneSession = async (
  connected,
  user,
  identification,
  history,
  id
) => {
  return await updateOne(connected, user, identification, history, id);
};
