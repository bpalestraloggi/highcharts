import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { etapa: 'Prospecção', quantidade: 45, valor: 225000 },
  { etapa: 'Qualificação', quantidade: 32, valor: 192000 },
  { etapa: 'Proposta', quantidade: 18, valor: 144000 },
  { etapa: 'Negociação', quantidade: 12, valor: 108000 },
  { etapa: 'Fechamento', quantidade: 8, valor: 80000 },
];

// Extract static styles to prevent re-renders
const tooltipContentStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px'
};

const barRadius = [8, 8, 0, 0];

export default function PipelineChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="etapa" 
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
              />
              <Tooltip 
                contentStyle={tooltipContentStyle}
                formatter={(value, name) => [
                  name === 'quantidade' ? `${value} leads` : `R$ ${value.toLocaleString('pt-BR')}`,
                  name === 'quantidade' ? 'Quantidade' : 'Valor Total'
                ]}
              />
              <Bar dataKey="quantidade" fill="hsl(var(--chart-1))" radius={barRadius} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
