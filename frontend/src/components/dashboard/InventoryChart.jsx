import React from 'react';

const inventoryData = [
  { name: 'Paracetamol 500mg', value: 12400, max: 15000, percentage: 83 },
  { name: 'Amoxicilina 250mg', value: 8200, max: 10000, percentage: 82 },
  { name: 'Dipirona 1g', value: 450, max: 5000, percentage: 9 },
  { name: 'Omeprazol 20mg', value: 3100, max: 8000, percentage: 38 },
  { name: 'Ibuprofeno 600mg', value: 1200, max: 6000, percentage: 20 },
];

export default function InventoryChart() {
  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl p-6 h-full">
      <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Nível de Estoque</h3>
      
      <div className="space-y-6">
        {inventoryData.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-white">{item.name}</span>
              <span className="text-gray-500">
                <b className="text-primary">{item.value.toLocaleString()} un</b> ({item.percentage}%)
              </span>
            </div>
            {/* Barra de Progresso Customizada */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}