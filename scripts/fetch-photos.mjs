import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const API = "https://api.openverse.org/v1/images/";
const UA = "openslot-demo/1.0 (static demo site)";

const COVERS = {
  blog: {
    "end-the-back-and-forth": "laptop email",
    "round-robin-vs-collective": "team meeting",
    "buffer-time-is-not-optional": "clock time",
    "introducing-team-pages": "coworker working",
    "how-we-handle-time-zones": "airport departure",
    "what-1-2-million-bookings-taught-us-about-no-shows": "empty chairs",
    "a-better-first-call": "phone call",
    "sms-reminders-are-live": "phone hands",
    "why-we-rebuilt-availability": "code developer",
    "interview-scheduling-playbook": "interview meeting",
    "embed-a-booking-page-anywhere": "laptop screen",
    "the-case-against-15-minute-meetings": "meeting room",
    "workflows-and-webhooks": "server technology",
    "2025-in-numbers": "chart data",
    "a-calendar-grid-you-can-use-with-a-keyboard": "keyboard typing",
    "meeting-polls": "group discussion",
  },
  resources: {
    "state-of-scheduling-2026": "documents paperwork",
    "scheduling-playbook-for-revenue-teams": "business handshake",
    "the-no-show-handbook": "waiting room",
    "remote-hiring-the-scheduling-chapter": "remote work home office",
    "the-meetings-audit-workbook": "notebook writing",
    "no-show-benchmarks-by-industry": "graph statistics",
    "scaling-interview-scheduling": "business people talking",
    "filling-clinic-calendars": "clinic doctor",
    "working-across-time-zones": "travel airport",
    "routing-forms-workshop": "whiteboard planning",
    "availability-rules-template-pack": "calendar diary",
    "interview-loop-scheduling-template": "office desk team",
    "first-call-agenda-templates": "coffee meeting",
    "openslot-fundamentals": "laptop learning",
    "accessible-booking-flows": "designer screen",
  },
};

const PEOPLE = {
  "mara-lindqvist": "business woman portrait smiling",
  "tomasz-wierzbicki": "business man",
  "priya-raman": "business woman meeting",
  "jonah-adebayo": "businessman",
  "elena-saenz": "business women",
  "ruth-kaplan": "senior business",
  "diego-ferreira": "businessman thinking",
  "hana-sato": "woman office",
  "olu-adeyemi": "man office",
  "ingrid-vos": "business woman office",
  "samir-haddad": "businessman call",
  "noor-farahani": "business woman smiling",
};


const PORTRAIT_WORDS = [
  "businessman",
  "businesswoman",
  "business man",
  "business woman",
  "business women",
  "senior business",
  "professional business",
  "portrait",
  "woman",
  "man",
  "people",
];

const PORTRAIT_REJECT = [
  "hand",
  "writing",
  "notebook",
  "typing",
  "keyboard",
  "paper",
  "document",
  "coffee",
  "desk",
  "laptop",
  "graph",
  "chart",
  "money",
  "bitcoin",
  "wedding",
];



const used = new Set();
const manifest = [];

const search = async (query, page = 1) => {
  const url = `${API}?q=${encodeURIComponent(query)}&source=stocksnap&extension=jpg&page_size=20&page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

const pick = async (query, minWidth, wants) => {
  for (let page = 1; page <= 4; page += 1) {
    const results = await search(query, page);
    for (const item of results) {
      if (used.has(item.id)) continue;
      if ((item.width ?? 0) < minWidth) continue;
      if (item.license !== "cc0" && item.license !== "pdm") continue;
      if (wants) {
        const title = (item.title ?? "").toLowerCase();
        if (!wants.some((word) => title.includes(word))) continue;
        if (PORTRAIT_REJECT.some((word) => title.includes(word))) continue;
      }
      used.add(item.id);
      return item;
    }
  }
  return null;
};

const dims = (file) => {
  const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], {
    encoding: "utf8",
  });
  const w = Number(out.match(/pixelWidth:\s*(\d+)/)[1]);
  const h = Number(out.match(/pixelHeight:\s*(\d+)/)[1]);
  return { w, h };
};

const fit = (file, targetW, targetH, gravity) => {
  execFileSync("magick", [
    file,
    "-resize",
    `${targetW}x${targetH}^`,
    "-gravity",
    gravity,
    "-extent",
    `${targetW}x${targetH}`,
    "-strip",
    "-quality",
    "82",
    file,
  ]);
};

const grab = async (query, out, targetW, targetH, label, gravity = "center", wants) => {
  if (existsSync(out) && process.env.REFETCH !== "1") return;
  const item = await pick(query, Math.min(Math.max(targetW, 1200), 1600), wants);
  if (!item) {
    console.log("MISS", label, `"${query}"`);
    return;
  }
  const res = await fetch(item.url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.log("FAIL", label, res.status);
    return;
  }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  fit(out, targetW, targetH, gravity);
  manifest.push({
    file: out,
    title: item.title,
    license: item.license,
    source: item.foreign_landing_url,
  });
  console.log("ok", label, `${(readFileSync(out).length / 1024) | 0}KB`);
};

for (const [kind, map] of Object.entries(COVERS)) {
  mkdirSync(`src/assets/${kind}`, { recursive: true });
  for (const [slug, query] of Object.entries(map)) {
    await grab(query, `src/assets/${kind}/${slug}.jpg`, 1600, 1000, `${kind}/${slug}`);
  }
}

mkdirSync("src/assets/people", { recursive: true });
for (const [slug, query] of Object.entries(PEOPLE)) {
  await grab(query, `src/assets/people/${slug}.jpg`, 640, 640, `people/${slug}`, "north", PORTRAIT_WORDS);
}

writeFileSync("src/assets/photo-credits.json", JSON.stringify(manifest, null, 2));
console.log("photos:", manifest.length);
