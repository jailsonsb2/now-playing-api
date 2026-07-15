# Now Playing API

Este repositório é exclusivamente uma documentação pública da API Now Playing, hospedada em:

https://api.twj.es/?url=https%3A%2F%2Fstream.zeno.fm%2Fyn65fsaurfhvv

A API é disponibilizada para consumo e não possui o código-fonte publicado aqui. O objetivo deste repositório é explicar como o serviço funciona, mostrar exemplos de uso e dar visibilidade ao trabalho.

## Como consumir

Faça uma requisição GET para o endpoint hospedado:

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

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

A API recebe a URL de um stream de rádio, lê os metadados ICY do fluxo e devolve um JSON rico para players, aplicações web e integrações.

## Documentação pública

A landing page com exemplo e testador ao vivo está em:

- [docs/index.html](docs/index.html)

## Nota importante

Este repositório não publica a implementação executável da API. O acesso ocorre exclusivamente pelo endpoint hospedado em OCI.
