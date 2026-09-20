import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
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
const [, , url, selector, out, pad = '30', scale = '4'] = process.argv;
const chrome = spawn(CHROME, ['--headless','--disable-gpu','--hide-scrollbars',
  '--remote-debugging-port=9336','--window-size=1440,900','about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 4000));
const list = await (await fetch('http://127.0.0.1:9336/json/list')).json();
const sock = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pending = new Map();
sock.addEventListener('message', e => { const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => sock.addEventListener('open', r, { once: true }));
const send = (m, p = {}) => new Promise(res => { const i = ++id; pending.set(i, res);
  sock.send(JSON.stringify({ id: i, method: m, params: p })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url });
await new Promise(r => setTimeout(r, 3500));
const { cssContentSize } = await send('Page.getLayoutMetrics');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: Math.ceil(cssContentSize.height), deviceScaleFactor: 1, mobile: false });
await new Promise(r => setTimeout(r, 1200));
const r = await send('Runtime.evaluate', { expression:
  `(()=>{const e=document.querySelector(${JSON.stringify(selector)});const b=e.getBoundingClientRect();
   return JSON.stringify({x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:b.height});})()`, returnByValue: true });
const b = JSON.parse(r.result.value); const P = Number(pad);
const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
  clip: { x: b.x - P, y: b.y - P, width: b.width + P*2, height: b.height + P*2, scale: Number(scale) } });
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(out);
sock.close(); chrome.kill(); process.exit(0);
