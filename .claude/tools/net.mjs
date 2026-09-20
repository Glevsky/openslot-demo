import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
const CHROME = (() => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) { console.error('Chrome not found'); process.exit(1); }
  return found;
})();
const urls = process.argv.slice(2);
const chrome = spawn(CHROME, ['--headless','--disable-gpu','--hide-scrollbars',
  '--remote-debugging-port=9347','--window-size=1440,900','about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 4000));
const list = await (await fetch('http://127.0.0.1:9347/json/list')).json();
const sock = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pending = new Map(); const failures = [];
sock.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) {
    failures.push(`${m.params.response.status} ${m.params.response.url}`);
  }
  if (m.method === 'Network.loadingFailed') {
    failures.push(`FAILED ${m.params.errorText} ${m.params.type}`);
  }
});
await new Promise(r => sock.addEventListener('open', r, { once: true }));
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res);
  sock.send(JSON.stringify({ id: i, method, params })); });
await send('Network.enable'); await send('Page.enable');
for (const url of urls) {
  failures.length = 0;
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2200));
  const unique = [...new Set(failures)];
  console.log(unique.length ? `${url}\n  ${unique.join('\n  ')}` : `${url}  ok`);
}
sock.close(); chrome.kill(); process.exit(0);
