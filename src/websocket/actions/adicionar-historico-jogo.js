export default function AdicionarHistoricooJogo(socket) {
  socket.on("adicionar_historico_jogo", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`adicionar_historico_jogo_response`, {
      type: "adicionar_historico_jogo_response",
      payload,
    });
  });
}
