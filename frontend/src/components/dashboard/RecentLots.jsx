import React from 'react';
import { MoreVertical, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const lots = [
  { id: 'LT-9928', product: 'Paracetamol 500mg', expiry: '12/2027', status: 'OK' },
  { id: 'LT-8841', product: 'Amoxicilina 250mg', expiry: '08/2026', status: 'OK' },
  { id: 'LT-7720', product: 'Dipirona 1g', expiry: '05/2026', status: 'Crítico' },
  { id: 'LT-6615', product: 'Omeprazol 20mg', expiry: '10/2027', status: 'OK' },
  { id: 'LT-5510', product: 'Ibuprofeno 600mg', expiry: '01/2028', status: 'OK' },
  { id: 'LT-4405', product: 'Cloridrato de Metformina', expiry: '03/2027', status: 'OK' },
];

export default function RecentLots() {
  const navigate = useNavigate();
  
  // Lógica para limitar a 4 registros e contar o restante
  const displayLimit = 4;
  const displayedLots = lots.slice(0, displayLimit);
  const remainingCount = lots.length > displayLimit ? lots.length - displayLimit : 0;

  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl h-full flex flex-col">
      <div className="p-6 flex justify-between items-center shrink-0">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Lotes Recentes</h3>
        <button className="text-gray-600 hover:text-white transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Lista fixa sem scroll */}
      <div className="px-6 pb-6 space-y-3 flex-1 overflow-hidden">
        {displayedLots.map((lot) => (
          <div 
            key={lot.id} 
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-primary uppercase tracking-wider">{lot.id}</span>
              <span className="text-xs font-bold text-white truncate max-w-[150px]">{lot.product}</span>
            </div>
            
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Calendar size={12} />
                <span className="text-[10px] font-bold">{lot.expiry}</span>
              </div>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${
                lot.status === 'Crítico' 
                ? 'bg-red-500/10 text-red-500 border border-red-500/10' 
                : 'bg-green-500/10 text-green-500 border border-green-500/10'
              }`}>
                {lot.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Botão com contador dinâmico */}
      <button 
        onClick={() => navigate('/estoque')}
        className="w-full p-4 text-center border-t border-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-3 group shrink-0"
      >
        <span>Ver Inventário Completo</span>
        {remainingCount > 0 && (
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-[9px] font-black border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
            +{remainingCount} itens
          </span>
        )}
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
      </button>
    </div>
  );
}