import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', receita: 45000, meta: 50000 },
  { mes: 'Fev', receita: 52000, meta: 50000 },
  { mes: 'Mar', receita: 48000, meta: 50000 },
  { mes: 'Abr', receita: 61000, meta: 55000 },
  { mes: 'Mai', receita: 55000, meta: 55000 },
  { mes: 'Jun', receita: 67000, meta: 60000 },
  { mes: 'Jul', receita: 72000, meta: 60000 },
  { mes: 'Ago', receita: 68000, meta: 65000 },
];

// Extract static styles to prevent re-renders
const tooltipContentStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px'
};

export default function RevenueChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Receita de Vendas</CardTitle>
        <CardDescription>Comparação com meta mensal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="mes" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$ ${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={tooltipContentStyle}
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="receita" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1} 
                fill="url(#colorReceita)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="meta" 
                stroke="hsl(var(--chart-2))" 
                fillOpacity={1} 
                fill="url(#colorMeta)" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
