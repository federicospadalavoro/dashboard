"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Grafico a linee multiple";

const chartConfig = {
  temperatura: {
    label: "Temperatura",
    color: "var(--chart-1)",
  },
  umidita: {
    label: "Umidità",
    color: "var(--chart-2)",
  },
  pioggia: {
    label: "Pioggia",
    color: "var(--chart-3)",
  },
};

export function ChartLineMultiple({ description = "", data }) {
  const xKey = Array.isArray(data) && data.length > 0
    ? (Object.prototype.hasOwnProperty.call(data[0], "ora")
        ? "ora"
        : Object.prototype.hasOwnProperty.call(data[0], "giorno")
          ? "giorno"
          : "mese")
    : "mese";
  const hasV = Array.isArray(data) && data.length > 0 &&
    (Object.prototype.hasOwnProperty.call(data[0], "tv") ||
     Object.prototype.hasOwnProperty.call(data[0], "uv") ||
     Object.prototype.hasOwnProperty.call(data[0], "pv"));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperatura, Umidità e Pioggia</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => {
                    const key = (name || "").toLowerCase();
                    let label = name;
                    let color = "#888";
                    let unit = "";
                    let displayValue = value;

                    if (hasV && item && item.payload) {
                      if (key === "tv") displayValue = item.payload.temperatura;
                      if (key === "uv") displayValue = item.payload.umidita;
                      if (key === "pv") displayValue = item.payload.pioggia;
                    }

                    if (key.includes("temp")) {
                      label = "Temperatura";
                      color = "var(--chart-1)";
                      unit = "°C";
                    } else if (key.includes("umid")) {
                      label = "Umidità";
                      color = "var(--chart-2)";
                      unit = "%";
                    } else if (key.includes("piogg")) {
                      label = "Pioggia";
                      color = "var(--chart-3)";
                      unit = "mm";
                    } else if (["tv", "uv", "pv"].includes(key)) {
                      if (key === "tv") {
                        label = "Temperatura";
                        color = "var(--chart-1)";
                        unit = "°C";
                      }
                      if (key === "uv") {
                        label = "Umidità";
                        color = "var(--chart-2)";
                        unit = "%";
                      }
                      if (key === "pv") {
                        label = "Pioggia";
                        color = "var(--chart-3)";
                        unit = "mm";
                      }
                    }

                    return (
                      <>
                        <span
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: color,
                            marginRight: 6,
                            verticalAlign: "middle",
                          }}
                        />
                        <span style={{ fontWeight: 500, marginRight: 6 }}>
                          {label}
                        </span>
                        {displayValue}
                        {unit}
                      </>
                    );
                  }}
                />
              }
            />
            <Line
              dataKey={hasV ? "tv" : "temperatura"}
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={hasV ? "uv" : "umidita"}
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={hasV ? "pv" : "pioggia"}
              type="monotone"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex flex-wrap gap-2 mt-1 justify-center text-sm w-full max-w-xs mx-auto">
          <div className="flex items-center gap-1 min-w-[60px]">
            <span className="inline-block w-4 h-1.5 rounded bg-[var(--chart-1)] mr-1" />
            <span className="font-medium whitespace-nowrap">Temperatura</span>
          </div>
          <div className="flex items-center gap-1 min-w-[60px]">
            <span className="inline-block w-4 h-1.5 rounded bg-[var(--chart-2)] mr-1" />
            <span className="font-medium whitespace-nowrap">Umidità</span>
          </div>
          <div className="flex items-center gap-1 min-w-[60px]">
            <span className="inline-block w-4 h-1.5 rounded bg-[var(--chart-3)] mr-1" />
            <span className="font-medium whitespace-nowrap">Pioggia</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
