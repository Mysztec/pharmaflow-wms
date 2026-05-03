import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '01/04', entradas: 400, saidas: 240 },
  { day: '05/04', entradas: 300, saidas: 139 },
  { day: '10/04', entradas: 200, saidas: 980 },
  { day: '15/04', entradas: 278, saidas: 390 },
  { day: '20/04', entradas: 189, saidas: 480 },
  { day: '25/04', entradas: 239, saidas: 380 },
  { day: '30/04', entradas: 349, saidas: 430 },
];

export default function StockMovementChart() {
  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Movimentação de Estoque</h3>
          <p className="text-[10px] text-gray-500 mt-1">Fluxo de insumos nos últimos 30 dias</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5 text-[#ff5722]">
            <span className="w-2 h-2 rounded-full bg-[#ff5722]" /> Entradas
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-gray-700" /> Saídas
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5722" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff5722" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 10 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1c1e', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="entradas" 
              stroke="#ff5722" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEntradas)" 
            />
            <Area 
              type="monotone" 
              dataKey="saidas" 
              stroke="#374151" 
              strokeWidth={2}
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}