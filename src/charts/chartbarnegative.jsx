"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

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

export const description = "A bar chart with negative values"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-black mb-2">{data.giorno || data.mese}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-black">Costi:</span>
            <span className="font-medium text-black">€{data.costi.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-black">Ricavi:</span>
            <span className="font-medium text-black">€{data.ricavi.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-black">Utile:</span>
            <span className="font-medium text-black">€{data.utile.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const chartConfig = {
  utile: {
    label: "Utile",
  },
};

export function ChartBarNegative({ description = "", data = [] }) {
  const xKey = Array.isArray(data) && data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], "giorno") ? "giorno" : "mese";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bilancio</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey={xKey} 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (xKey === "mese") return value;
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Bar dataKey="utile">
              {data.map((item) => (
                <Cell
                  key={item.giorno || item.mese}
                  fill={item.utile > 0 ? "var(--color-ricavi)" : "var(--color-costi)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}

export const ChartBarStacked = ChartBarNegative;

