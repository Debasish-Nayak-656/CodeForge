// CodeForge — app.js (Full-stack, native backend)

const API = 'http://localhost:5000/api';
let currentJobId = null;
let isRunning    = false;

// ── DOM ──────────────────────────────────────────────────────
const editor    = document.getElementById('code-editor');
const stdinEl   = document.getElementById('stdin');
const outputEl  = document.getElementById('output');
const langSel   = document.getElementById('lang-select');
const runBtn    = document.getElementById('run-btn');
const stopBtn   = document.getElementById('stop-btn');
const lnumsEl  = document.getElementById('lnums');
const sbDot    = document.getElementById('sb-dot');
const sbLang   = document.getElementById('sb-lang');
const sbMsg    = document.getElementById('sb-msg');
const sbLines  = document.getElementById('sb-lines');
const sbChars  = document.getElementById('sb-chars');
const execTime = document.getElementById('exec-time');
const outBadge = document.getElementById('out-badge');
const fnameEl  = document.getElementById('fname');
const chipLang = document.getElementById('chip-lang');

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  updateLineNumbers();
  updateStatusBar();
  renderSnippetBtns();
  initResizer();
  initTheme();
  initAccents();
  checkServerConnection();
  setInterval(checkServerConnection, 15000);
});

// ── SERVER CONNECTION CHECK ──────────────────────────────────
async function checkServerConnection() {
  const dot   = document.getElementById('server-dot');
  const label = document.getElementById('server-label');
  try {
    const res = await fetch(`${API}/languages`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      dot.className   = 'server-dot online';
      label.textContent = 'Server Online';
    } else throw new Error();
  } catch {
    dot.className   = 'server-dot offline';
    label.textContent = 'Server Offline';
  }
}

// ── LANGUAGE CHANGE ──────────────────────────────────────────
function onLangChange() {
  const lang = langSel.value;
  const meta = LANG_META[lang] || { name: lang, file: 'main.txt' };
  fnameEl.textContent  = meta.file;
  chipLang.textContent = meta.name;
  sbLang.textContent   = meta.name;
  const code = getCode(lang, 'hello');
  if (code) editor.value = code;
  stdinEl.value = 'World';
  clearOutput();
  updateLineNumbers();
  updateStatusBar();
  renderSnippetBtns();
}

// ── SNIPPETS ─────────────────────────────────────────────────
function renderSnippetBtns() {
  const row = document.getElementById('snip-row');
  row.innerHTML = '';
  const items = [
    { key: 'hello',     label: 'Hello World' },
    { key: 'fibonacci', label: 'Fibonacci'   },
    { key: 'fileio',    label: 'File I/O ✅'  },
    { key: 'network',   label: 'HTTP Req ✅'  },
  ];
  items.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className   = 'snip-btn';
    btn.textContent = label;
    btn.onclick     = () => loadSnippet(key);
    row.appendChild(btn);
  });
}

function loadSnippet(key) {
  const lang = langSel.value;
  const code = getCode(lang, key);
  if (code) {
    editor.value    = code;
    stdinEl.value   = SNIP_STDIN[key] || '';
    clearOutput();
    updateLineNumbers();
    updateStatusBar();
    editor.focus();
  } else {
    showToast('⚠️ No snippet for this language — write your own!');
  }
}

// ── RUN CODE ─────────────────────────────────────────────────
async function runCode() {
  if (isRunning) return;
  const code = editor.value.trim();
  if (!code) { showToast('⚠️ Write some code first!'); return; }

  isRunning = true;
  setRunState('running');

  const language  = langSel.value;
  const stdin     = stdinEl.value;
  const timeout   = parseInt(document.getElementById('timeout-sel').value);
  const startTime = Date.now();
  currentJobId    = `job_${Date.now()}`;

  try {
    const res = await fetch(`${API}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code, stdin, timeout, jobId: currentJobId }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${res.status}`);
    }

    const result  = await res.json();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    execTime.textContent = `${elapsed}s`;

    if (result.killed) {
      setOutput('error', '// ⏹ Process was stopped or killed.');
      setBadge('err', '⏹ Killed');
      setRunState('error', 'Killed');
    } else if (result.stage === 'compile' && !result.success) {
      setOutput('error', `// ✗ COMPILE ERROR\n\n${result.stderr || result.stdout || 'Unknown compile error'}`);
      setBadge('err', '✗ Compile Error');
      setRunState('error', 'Compile error');
    } else if (result.success && result.stdout) {
      setOutput('success', result.stdout);
      setBadge('ok', `✓ Exit 0`);
      setRunState('ready', `Done in ${elapsed}s`);
    } else if (result.stdout) {
      setOutput('success', result.stdout);
      setBadge('ok', `✓ Exit ${result.exitCode}`);
      setRunState('ready', `Done in ${elapsed}s`);
    } else if (result.stderr) {
      setOutput('error', `// RUNTIME ERROR (exit ${result.exitCode})\n\n${result.stderr}`);
      setBadge('err', `✗ Exit ${result.exitCode}`);
      setRunState('error', 'Runtime error');
    } else {
      setOutput('success', `// Program exited with code ${result.exitCode} (no output)`);
      setBadge('ok', `✓ Exit ${result.exitCode}`);
      setRunState('ready', `Done in ${elapsed}s`);
    }

  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    if (err.message.includes('fetch') || err.message.includes('Failed')) {
      setOutput('error',
`// ⚠️ Cannot connect to CodeForge server!
//
// The backend server is not running.
// To start it:
//
//   1. Open a terminal in the 'backend' folder
//   2. Run: npm install
//   3. Run: npm start
//   4. Server will start at http://localhost:5000
//
// Then refresh this page and try again.`);
    } else {
      setOutput('error', `// Error: ${err.message}`);
    }
    setBadge('err', '✗ Error');
    setRunState('error', 'Error');
  }

  isRunning    = false;
  currentJobId = null;
}

// ── STOP ─────────────────────────────────────────────────────
async function stopCode() {
  if (!isRunning) return;
  try {
    await fetch(`${API}/kill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: currentJobId }),
    });
    showToast('⏹ Process stopped');
  } catch {
    showToast('⚠️ Could not stop process');
  }
}

// ── OUTPUT HELPERS ───────────────────────────────────────────
function setOutput(state, text) {
  outputEl.innerHTML  = '';
  outputEl.className  = `output-box state-${state}`;
  outputEl.textContent = text;
}

function clearOutput() {
  outputEl.className  = 'output-box state-idle';
  outputEl.innerHTML  = `<div class="out-ph"><div class="ph-icon">▶</div><p>Press <b>Run</b> or <kbd>Ctrl+Enter</kbd></p><p class="ph-sub">Runs natively — no limits!</p></div>`;
  outBadge.className  = 'out-badge';
  outBadge.textContent = '';
  execTime.textContent = '';
}

function setBadge(type, text) {
  outBadge.className  = `out-badge ${type}`;
  outBadge.textContent = text;
}

// ── RUN STATE ────────────────────────────────────────────────
function setRunState(state, msg = '') {
  sbDot.dataset.state  = state;
  sbMsg.textContent    = msg || (state === 'ready' ? 'Ready' : state === 'running' ? 'Running...' : 'Error');
  if (state === 'running') {
    runBtn.disabled     = true;
    runBtn.innerHTML    = '<span class="spinner">⟳</span> Running...';
    stopBtn.style.display = 'flex';
    setOutput('running', '// ⟳ Compiling and running on your machine...\n// No time limits. No sandboxing.');
    setBadge('run', '⟳ Running');
  } else {
    runBtn.disabled       = false;
    runBtn.innerHTML      = '▶ Run <small>Ctrl+↵</small>';
    stopBtn.style.display = 'none';
  }
}

// ── LINE NUMBERS ─────────────────────────────────────────────
function updateLineNumbers() {
  const lines = editor.value.split('\n').length;
  lnumsEl.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

function updateStatusBar() {
  sbLines.textContent = `Lines: ${editor.value.split('\n').length}`;
  sbChars.textContent = `Chars: ${editor.value.length}`;
}

// ── EDITOR EVENTS ────────────────────────────────────────────
editor.addEventListener('input', () => { updateLineNumbers(); updateStatusBar(); });
editor.addEventListener('scroll', () => { lnumsEl.scrollTop = editor.scrollTop; });
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = editor.selectionStart, end = editor.selectionEnd;
    editor.value = editor.value.substring(0, s) + '  ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = s + 2;
    updateLineNumbers();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
  const pairs = { '(':')', '[':']', '{':'}', '"':'"', "'":"'" };
  if (pairs[e.key]) {
    const s = editor.selectionStart, end = editor.selectionEnd;
    if (s === end) {
      e.preventDefault();
      editor.value = editor.value.substring(0, s) + e.key + pairs[e.key] + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = s + 1;
    }
  }
});

// ── TOOLBAR ──────────────────────────────────────────────────
function copyCode()     { navigator.clipboard.writeText(editor.value).then(() => showToast('✅ Copied!')); }
function clearCode()    { editor.value = ''; updateLineNumbers(); updateStatusBar(); clearOutput(); editor.focus(); }
function setFontSize(v) { editor.style.fontSize = v + 'px'; lnumsEl.style.fontSize = v + 'px'; }

function downloadCode() {
  const lang = langSel.value;
  const meta = LANG_META[lang] || { file: 'code.txt' };
  const blob = new Blob([editor.value], { type: 'text/plain' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = meta.file;
  a.click();
  showToast(`⬇️ Downloaded as ${meta.file}`);
}

// ── CHECK RUNTIMES ───────────────────────────────────────────
async function checkRuntimes() {
  document.getElementById('runtime-overlay').style.display = 'flex';
  const body = document.getElementById('runtime-body');
  body.innerHTML = '<p style="color:var(--text-muted)">Checking your system for installed runtimes...</p>';
  try {
    const res  = await fetch(`${API}/check`);
    const data = await res.json();
    const grid = document.createElement('div');
    grid.className = 'runtime-grid';
    const labels = {
      python3:'Python 3', python2:'Python 2', node:'Node.js', 'g++':'G++ (C++)',
      gcc:'GCC (C)', java:'Java', rustc:'Rust', go:'Go', ruby:'Ruby', php:'PHP',
      mono:'C# (Mono)', kotlin:'Kotlin', swift:'Swift', bash:'Bash', perl:'Perl',
      lua:'Lua', Rscript:'R', ghc:'Haskell', scala:'Scala', elixir:'Elixir',
      groovy:'Groovy', sqlite3:'SQLite', tsc:'TypeScript',
    };
    Object.entries(data).forEach(([key, val]) => {
      const card = document.createElement('div');
      const ok   = val.installed;
      card.className = `runtime-card ${ok ? 'ok' : 'fail'}`;
      card.innerHTML = `
        <div class="rc-dot ${ok ? 'ok' : 'fail'}"></div>
        <div class="rc-info">
          <div class="rc-name">${labels[key] || key}</div>
          <div class="rc-ver">${ok ? val.version : 'Not installed'}</div>
        </div>`;
      grid.appendChild(card);
    });
    body.innerHTML = '';
    const installed = Object.values(data).filter(v => v.installed).length;
    const total     = Object.keys(data).length;
    const summary   = document.createElement('p');
    summary.style.cssText = 'color:var(--text-secondary);margin-bottom:12px;';
    summary.innerHTML = `<b style="color:var(--green)">${installed}</b> of <b>${total}</b> runtimes installed on your machine.`;
    body.appendChild(summary);
    body.appendChild(grid);
  } catch {
    body.innerHTML = `<p style="color:var(--red)">⚠️ Could not reach server. Make sure it's running on port 5000.</p>`;
  }
}

function closeRuntimeModal() { document.getElementById('runtime-overlay').style.display = 'none'; }

// ── INSTALL PACKAGE ──────────────────────────────────────────
function openInstallModal()  { document.getElementById('install-overlay').style.display = 'flex'; }
function closeInstallModal() { document.getElementById('install-overlay').style.display = 'none'; }

async function installPackage() {
  const manager  = document.getElementById('pkg-manager').value;
  const pkgs     = document.getElementById('pkg-names').value.trim();
  if (!pkgs) { showToast('⚠️ Enter package names'); return; }

  const outDiv = document.getElementById('install-output');
  outDiv.style.display = 'block';
  outDiv.textContent   = `Installing ${pkgs}...\n`;

  try {
    const res = await fetch(`${API}/install`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manager, packages: pkgs.split(/\s+/) }),
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      outDiv.textContent += decoder.decode(value);
      outDiv.scrollTop = outDiv.scrollHeight;
    }
  } catch (e) {
    outDiv.textContent += `\n⚠️ Error: ${e.message}`;
  }
}

// ── RESIZER ──────────────────────────────────────────────────
function initResizer() {
  const resizer = document.getElementById('resizer');
  const rightPane = document.getElementById('right-pane');
  let dragging = false, startX = 0, startW = 0;
  resizer.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX; startW = rightPane.offsetWidth;
    resizer.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const newW = Math.min(Math.max(startW + (startX - e.clientX), 240), window.innerWidth - 300);
    rightPane.style.width = newW + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false; resizer.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

// ── THEME / ACCENTS ──────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('cf_theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  document.getElementById('theme-btn').textContent = saved === 'dark' ? '🌙' : '☀️';
  document.getElementById('theme-btn').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('cf_theme', next);
    document.getElementById('theme-btn').textContent = next === 'dark' ? '🌙' : '☀️';
  });
}

function initAccents() {
  const saved = localStorage.getItem('cf_accent') || 'purple';
  setAccent(saved);
  document.querySelectorAll('.ac').forEach(btn => {
    btn.addEventListener('click', () => { setAccent(btn.dataset.accent); localStorage.setItem('cf_accent', btn.dataset.accent); });
  });
}

function setAccent(accent) {
  document.documentElement.dataset.accent = accent;
  document.querySelectorAll('.ac').forEach(b => b.classList.toggle('active', b.dataset.accent === accent));
}

// ── TOAST ────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// Close modals on overlay click
['runtime-overlay','install-overlay'].forEach(id => {
  document.getElementById(id).addEventListener('click', e => {
    if (e.target.id === id) document.getElementById(id).style.display = 'none';
  });
});
