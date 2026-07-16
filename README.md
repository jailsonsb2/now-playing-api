# Now Playing API

## Português

API de metadata hospedada para rádios web do mundo inteiro, com consumo via endpoint público e documentação voltada para integração rápida em players, painéis e aplicações.

### Visão geral

- Endpoint hospedado: `https://api.twj.es`
- Suporte a streams Icecast, Shoutcast, Zeno.FM e outras rádios web
- Retorna metadados em tempo real, capa, histórico e contexto visual
- `search.php` disponível para busca de capa, álbum e correspondência de faixas

### Endpoints públicos

#### Metadata agora tocando

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

Retorna o estado atual da reprodução, com dados da faixa em execução.

#### Busca de capa e contexto

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

### Exemplo de resposta

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

### Como usar

#### Exemplo em JavaScript

```js
const streamUrl = 'https://stream.zeno.fm/yn65fsaurfhvv';
const response = await fetch(`https://api.twj.es/?url=${encodeURIComponent(streamUrl)}`);
const payload = await response.json();
console.log(payload);
```

#### Exemplo em shell

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

### Observabilidade e dashboard

Painel público:

- https://twj.es/dashboard

Use-o para verificar o estado do serviço, testar endpoints e acompanhar métricas de operação.

---

## English

Hosted metadata API for web radios worldwide, accessible via a public endpoint and documented for fast integration in players, dashboards and applications.

### Overview

- Hosted endpoint: `https://api.twj.es`
- Supports Icecast, Shoutcast, Zeno.FM and other web radio streams
- Returns real-time metadata, cover art, history, and visual context
- `search.php` available for cover art, album and track context search

### Public endpoints

#### Current metadata

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

Returns the current playback state with the playing track information.

#### Cover and context search

```bash
curl "https://api.twj.es/search.php?query=Ministério%20Vineyard%20-%20Tu%20És%20Bom"
```

Use the `query` parameter with artist and title. The response includes:

- `results` — best match found
- `other_matches` — relevant alternatives ordered by similarity

Fields like `artwork` and `stream_url` are direct URLs, not markdown.

#### Example response

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

### Usage

#### JavaScript example

```js
const streamUrl = 'https://stream.zeno.fm/yn65fsaurfhvv';
const response = await fetch(`https://api.twj.es/?url=${encodeURIComponent(streamUrl)}`);
const payload = await response.json();
console.log(payload);
```

#### Shell example

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

### Observability and dashboard

Public dashboard:

- https://twj.es/dashboard

Use it to verify service status, test endpoints and monitor operation metrics.

---

## Español

API de metadatos alojada para radios web de todo el mundo, accesible mediante un endpoint público y documentada para integración rápida en reproductores, paneles y aplicaciones.

### Visión general

- Endpoint alojado: `https://api.twj.es`
- Compatible con streams Icecast, Shoutcast, Zeno.FM y otras radios web
- Devuelve metadatos en tiempo real, portada, historial y contexto visual
- `search.php` disponible para buscar portada, álbum y contexto de canciones

### Endpoints públicos

#### Metadatos en tiempo real

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

Devuelve el estado actual de reproducción con la información de la pista en reproducción.

#### Búsqueda de portada y contexto

```bash
curl "https://api.twj.es/search.php?query=Ministério%20Vineyard%20-%20Tu%20És%20Bom"
```

Usa el parámetro `query` con artista y título. La respuesta incluye:

- `results` — mejor coincidencia encontrada
- `other_matches` — alternativas relevantes ordenadas por similitud

Campos como `artwork` y `stream_url` son URLs directas, no markdown.

#### Ejemplo de respuesta

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

### Cómo usar

#### Ejemplo en JavaScript

```js
const streamUrl = 'https://stream.zeno.fm/yn65fsaurfhvv';
const response = await fetch(`https://api.twj.es/?url=${encodeURIComponent(streamUrl)}`);
const payload = await response.json();
console.log(payload);
```

#### Ejemplo en shell

```bash
curl "https://api.twj.es/?url=https://stream.zeno.fm/yn65fsaurfhvv"
```

### Observabilidad y panel

Panel público:

- https://twj.es/dashboard

Úsalo para verificar el estado del servicio, probar endpoints y seguir métricas de operación.

---

## Documentação pública

A landing page oficial está em português, inglês e espanhol:

- [docs/index.html](docs/index.html)

## Nota importante

Este repositório não publica a implementação executável da API. Ele documenta apenas o serviço hospedado e os endpoints públicos para consumo.

## Palavras-chave

now playing api, api para radio, metadata api, radio web, icecast, shoutcast, zeno.fm, api de música em tempo real, busca de capa, endpoint de metadados
