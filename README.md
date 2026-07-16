# Now Playing API

API de metadata hospedada para rádios web do mundo inteiro, com consumo via endpoint público e documentação voltada para integração rápida em players, painéis e aplicações.

## Visão geral

- Endpoint hospedado: `https://api.twj.es`
- Suporte a streams Icecast, Shoutcast, Zeno.FM e outras rádios web
- Retorna metadados em tempo real, capa, histórico e contexto visual
- `search.php` disponível para busca de capa, álbum e correspondência de faixas

## Endpoints públicos

### Metadata agora tocando

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

Retorna o estado atual da reprodução, com dados da faixa em execução.

### Busca de capa e contexto

```bash
curl "https://api.twj.es/search.php?query=Ministério%20Vineyard%20-%20Tu%20És%20Bom"
```

Use o parâmetro `query` com artista e título. A resposta traz:

- `results` — melhor correspondência encontrada
- `other_matches` — alternativas relevantes ordenadas por similaridade

Os campos `artwork` e `stream_url` são URLs diretas, não markdown.

```json
"artwork": "https://i.scdn.co/image/ab67616d0000b273f7180d5f9061ef30de929f7e",
"stream_url": "https://open.spotify.com/track/05FaR9FTuCSEpiPqU6f1A2"
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

## O que entra e o que sai

- Entrada: `url` do stream de rádio
- Saída: metadados estruturados com `songtitle`, `artist`, `song`, `album`, `albumArt`, `streamUrl`, `youtubeId`, `now_playing`, `song_history`
- Busca adicional: `search.php` para capa, álbum e dados de contexto

## Como usar

### Exemplo em JavaScript

```js
const streamUrl = 'https://stream.zeno.fm/yn65fsaurfhvv';
const response = await fetch(`https://api.twj.es/?url=${encodeURIComponent(streamUrl)}`);
const payload = await response.json();
console.log(payload);
```

### Exemplo em shell

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

## Observabilidade e dashboard

Painel público:

- https://twj.es/dashboard

Use-o para verificar o estado do serviço, testar endpoints e acompanhar métricas de operação.

## Casos de uso

- players de rádio web modernos
- widgets de programação ao vivo
- dashboards de emissoras
- experiências com capa, histórico e clipe de vídeo
- integrações em painéis e aplicativos de entretenimento

## Documentação pública

A landing page oficial está em português, inglês e espanhol:

- [docs/index.html](docs/index.html)

## Nota importante

Este repositório não publica a implementação executável da API. Ele documenta apenas o serviço hospedado e os endpoints públicos para consumo.

## Palavras-chave

now playing api, api para radio, metadata api, radio web, icecast, shoutcast, zeno.fm, api de música em tempo real, busca de capa, endpoint de metadados
