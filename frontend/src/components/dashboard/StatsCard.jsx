import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  type = "dark", 
  subtitle, 
  link,
  trendBadge 
}) {
  const styles = {
    orange: 'bg-[#ff5722] border-transparent shadow-[0_0_25px_rgba(255,87,34,0.1)]',
    red: 'bg-[#cc2b2b] border-transparent shadow-[0_0_25px_rgba(204,43,43,0.1)]',
    yellow: 'bg-[#1a1c1e] border-[#eab308]/30 shadow-[0_0_20px_rgba(234,179,8,0.05)]', // Estilo Atenção
    dark: 'bg-[#1a1c1e] border-white/5'
  };

  const isOrangeOrRed = type === "orange" || type === "red";
  const isYellow = type === "yellow";

  return (
    <div className={`p-6 rounded-[2rem] border transition-all flex flex-col justify-between min-h-[160px] ${styles[type]}`}>
      <div className="flex justify-between items-start">
        {/* Ícone com fundo dinâmico */}
        <div className={`p-2.5 rounded-xl ${
          isOrangeOrRed ? 'bg-white/20' : isYellow ? 'bg-[#eab308]/10 border border-[#eab308]/20' : 'bg-white/5'
        }`}>
          <Icon size={18} className={isYellow ? 'text-[#eab308]' : 'text-white'} />
        </div>
        
        <div className="flex items-center gap-2">
          {link && (
            <button className="text-[10px] font-bold text-[#ff5722] hover:underline flex items-center gap-0.5 transition-colors">
              Ver lista <ChevronRight size={12} />
            </button>
          )}
          {trendBadge && (
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
              isYellow ? 'bg-[#f87171]/10 text-[#f87171]' : // Badge avermelhada no card amarelo como no original
              type === 'red' ? 'bg-black/20 text-white' : 'bg-green-500/10 text-green-500'
            }`}>
              {trendBadge}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        {/* Valor Amarelo se for tipo yellow */}
        <h3 className={`text-3xl font-bold tracking-tight ${isYellow ? 'text-[#eab308]' : 'text-white'}`}>
          {value}
        </h3>
        <p className="text-[11px] font-bold text-white/90 uppercase tracking-wider mt-1">{title}</p>
        {subtitle && (
          <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
}