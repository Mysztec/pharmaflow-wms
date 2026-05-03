import React, { useState } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Clock, 
  RotateCcw, 
  ArrowLeftRight 
} from 'lucide-react';

const alerts = [
  { id: '#1933', name: 'Amoxicilina 250mg', loc: 'B-01', status: 'Atenção', qty: '800 un', date: '09/05/2026', days: '9d', type: 'yellow' },
  { id: '#2901', name: 'Metformina 850...', loc: 'C-02', status: 'Atenção', qty: '320 un', date: '13/05/2026', days: '13d', type: 'yellow' },
  { id: '#3301', name: 'Dipirona 1g', loc: 'A-03', status: 'Aviso', qty: '45 un', date: '19/05/2026', days: '19d', type: 'blue' },
  { id: '#5502', name: 'Losartana 50mg', loc: 'D-06', status: 'Aviso', qty: '640 un', date: '24/05/2026', days: '24d', type: 'blue' },
];

export default function ExpiryAlerts({ onClose }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-6 flex justify-between items-start shrink-0">
        <div className="flex gap-4">
          <div className="p-3 bg-[#eab308]/10 border border-[#eab308]/20 rounded-2xl h-fit text-[#eab308]">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Alertas de<br />Vencimento</h2>
            <p className="text-gray-500 text-[11px] mt-1 font-medium">Lotes críticos nos próximos 30 dias</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors"><X size={18} /></button>
        </div>
      </div>

      {/* Badges de Filtro */}
      <div className="px-6 flex gap-2 shrink-0 pb-4 overflow-hidden">
        <div className="px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-2 shrink-0">
          <span className="text-red-500 font-bold text-sm">0</span>
          <span className="text-red-500/60 text-[10px] font-bold uppercase">Crítico</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-2 shrink-0">
          <span className="text-yellow-500 font-bold text-sm">2</span>
          <span className="text-yellow-500/60 text-[10px] font-bold uppercase">Atenção</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2 shrink-0">
          <span className="text-gray-400 font-bold text-sm">4</span>
          <span className="text-gray-400/60 text-[10px] font-bold uppercase">Total</span>
        </div>
      </div>

      {/* Lista de Alertas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {alerts.map((alert) => {
          const isExpanded = expandedId === alert.id;
          
          // Mapeamento de cores baseado no tipo do alerta (yellow ou blue)
          const theme = {
            yellow: {
              border: isExpanded ? 'border-[#eab308]/40' : 'border-[#eab308]/10',
              bg: isExpanded ? 'bg-white/[0.03]' : 'bg-[#eab308]/5',
              badge: 'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20',
              status: 'bg-[#eab308] text-black',
              dot: 'bg-[#eab308]',
              actionBtn: 'border-[#eab308]/20 bg-[#eab308]/5 hover:bg-[#eab308]/10 text-[#eab308]'
            },
            blue: {
              border: isExpanded ? 'border-blue-500/40' : 'border-blue-500/10',
              bg: isExpanded ? 'bg-white/[0.03]' : 'bg-blue-500/5',
              badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              status: 'bg-blue-500 text-white',
              dot: 'bg-blue-500',
              actionBtn: 'border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400'
            }
          }[alert.type];

          return (
            <div 
              key={alert.id} 
              className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${theme.border} ${theme.bg}`}
              onClick={() => toggleExpand(alert.id)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
                    <h4 className="text-sm font-bold text-white">{alert.name}</h4>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black border ${theme.badge}`}>
                    <Clock size={12} /> {alert.days}
                    {isExpanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 mb-4 uppercase">
                  <span>{alert.id}</span>
                  <span>•</span>
                  <span>{alert.loc}</span>
                </div>

                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${theme.status}`}>
                    {alert.status}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                    <Package size={12} /> {alert.qty}
                  </div>
                </div>
                
                <div className="mt-4 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                  Vence: {alert.date}
                </div>
              </div>

              {/* SEÇÃO AÇÃO RÁPIDA */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-4 border-t border-white/5 bg-black/20 animate-in fade-in slide-in-from-top-2 duration-300">
                  <h5 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Ação Rápida</h5>
                  <div className="space-y-3">
                    <button className="w-full p-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 flex items-center gap-4 transition-all group">
                      <div className="p-2 rounded-xl bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                        <RotateCcw size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-red-400">Solicitar Devolução</p>
                        <p className="text-[10px] text-gray-500 font-medium">Devolver ao fornecedor</p>
                      </div>
                    </button>

                    <button className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all group ${theme.actionBtn}`}>
                      <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform ${alert.type === 'yellow' ? 'bg-[#eab308]/10' : 'bg-blue-500/10'}`}>
                        <ArrowLeftRight size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold">Remanejar para Alto Consumo</p>
                        <p className="text-[10px] text-gray-500 font-medium opacity-70">Transferir para UTI / Emergência</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 text-center text-[10px] font-bold text-gray-700 uppercase tracking-widest shrink-0 border-t border-white/5">
        Monitoramento automático diário às 06:00 BRT
      </div>
    </div>
  );
}