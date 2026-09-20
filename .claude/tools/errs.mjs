import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
const CHROME = (() => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const found = candidates.find((path) => existsSync(path));
  if (found) return found;
  console.error('Chrome not found. Set CHROME_PATH to your Chrome binary.');
  process.exit(1);
})();
const chrome = spawn(CHROME, ['--headless','--disable-gpu','--remote-debugging-port=9340','--window-size=1440,900','about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 4000));
const list = await (await fetch('http://127.0.0.1:9340/json/list')).json();
const sock = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pending = new Map(); const errs = [];
sock.addEventListener('message', e => { const m = JSON.parse(e.data);
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errs.push(m.params.entry.text);
  if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.text);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => sock.addEventListener('open', r, { once: true }));
const send = (m, p={}) => new Promise(res => { const i = ++id; pending.set(i, res); sock.send(JSON.stringify({id:i,method:m,params:p})); });
await send('Page.enable'); await send('Log.enable'); await send('Runtime.enable');
for (const u of process.argv.slice(2)) {
  await send('Page.navigate', { url: u });
  await new Promise(r => setTimeout(r, 2500));
}
console.log(errs.length ? errs.join('\n') : 'NO CONSOLE ERRORS');
sock.close(); chrome.kill(); process.exit(0);
