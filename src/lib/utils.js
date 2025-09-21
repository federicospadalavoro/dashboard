import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

let estremi = {
    temperatura: [
      null,
      { min: 7.0, media: 10.4, max: 13.8 },
      { min: 6.6, media: 10.3, max: 14.0 },
      { min: 8.1, media: 12.2, max: 16.2 },
      { min: 10.4, media: 14.7, max: 19.0 },
      { min: 13.9, media: 18.6, max: 23.2 },
      { min: 18.0, media: 22.9, max: 27.8 },
      { min: 20.7, media: 25.7, max: 30.7 },
      { min: 21.5, media: 26.3, max: 31.2 },
      { min: 18.7, media: 23.0, max: 27.3 },
      { min: 15.6, media: 19.6, max: 23.5 },
      { min: 11.8, media: 15.3, max: 18.9 },
      { min: 8.5, media: 11.8, max: 15.1 },
    ],
    pioggia: [
      null,
      { min: 40, media: 65, max: 90 },
      { min: 35, media: 55, max: 75 },
      { min: 30, media: 50, max: 70 },
      { min: 20, media: 35, max: 50 },
      { min: 10, media: 20, max: 35 },
      { min: 2, media: 8, max: 15 },
      { min: 1, media: 5, max: 12 },
      { min: 3, media: 10, max: 20 },
      { min: 20, media: 35, max: 55 },
      { min: 50, media: 70, max: 95 },
      { min: 60, media: 80, max: 110 },
      { min: 55, media: 75, max: 100 },
    ],
    umidita: [
      null,
      { min: 65, media: 74, max: 85 },
      { min: 63, media: 72, max: 82 },
      { min: 60, media: 70, max: 80 },
      { min: 58, media: 68, max: 78 },
      { min: 55, media: 66, max: 75 },
      { min: 52, media: 63, max: 72 },
      { min: 50, media: 60, max: 70 },
      { min: 51, media: 61, max: 71 },
      { min: 56, media: 65, max: 74 },
      { min: 60, media: 70, max: 80 },
      { min: 62, media: 73, max: 83 },
      { min: 65, media: 75, max: 85 },
    ],
    kg_raccolti: [
      null,
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 5000, media: 6500, max: 8000 },
      { min: 10000, media: 12000, max: 14000 },
      { min: 15000, media: 18000, max: 21000 },
      { min: 14000, media: 17000, max: 20000 },
      { min: 12000, media: 15000, max: 18000 },
      { min: 8000, media: 10000, max: 12000 },
      { min: 500, media: 2000, max: 3500 },
      { min: 0, media: 0, max: 0 },
    ],
    costi: [
      null,
      { min: 2800, media: 3500, max: 4200 },
      { min: 3200, media: 4000, max: 4800 },
      { min: 5500, media: 6800, max: 8200 },
      { min: 3800, media: 4800, max: 5800 },
      { min: 4500, media: 5500, max: 6500 },
      { min: 5200, media: 6300, max: 7500 },
      { min: 6000, media: 7200, max: 8500 },
      { min: 5800, media: 7000, max: 8200 },
      { min: 5000, media: 6200, max: 7400 },
      { min: 4500, media: 5600, max: 6800 },
      { min: 2500, media: 3200, max: 4000 },
      { min: 1800, media: 2300, max: 2800 },
    ],
    prezzo_al_chilo: [
      null,
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 0, media: 0, max: 0 },
      { min: 1.7, media: 2.0, max: 2.3 },
      { min: 1.5, media: 1.8, max: 2.1 },
      { min: 1.2, media: 1.45, max: 1.7 },
      { min: 1.1, media: 1.35, max: 1.6 },
      { min: 1.3, media: 1.55, max: 1.8 },
      { min: 1.5, media: 1.75, max: 2.0 },
      { min: 1.7, media: 1.95, max: 2.2 },
      { min: 0, media: 0, max: 0 },
    ],
  },
  mesi = [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
  ],
  dati12mesi = [],
  dati30giorni = [],
  dati24ore = [];

const ESTREMI_GLOBALI = calcolaEstremiGlobali(estremi, [
  "temperatura",
  "pioggia",
  "umidita",
]);

function calcolaEstremiGlobali(estremiPerCategoria, categorie) {
  const res = {};
  for (const cat of categorie) {
    const mensili = estremiPerCategoria[cat]?.slice(1) || [];
    const minG = Math.min(...mensili.map((m) => m.min));
    const maxG = Math.max(...mensili.map((m) => m.max));
    res[cat] = { min: minG, max: maxG };
  }
  return res;
}

function normalizzaPerCategoria(valore, categoria) {
  const range = ESTREMI_GLOBALI[categoria];
  if (!range) return 0;
  const diff = range.max - range.min;
  if (diff === 0) return 0;
  return (valore - range.min) / diff;
}

mesiOrdinati().forEach((mese) => {
  let r = getdato("kg_raccolti", 0),
    pk = getdato("prezzo_al_chilo", 2),
    costi = getdato("costi", 2);

  const t = getdato("temperatura", 1);
  const p = getdato("pioggia", 0);
  const u = getdato("umidita", 1);

  dati12mesi.push({
    mese: mesi[mese - 1],
    temperatura: t,
    pioggia: p,
    umidita: u,
    raccolto: r,
    costi: costi,
    ricavi: r * pk,
    utile: +(r * pk - costi).toFixed(2),
    tv: normalizzaPerCategoria(t, "temperatura"),
    pv: normalizzaPerCategoria(p, "pioggia"),
    uv: normalizzaPerCategoria(u, "umidita"),
  });

  function getdato(x, c) {
    let variazione = 2;
    return +(
      estremi[x][mese].media *
      (1 + (Math.random() * 2 - 1) * (variazione / 100))
    ).toFixed(c);
  }
});

ultimi30Giorni().forEach((e) => {
  let r = getdato("kg_raccolti", 0),
    pk = getdato("prezzo_al_chilo", 2),
    costi = getdato("costi", 2),
    t = getdato("temperatura", 1),
    p = getdato("pioggia", 0),
    u = getdato("umidita", 1);
  dati30giorni.push({
    giorno: e.label,
    temperatura: t,
    pioggia: p,
    umidita: u,
    raccolto: r,
    costi: costi,
    ricavi: +(r * pk).toFixed(2),
    utile: +(r * pk - costi).toFixed(2),
    tv: normalizzaPerCategoria(t, "temperatura"),
    pv: normalizzaPerCategoria(p, "pioggia"),
    uv: normalizzaPerCategoria(u, "umidita"),
  });
  function getdato(x, c) {
    let datox = estremi[x][e.mese],
      min = datox.min,
      max = datox.max;
    if (x == "prezzo_al_chilo") {
      return +(
        datox.media *
        (1 + (+Math.random().toFixed(c) * 2 - 1) * (3 / 100))
      ).toFixed(c);
    } else if (["costi", "kg_raccolti"].includes(x)) {
      min = datox.min / 30;
      max = datox.max / 30;
    }
    let diff = max - min;
    return +(
      min +
      (diff / 2) * (1 + (+Math.random().toFixed(1) * 2 - 1) * (30 / 100))
    ).toFixed(c);
  }
});

let oraDiPioggia = Math.random() * 23 + 1;

export function aggiornaUltime24Ore() {
  if (dati24ore.length === 0) return;

  const now = new Date();
  const currentHour = now.getHours();
  const meseIdx = now.getMonth() + 1;

  const lastIndex = dati24ore.length - 1;
  const last = dati24ore[lastIndex];

  const t = +(
    (estremi.temperatura[meseIdx].min +
      (estremi.temperatura[meseIdx].max - estremi.temperatura[meseIdx].min) *
        senotemp(currentHour)) *
    (1 + (+Math.random().toFixed(1) * 2 - 1) * (1 / 100))
  ).toFixed(1);

  const u = +(
    (estremi.umidita[meseIdx].min +
      (estremi.umidita[meseIdx].max - estremi.umidita[meseIdx].min) *
        (senotemp(currentHour) * -1 + 1)) *
    (1 + (+Math.random().toFixed(1) * 2 - 1) * (1 / 100))
  ).toFixed(1);

  const p = +(
    (estremi.pioggia[meseIdx].min +
      (estremi.pioggia[meseIdx].max - estremi.pioggia[meseIdx].min) *
        senopioggia(currentHour, oraDiPioggia)) *
    (1 + (+Math.random().toFixed(1) * 2 - 1) * (15 / 100))
  ).toFixed(1);

  dati24ore[lastIndex] = {
    ...last,
    temperatura: t,
    umidita: u,
    pioggia: p,
    tv: normalizzaPerCategoria(t, "temperatura"),
    pv: normalizzaPerCategoria(p, "pioggia"),
    uv: normalizzaPerCategoria(u, "umidita"),
  };
}

ultime24Ore().forEach((h) => {
  function getdato(x, c) {
    const now = new Date();
    const meseIdx = now.getMonth() + 1;
    const datox = estremi[x][meseIdx];
    const diff = datox.max - datox.min;

    if (x == "temperatura") {
      return +(
        (datox.min + diff * senotemp(h.h)) *
        (1 + (+Math.random().toFixed(c) * 2 - 1) * (1 / 100))
      ).toFixed(c);
    }
    if (x == "umidita") {
      return +(
        (datox.min + diff * (senotemp(h.h) * -1 + 1)) *
        (1 + (+Math.random().toFixed(c) * 2 - 1) * (1 / 100))
      ).toFixed(c);
    }
    if (x == "pioggia") {
      return +(
        (datox.min + diff * senopioggia(h.h, oraDiPioggia)) *
        (1 + (+Math.random().toFixed(c) * 2 - 1) * (15 / 100))
      ).toFixed(c);
    }
    return null;
  }
  let t = getdato("temperatura", 1),
    p = getdato("pioggia", 1),
    u = getdato("umidita", 1);
  dati24ore.push({
    ora: h.label,
    temperatura: t,
    pioggia: p,
    umidita: u,
    tv: normalizzaPerCategoria(t, "temperatura"),
    pv: normalizzaPerCategoria(p, "pioggia"),
    uv: normalizzaPerCategoria(u, "umidita"),
  });
});

function ultime24Ore() {
  const labels = [];
  const now = new Date();
  const currentHour = now.getHours();
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 3600000);
    const h = d.getHours().toString().padStart(2, "0");
    labels.push({ label: `${h}:00`, h: h });
  }
  return labels;
}

function ultimi30Giorni() {
  const labels = [];
  for (let i = 29; i >= 0; i--) {
    const giorno = new Date(Date.now() - 86400000 * i);
    const nGiorno = giorno.getDate();
    const indiceMese = giorno.getMonth();
    const mese = mesi[indiceMese];
    labels.push({
      label: `${nGiorno} ${mese}`,
      mese: indiceMese,
    });
  }
  return labels;
}
function mesiOrdinati() {
  const now = new Date();
  const meseAttuale = now.getMonth() + 1;
  const mesi = [];

  for (let i = meseAttuale + 1; i <= 12; i++) {
    mesi.push(i);
  }
  for (let i = 1; i <= meseAttuale; i++) {
    mesi.push(i);
  }

  return mesi;
}
function senotemp(x) {
  return Math.sin((Math.PI * x) / 12 - Math.PI * (8 / 3)) / 2 + 0.5;
}
function senopioggia(x, oradipioggia) {
  return Math.exp(-Math.pow(x - oradipioggia, 2));
}
export const PERIODS = [
  {
    value: "24h",
    label: "24h",
    descrizione: {
      clima: "Dati meteo di oggi",
      produzione: "Produzione di oggi",
      economia: "Bilancio di oggi",
    },
  },
  {
    value: "7g",
    label: "7g",
    descrizione: {
      clima: "Ultimi 7 giorni",
      produzione: "Ultimi 7 giorni",
      economia: "Ultimi 7 giorni",
    },
  },
  {
    value: "30g",
    label: "30g",
    descrizione: {
      clima: "Ultimi 30 giorni",
      produzione: "Ultimi 30 giorni",
      economia: "Ultimi 30 giorni",
    },
  },
  {
    value: "6m",
    label: "6m",
    descrizione: {
      clima: "Ultimi 6 mesi",
      produzione: "Ultimi 6 mesi",
      economia: "Ultimi 6 mesi",
    },
  },
  {
    value: "1A",
    label: "1A",
    descrizione: {
      clima: "Ultimi 12 mesi",
      produzione: "Ultimi 12 mesi",
      economia: "Ultimi 12 mesi",
    },
  },
];
export { dati12mesi, dati30giorni, dati24ore };
