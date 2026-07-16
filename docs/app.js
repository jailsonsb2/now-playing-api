const form = document.getElementById('tester-form');
const apiBaseUrlInput = document.getElementById('api-base-url');
const streamUrlInput = document.getElementById('stream-url');
const output = document.getElementById('response-output');
const status = document.getElementById('status');
const copyButton = document.getElementById('copy-json');
const langButtons = document.querySelectorAll('.lang-btn');
const langBlocks = document.querySelectorAll('.lang-block');

function setLanguage(lang) {
  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
  langBlocks.forEach((block) => {
    block.classList.toggle('hidden', !block.classList.contains(`lang-${lang}`));
  });
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  localStorage.setItem('nowPlayingDocsLang', lang);
}

const savedLang = localStorage.getItem('nowPlayingDocsLang') || 'pt';
setLanguage(savedLang);

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const apiBaseUrl = apiBaseUrlInput.value.trim();
  const streamUrl = streamUrlInput.value.trim();

  if (!apiBaseUrl || !streamUrl) {
    status.textContent = 'Informe a URL base da API e a URL do stream.';
    output.textContent = '{}';
    return;
  }

  const requestUrl = `${apiBaseUrl}/?url=${encodeURIComponent(streamUrl)}`;
  status.textContent = `Consultando ${requestUrl}…`;
  output.textContent = 'Carregando…';

  try {
    const response = await fetch(requestUrl, { method: 'GET' });
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    output.textContent = JSON.stringify(parsed, null, 2);
    status.textContent = response.ok ? 'Resposta recebida com sucesso.' : `Erro ${response.status}`;
  } catch (error) {
    output.textContent = JSON.stringify({ error: error.message }, null, 2);
    status.textContent = 'Falha na requisição. Verifique o CORS ou a URL da API.';
  }
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    status.textContent = 'JSON copiado para a área de transferência.';
  } catch {
    status.textContent = 'Não foi possível copiar automaticamente.';
  }
});
