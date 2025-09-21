import { useEffect, useRef, useState } from "react";
import { Card1, Card2, Card3 } from "./components/cards";
import KpiGrid from "./components/Kpi";
import SegmentedControl from "./components/SegmentedControl";
import "./styles/index.css";
import {
  PERIODS,
  dati12mesi,
  dati30giorni,
  dati24ore,
  aggiornaUltime24Ore,
} from "./lib/utils";

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    return localStorage.getItem("selectedPeriod") || "1A";
  });
  const [climaData, setClimaData] = useState([]);
  const timerRef = useRef(null);

  const getDescriptions = (periodo) => {
    const trovato = PERIODS.find((p) => p.value === periodo);
    return trovato ? trovato.descrizione : PERIODS[0].descrizione;
  };

  const getFilteredData = (periodo) => {
    switch (periodo) {
      case "1A":
        return dati12mesi;
      case "6m":
        return dati12mesi.slice(-6);
      case "24h":
      case "7g":
        return dati30giorni.slice(-7);
      case "30g":
        return dati30giorni;
      default:
        return dati12mesi;
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (selectedPeriod === "24h") {
      setClimaData(dati24ore);
      timerRef.current = setInterval(() => {
        aggiornaUltime24Ore();
        setClimaData([...dati24ore]);
      }, 2000);
    } else {
      setClimaData([]);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [selectedPeriod]);

  const descrizioniCard1 = getDescriptions(selectedPeriod);
  const descrizioniAltre =
    selectedPeriod === "24h" ? getDescriptions("7g") : descrizioniCard1;
  const datiFiltrati = getFilteredData(selectedPeriod);
  const datiCard1 = selectedPeriod === "24h" ? climaData : datiFiltrati;
  const datiAltreCarte =
    selectedPeriod === "24h" ? dati30giorni.slice(-7) : datiFiltrati;

  const getClimateDatasetForAverages = (periodo) => {
    switch (periodo) {
      case "24h":
        return dati24ore;
      case "7g":
        return dati30giorni.slice(-7);
      case "30g":
        return dati30giorni;
      case "6m":
        return dati12mesi.slice(-6);
      case "1A":
      default:
        return dati12mesi;
    }
  };

  const datasetClima = getClimateDatasetForAverages(selectedPeriod);
  const safeAvg = (arr) => {
    const nums = arr.map((n) => Number(n)).filter((n) => Number.isFinite(n));
    if (nums.length === 0) return undefined;
    const sum = nums.reduce((a, b) => a + b, 0);
    return sum / nums.length;
  };

  const lastRealtime = selectedPeriod === "24h" && (climaData || []).length > 0
    ? climaData[climaData.length - 1]
    : undefined;
  const kpiTemperature = selectedPeriod === "24h"
    ? lastRealtime?.temperatura
    : safeAvg((datasetClima || []).map((d) => d.temperatura));
  const kpiHumidity = selectedPeriod === "24h"
    ? lastRealtime?.umidita
    : safeAvg((datasetClima || []).map((d) => d.umidita));

  const kgTotali = (datiAltreCarte || []).reduce((acc, d) => acc + Number(d.raccolto || 0), 0);
  const utileNetto = (datiAltreCarte || []).reduce((acc, d) => acc + Number(d.utile || 0), 0);

  const sumOf = (arr, key) => (arr || []).reduce((acc, d) => acc + Number(d[key] || 0), 0);
  const avgOf = (arr, key) => {
    const vals = (arr || []).map((d) => Number(d[key] || 0)).filter((n) => Number.isFinite(n));
    if (!vals.length) return undefined;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const rainfallValue = selectedPeriod === "24h"
    ? lastRealtime?.pioggia
    : avgOf(datasetClima, "pioggia");

  const ricaviTotali = sumOf(datiAltreCarte, "ricavi");
  const costiTotali = sumOf(datiAltreCarte, "costi");

  const daysInMonth = { Gen: 31, Feb: 28, Mar: 31, Apr: 30, Mag: 31, Giu: 30, Lug: 31, Ago: 31, Set: 30, Ott: 31, Nov: 30, Dic: 31 };
  const periodDays = (() => {
    switch (selectedPeriod) {
      case "24h":
        return 7;
      case "7g":
        return 7;
      case "30g":
        return 30;
      case "6m": {
        return (datiAltreCarte || []).reduce((acc, d) => acc + (daysInMonth[d.mese] || 30), 0);
      }
      case "1A": {
        return (datiAltreCarte || []).reduce((acc, d) => acc + (daysInMonth[d.mese] || 30), 0);
      }
      default:
        return (datiAltreCarte || []).length;
    }
  })();
  const resaGiornaliera = periodDays > 0 ? sumOf(datiAltreCarte, "raccolto") / periodDays : undefined;

  return (
    <div id="app">
      <div className="main-content">
        <div className="header-section">
        <div className="title-container">
          <img src="/Logo.png" alt="Logo" className="logo" />
          <div className="title-text">
            <h1 id="title">Dashboard Agricola</h1>
            <h2 id="subtitle">Coltivazione Pomodorino Ciliegino</h2>
          </div>
        </div>
        <SegmentedControl
          selectedPeriod={selectedPeriod}
          onPeriodChange={(period) => {
            setSelectedPeriod(period);
            localStorage.setItem("selectedPeriod", period);
          }}
        />
      </div>
      <KpiGrid
        temperatura={kpiTemperature}
        umidita={kpiHumidity}
        kgTotali={kgTotali}
        utileNetto={utileNetto}
        pioggia={rainfallValue}
        resaGiornaliera={resaGiornaliera}
        ricavi={ricaviTotali}
        costi={costiTotali}
        periodo24h={selectedPeriod === "24h"}
      />
      
      <div id="cardcarousel">
        <Card1 descrizioni={descrizioniCard1} dati={datiCard1} />
        <Card2 
          descrizioni={descrizioniAltre} 
          dati={datiAltreCarte} 
          disattiva={selectedPeriod === "24h"}
        />
        <Card3 
          periodDescriptions={descrizioniAltre} 
          data={datiAltreCarte} 
          disattiva={selectedPeriod === "24h"}
        />
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <h3>Dashboard Agricola – Progetto di Tesi</h3>
            <p>Autore: Federico Spada | Anno Accademico 2024/2025</p>
          </div>
          <div className="footer-disclaimer">
            <p>Dati simulati a fini dimostrativi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
