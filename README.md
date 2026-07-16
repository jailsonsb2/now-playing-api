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
  "year": "2009",
  "albumArt": "https://.../600x600bb.jpg",
  "streamUrl": "https://music.apple.com/...",
  "youtubeId": "csPaNdL6ndA",
  "now_playing": {
    "elapsed": 124,
    "remaining": 137,
    "duration": 261
  },
  "song_history": [
    { "song": { "title": "Atos 2 (Ao Vivo)", "artist": "Gabriela Rocha", "youtubeId": "WWrU6LC_4ho" } }
  ]
}
```

### Comportamento do serviço (leia antes de integrar)

- **Primeira consulta de uma rádio** retorna `"Carregando..."` — a API começa a monitorar o stream naquele momento; continue o polling e os dados reais chegam em segundos.
- **Enriquecimento assíncrono:** o nome cru da música é publicado na hora; `albumArt` e `youtubeId` podem aparecer um ou dois polls depois. Para detectar atualizações, compare o `songtitle` **e** os campos de enriquecimento.
- **O ICY é lei:** `artist`/`song` são sempre o que a rádio transmitiu. O enriquecimento adiciona capa, álbum, ano, duração e links — nunca renomeia a faixa.
- **Cache e ETag:** respostas têm cache compartilhado de 5s e suportam `If-None-Match` (`304` gratuito). Faça polling a cada **10 segundos** por ouvinte.
- **Modo clipe:** use o `youtubeId` para exibir o clipe da música e `now_playing.elapsed` para abri-lo sincronizado (`&start={elapsed}` no embed). Cada item do `song_history` também traz seu `youtubeId` — histórico clicável.
- **Rádios sem ouvintes por 5 minutos** deixam de ser monitoradas e voltam automaticamente na próxima consulta.

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
  "year": "2009",
  "albumArt": "https://.../600x600bb.jpg",
  "streamUrl": "https://music.apple.com/...",
  "youtubeId": "csPaNdL6ndA",
  "now_playing": {
    "elapsed": 124,
    "remaining": 137,
    "duration": 261
  },
  "song_history": [
    { "song": { "title": "Atos 2 (Ao Vivo)", "artist": "Gabriela Rocha", "youtubeId": "WWrU6LC_4ho" } }
  ]
}
```

### Service behavior (read before integrating)

- **First request for a radio** returns `"Carregando..."` — the API starts monitoring that stream right then; keep polling and real data arrives within seconds.
- **Asynchronous enrichment:** the raw song name is published instantly; `albumArt` and `youtubeId` may appear one or two polls later. To detect updates, compare `songtitle` **and** the enrichment fields.
- **ICY is law:** `artist`/`song` are always what the radio broadcast. Enrichment adds cover, album, year, duration and links — it never renames the track.
- **Cache and ETag:** responses have a 5s shared cache and support `If-None-Match` (a free `304`). Poll every **10 seconds** per listener.
- **Clip mode:** use `youtubeId` to show the music video and `now_playing.elapsed` to open it synchronized (`&start={elapsed}` on the embed). Each `song_history` item also carries its own `youtubeId` — clickable history.
- **Radios with no listeners for 5 minutes** stop being monitored and resume automatically on the next request.

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
  "year": "2009",
  "albumArt": "https://.../600x600bb.jpg",
  "streamUrl": "https://music.apple.com/...",
  "youtubeId": "csPaNdL6ndA",
  "now_playing": {
    "elapsed": 124,
    "remaining": 137,
    "duration": 261
  },
  "song_history": [
    { "song": { "title": "Atos 2 (Ao Vivo)", "artist": "Gabriela Rocha", "youtubeId": "WWrU6LC_4ho" } }
  ]
}
```

### Comportamiento del servicio (lee antes de integrar)

- **La primera consulta de una radio** devuelve `"Carregando..."` — la API empieza a monitorear el stream en ese momento; sigue consultando y los datos reales llegan en segundos.
- **Enriquecimiento asíncrono:** el nombre crudo de la canción se publica al instante; `albumArt` y `youtubeId` pueden aparecer uno o dos sondeos después. Para detectar actualizaciones, compara `songtitle` **y** los campos de enriquecimiento.
- **El ICY es ley:** `artist`/`song` son siempre lo que la radio transmitió. El enriquecimiento añade portada, álbum, año, duración y enlaces — nunca renombra la pista.
- **Caché y ETag:** las respuestas tienen caché compartida de 5s y soportan `If-None-Match` (`304` gratuito). Consulta cada **10 segundos** por oyente.
- **Modo clip:** usa `youtubeId` para mostrar el vídeo musical y `now_playing.elapsed` para abrirlo sincronizado (`&start={elapsed}` en el embed). Cada elemento de `song_history` también trae su `youtubeId` — historial clicable.
- **Las radios sin oyentes durante 5 minutos** dejan de monitorearse y vuelven automáticamente en la siguiente consulta.

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

## Players gratuitos que já usam esta API / Free players using this API

| Player | Estilo / Style |
|---|---|
| [**RadioPlayer**](https://github.com/jailsonsb2/RadioPlayer) | Player de página cheia com modo clipe e histórico clicável |
| [**Radioplayer_api**](https://github.com/jailsonsb2/Radioplayer_api) | Multi-estação com 3 layouts prontos |
| [**bottom_radioplayer**](https://github.com/jailsonsb2/bottom_radioplayer) | Componente de rodapé — o áudio não para ao navegar |
| [**RadioPlayer-ZenoRadio**](https://github.com/jailsonsb2/RadioPlayer-ZenoRadio) | Player de página cheia para streams Zeno.FM |

## Nota importante

Este repositório não publica a implementação executável da API. Ele documenta apenas o serviço hospedado e os endpoints públicos para consumo.

## Palavras-chave

now playing api, api para radio, metadata api, radio web, icecast, shoutcast, zeno.fm, api de música em tempo real, busca de capa, endpoint de metadados
