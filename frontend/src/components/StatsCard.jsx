import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, change, icon: Icon, trend = 'up' }) {
  const isPositive = trend === 'up';
  
  return (
    <Card className="stat-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="stat-card-title">{title}</p>
            <p className="stat-card-value">{value}</p>
            {change && (
              <div className={cn("stat-card-change flex items-center gap-1", isPositive ? 'positive' : 'negative')}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn(
              "rounded-lg p-3",
              isPositive ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" : "bg-destructive/10 text-destructive"
            )}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
