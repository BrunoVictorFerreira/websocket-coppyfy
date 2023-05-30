export default function AdicionarResultadoJogo(socket) {
  socket.on("adicionar_resultado_jogo", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`adicionar_resultado_jogo_response`, {
      type: "adicionar_resultado_jogo_response",
      payload,
    });
  });
}
