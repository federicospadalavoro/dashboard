import { ChartLineMultiple } from "../charts/linechart";
import { ChartBarLabel } from "../charts/labelbarchart";
import { ChartBarStacked } from "@/charts/chartbarnegative"

export function Card1({ descrizioni, dati }) {
  return (
    <div className="card">
      <h1>Clima</h1>
      <ChartLineMultiple
        key={`${Array.isArray(dati) && dati[0] && (dati[0].ora ? 'ora' : dati[0].giorno ? 'giorno' : 'mese')}-${Array.isArray(dati) ? dati.length : 0}`}
        description={descrizioni?.clima}
        data={dati}
      />
    </div>
  );
}

export function Card2({ descrizioni, dati, disattiva = false }) {
  return (
    <div className={`card ${disattiva ? 'opacity-50' : ''}`} aria-disabled={disattiva}>
      <h1>Produzione</h1>
      <ChartBarLabel
        key={`${Array.isArray(dati) && dati[0] && (dati[0].ora ? 'ora' : dati[0].giorno ? 'giorno' : 'mese')}-${Array.isArray(dati) ? dati.length : 0}`}
        description={descrizioni?.produzione}
        data={dati}
      />
    </div>
  );
}
export function Card3({ periodDescriptions, data, disattiva = false }) {
  return (
    <div className={`card ${disattiva ? 'opacity-50' : ''}`} aria-disabled={disattiva}>
      <h1>Economia</h1>
      <ChartBarStacked
        key={`${Array.isArray(data) && data[0] && (data[0].ora ? 'ora' : data[0].giorno ? 'giorno' : 'mese')}-${Array.isArray(data) ? data.length : 0}`}
        description={periodDescriptions?.economia}
        data={data}
      />
    </div>
  );
}
