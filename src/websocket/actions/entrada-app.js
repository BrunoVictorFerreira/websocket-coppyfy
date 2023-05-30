export default function EntradaApp(socket) {
  socket.on("entrada_app", async (payload) => {
    console.log("payload")
    console.log(payload)
    socket.broadcast.emit(`entrada_app_response`, {
      type: "entrada_app_response",
      payload,
    });
  });
}
