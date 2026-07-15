# Now Playing API

API de metadata para rádios web que transforma qualquer stream em JSON rico com a música atual, artista, álbum, capa, histórico e identificador do clipe no YouTube.

Este repositório funciona como documentação pública de um serviço voltado para quem precisa de dados de rádio em tempo real com qualidade, confiabilidade e integração simples em aplicações web, players e painéis.

## Endpoint principal de metadados

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

Retorna o estado atual da reprodução com metadados completos da faixa em execução.

## Dashboard e observabilidade

A experiência também conta com um painel público em:

- https://twj.es/dashboard

Ideal para acompanhar o estado do serviço, visualizar contexto operacional e validar o fluxo de uso em tempo real.

## Endpoint de busca de capa e contexto

Para enriquecimento de capa, álbum e contexto visual da música, o serviço também pode ser usado com busca de informações complementares, permitindo montar experiências mais ricas em players e interfaces.

## Exemplo de resposta

```json
{
  "songtitle": "Fernandinho - Nada Além do Sangue",
  "artist": "Fernandinho",
  "song": "Nada Além do Sangue",
  "album": "Uma Nova História",
  "albumArt": "https://.../600x600bb.jpg",
  "streamUrl": "https://music.apple.com/...",
  "youtubeId": "csPaNdL6ndA",
  "now_playing": {
    "elapsed": 124,
    "remaining": 137,
    "duration": 261
  },
  "song_history": []
}
```

## O que a API entrega

- `songtitle`, `artist`, `song`
- `album`, `year`, `albumArt`
- `streamUrl`
- `youtubeId`
- `now_playing` com `elapsed`, `remaining` e `duration`
- `song_history`

## Como funciona

A API recebe a URL de um stream de rádio, lê os metadados ICY e devolve um payload estruturado para players, aplicações web, integração de frontends e experiência de usuário em tempo real com alto nível de utilidade para quem consome o serviço.

## Casos de uso

- players de rádio web
- dashboards de programação
- widgets de música em tempo real
- integração com aplicações de entretenimento
- experiências com clipe sincronizado
- interfaces com capa, álbum e contexto visual enriquecido

## Documentação pública

A landing page com exemplo e testador ao vivo está em:

- [docs/index.html](docs/index.html)

## Nota importante

Este repositório não publica a implementação executável da API. O acesso ocorre exclusivamente por meio dos endpoints públicos disponíveis para consumo, com foco em documentação, visibilidade e uso prático.

## Palavras-chave

now playing api, api para radio, metadata api, radio web, icecast, shoutcast, api de música em tempo real, busca de capa, endpoint de metadados
