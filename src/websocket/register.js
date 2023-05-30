import AdicionarJogo from "./actions/adicionar-jogo";
import AdicionarResultadoJogo from "./actions/adicionar-resultado-jogo";
import AdicionarHistoricoJogo from "./actions/adicionar-historico-jogo";
import EntradaApp from "./actions/entrada-app";
import SaidaApp from "./actions/saida-app";
import EnviarMensagem from "./actions/enviar-mensagem";

export const InitAll = [
  AdicionarJogo,
  AdicionarHistoricoJogo,
  AdicionarResultadoJogo,
  EntradaApp,
  SaidaApp,
  EnviarMensagem
];
