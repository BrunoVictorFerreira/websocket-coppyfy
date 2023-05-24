import { InitAll } from "./register";
const Socket = (io) => {
  io.on("connection", async function (client) {
    console.log("conectou")
    console.log("conectou 3")
    InitAll.map((callbacks) => callbacks(client));
  });
  
};

export default Socket;
