"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  raccolto: {
    label: "Raccolto",
    color: "var(--chart-3)",
  },
}

export function ChartBarLabel({ description = "", data = [] }) {
  const xKey = Array.isArray(data) && data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], "giorno") ? "giorno" : "mese";
  const showLabels = (() => {
    const count = Array.isArray(data) ? data.length : 0;
    if (xKey === "giorno") return count <= 7;
    return count <= 6;
  })();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dat = payload[0].payload || {};
      const xLabel = dat.giorno || (typeof dat.mese === "string" ? dat.mese.slice(0, 3) : dat.mese);
      const value = payload[0].value;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-black mb-2">{xLabel}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-black">Raccolto:</span>
              <span className="font-medium text-black">{`${Number(value).toLocaleString()} kg`}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>KG Raccolti</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (xKey === "mese") return String(value).slice(0, 3);
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Bar dataKey="raccolto" fill="var(--color-raccolto)" radius={8}>
              {showLabels && (
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              )}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
