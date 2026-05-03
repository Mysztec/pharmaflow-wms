import React from 'react';
import { Download, Upload, AlertCircle, RotateCcw, ChevronRight } from 'lucide-react';

// Dados de exemplo para popular a lista imediatamente
const activities = [
  { id: 1, title: 'Entrada de Estoque', desc: 'Paracetamol 500mg — Lote #2...', time: '2 min atrás', user: 'Carlos S.', amount: '+2.400 un', icon: Download, color: 'text-green-400', bgColor: 'bg-green-400/10' },
  { id: 2, title: 'Saída para Dispensação', desc: 'Amoxicilina 250mg — Lote #1933', time: '8 min atrás', user: 'Ana M.', amount: '-180 un', icon: Upload, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  { id: 3, title: 'Estoque Mínimo Atingido', desc: 'Dipirona 1g — Estoque atual: 45...', time: '15 min atrás', user: 'Sistema', amount: '45 un', icon: AlertCircle, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  { id: 4, title: 'Devolução Registrada', desc: 'Omeprazol 20mg — Lote #3021', time: '32 min atrás', user: 'Roberto L.', amount: '+80 un', icon: RotateCcw, color: 'text-green-400', bgColor: 'bg-green-400/10' },
  { id: 5, title: 'Entrada de Estoque', desc: 'Ibuprofeno 600mg — Lote #4102', time: '1h atrás', user: 'Carlos S.', amount: '+1.200 un', icon: Download, color: 'text-green-400', bgColor: 'bg-green-400/10' },
  { id: 6, title: 'Próximo ao Vencimento', desc: 'Metformina 850mg — Lote #99', time: '2h atrás', user: 'Sistema', amount: '320 un', icon: AlertCircle, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
];

export default function RecentActivities() {
  return (
    <div className="bg-[#161819] border border-white/5 rounded-2xl flex flex-col h-full">
      {/* Header fixo no topo da caixa */}
      <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-lg font-bold text-white">Atividades Recentes</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">Movimentações em tempo real</p>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-full">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-black text-green-500 uppercase">Ao vivo</span>
        </div>
      </div>

      {/* Lista que cresce e ocupa o espaço restante */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`p-2 rounded-xl h-fit ${activity.bgColor} shrink-0`}>
              <activity.icon size={18} className={activity.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-sm font-semibold text-white truncate">{activity.title}</h4>
                <span className={`text-[11px] font-bold whitespace-nowrap ${activity.color}`}>
                  {activity.amount}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">{activity.desc}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-600">
                <span>{activity.time}</span>
                <span>•</span>
                <span>{activity.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé fixo na base da caixa */}
      <button className="p-4 text-center border-t border-white/5 text-primary text-[11px] font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-1 group shrink-0">
        Ver todas as atividades 
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}