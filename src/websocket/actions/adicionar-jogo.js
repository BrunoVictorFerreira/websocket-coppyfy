export default function AdicionarJogo(socket) {
  socket.on("adicionar_jogo", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`adicionar_jogo_response`, {
      type: "adicionar_jogo_response",
      payload,
    });
  });
}
