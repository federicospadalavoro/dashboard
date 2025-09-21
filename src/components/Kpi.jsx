import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function KpiItem({ label, value, suffix = "", prefix = "", icon = null, disattivo = false }) {
  return (
    <Card className={`flex-1 rounded-2xl shadow-sm border border-border/60${disattivo ? " opacity-50" : ""}`} aria-disabled={disattivo}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <div className="text-3xl font-medium leading-none tracking-tight text-[#1f2937]">
              {prefix}
              {value}
              {suffix}
            </div>
            <div className="text-sm text-muted-foreground mt-1 kpi-label">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function KpiGrid({ temperatura, umidita, kgTotali, utileNetto, pioggia, resaGiornaliera, ricavi, costi, periodo24h = false }) {
  const formatNumber = (n, opts = {}) => {
    if (n === undefined || n === null || Number.isNaN(n)) return "-";
    return new Intl.NumberFormat("it-IT", opts).format(n);
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <KpiItem
        label="Temperatura"
        value={formatNumber(temperatura, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        suffix=" °C"
        icon={<span>🌡️</span>}
      />
      <KpiItem
        label="Umidità"
        value={formatNumber(umidita, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        suffix=" %"
        icon={<span>💧</span>}
      />
      <KpiItem
        label="Pioggia"
        value={formatNumber(pioggia, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        suffix=" mm"
        icon={<span>🌧️</span>}
      />
      <KpiItem
        label="Totale Kg"
        value={formatNumber(kgTotali)}
        suffix=" kg"
        icon={<span>📦</span>}
        disattivo={periodo24h}
      />
      <KpiItem
        label="Ricavi"
        value={formatNumber(ricavi, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        prefix="€"
        icon={<span>🧾</span>}
        disattivo={periodo24h}
      />
      <KpiItem
        label="Costi"
        value={formatNumber(costi, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        prefix="€"
        icon={<span>💸</span>}
        disattivo={periodo24h}
      />
      <KpiItem
        label="Utile netto"
        value={formatNumber(utileNetto, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        prefix="€"
        icon={<span>💶</span>}
        disattivo={periodo24h}
      />
      <KpiItem
        label="Resa media giornaliera"
        value={formatNumber(resaGiornaliera, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        suffix=" kg/g"
        icon={<span>📈</span>}
        disattivo={periodo24h}
      />
    </div>
  );
}


