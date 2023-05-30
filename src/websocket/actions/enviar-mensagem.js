export default function EnviarMensagem(socket) {
  socket.on("enviar_mensagem", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`enviar_mensagem_response`, {
      type: "enviar_mensagem_response",
      payload,
    });
  });
}
