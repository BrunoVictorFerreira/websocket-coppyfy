export default function SaidaApp(socket) {
  socket.on("saida_app", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`saida_app_response`, {
      type: "saida_app_response",
      payload,
    });
  });
}
