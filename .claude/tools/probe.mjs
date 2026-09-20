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
const width = Number(process.argv[4]) || 1440;
const chrome = spawn(CHROME, ['--headless','--disable-gpu','--remote-debugging-port=9338',`--window-size=${width},900`,'about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 4000));
const list = await (await fetch('http://127.0.0.1:9338/json/list')).json();
const sock = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pending = new Map();
sock.addEventListener('message', e => { const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => sock.addEventListener('open', r, { once: true }));
const send = (m, p = {}) => new Promise(res => { const i = ++id; pending.set(i, res); sock.send(JSON.stringify({ id: i, method: m, params: p })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
await send('Page.navigate', { url: process.argv[2] });
await new Promise(r => setTimeout(r, 3500));
const r = await send('Runtime.evaluate', { expression: process.argv[3], returnByValue: true });
console.log(JSON.stringify(r.result.value, null, 2));
sock.close(); chrome.kill(); process.exit(0);
