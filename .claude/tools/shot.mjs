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
const [, , url, out, w = '1440'] = process.argv;
const width = Number(w);

const chrome = spawn(CHROME, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9333', `--window-size=${width},900`, 'about:blank'
], { stdio: 'ignore' });

await new Promise(r => setTimeout(r, 4000));
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const target = list.find(t => t.type === 'page');

const sock = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
sock.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
});
await new Promise(r => sock.addEventListener('open', r, { once: true }));
const send = (method, params = {}) => new Promise(res => {
  const i = ++id; pending.set(i, res);
  sock.send(JSON.stringify({ id: i, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
await new Promise(r => setTimeout(r, 3500));
const measure = async () => (await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true })).result.value;
let height = await measure();
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
await new Promise(r => setTimeout(r, 1500));
height = await measure();
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
await new Promise(r => setTimeout(r, 800));
const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(out, width + 'x' + height);
sock.close(); chrome.kill(); process.exit(0);
