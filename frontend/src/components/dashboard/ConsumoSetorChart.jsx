import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'UTI Adulto', total: 4200 },
  { name: 'Emergência', total: 3800 },
  { name: 'C. Cirúrgico', total: 5100 },
  { name: 'Pediatria', total: 1900 },
  { name: 'Ambulatório', total: 2400 },
];

export default function ConsumoSetorChart() {
  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Consumo por Setor</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md border border-primary/20">Mês</button>
          <button className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-bold rounded-md hover:text-white transition-colors">Semana</button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10 }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{ 
                backgroundColor: '#1a1c1e', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#ff5722' }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 2 ? '#ff5722' : '#2a2d31'} 
                  className="transition-all duration-300 hover:fill-[#ff5722]"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}