import React, { useState } from 'react';
import { 
  Package, 
  Download, 
  Upload, 
  AlertTriangle, 
  Search, 
  Bell 
} from 'lucide-react';

// Importação dos Componentes do PharmaFlow
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivities from '../components/dashboard/RecentActivities';
import InventoryChart from '../components/dashboard/InventoryChart';
import ConsumoSetorChart from '../components/dashboard/ConsumoSetorChart';
import StockMovementChart from '../components/dashboard/StockMovementChart';
import RecentLots from '../components/dashboard/RecentLots';
import ExpiryAlerts from '../components/dashboard/ExpiryAlerts';

export default function Dashboard() {
  // Estado para controlar qual menu exibir na barra lateral
  const [activeSidebar, setActiveSidebar] = useState('activities');

  return (
    /* 
      GRID PRINCIPAL (12 Colunas)
      - xl:col-span-9: Área de métricas e gráficos.
      - xl:col-span-3: Barra lateral dinâmica (Atividades ou Alertas).
    */
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch pb-8 min-h-screen">
      
      {/* --- COLUNA PRINCIPAL (ESQUERDA) --- */}
      <div className="xl:col-span-9 flex flex-col gap-8">
        
        {/* 1. HEADER: Identidade e Busca */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-xs mt-1 font-medium">
              Visão geral do armazém — Terça, 29 Abr 2026
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:min-w-[300px] lg:w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nome, princípio at..."
                className="bg-[#1a1c1e] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm w-full focus:outline-none focus:border-primary/50 text-white placeholder:text-gray-600 transition-all"
              />
            </div>
            
            {/* BOTÃO DO SINO: Alterna entre Atividades e Alertas */}
            <button 
              onClick={() => setActiveSidebar(activeSidebar === 'alerts' ? 'activities' : 'alerts')}
              className={`p-2.5 rounded-xl border border-white/5 relative transition-all hover:scale-105 active:scale-95 ${
                activeSidebar === 'alerts' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]' : 'bg-[#1a1c1e] text-gray-400'
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1c1e]"></span>
            </button>
          </div>
        </div>

        {/* 2. LINHA 01: Status Geral de Movimentação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
          <StatsCard title="Total em Estoque" value="101" icon={Package} type="orange" />
          <StatsCard title="Entradas (Mês)" value="0" icon={Download} />
          <StatsCard title="Saídas (Mês)" value="0" icon={Upload} />
          <StatsCard title="Alertas Ativos" value="4" icon={AlertTriangle} />
        </div>

        {/* 3. LINHA 02: Métricas de Validade e Estoque Crítico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
          <StatsCard 
            title="Total de Itens" 
            value="24.680" 
            icon={Package} 
            subtitle="812 produtos cadastrados"
            trendBadge="+12,5%" 
          />
          <StatsCard 
            title="Próximos ao Vencimento" 
            value="38" 
            icon={AlertTriangle} 
            subtitle="Vencem em até 30 dias"
            trendBadge="+5 esta semana" 
            link="/validade"
            type="yellow" 
          />
          <StatsCard 
            title="Estoque Crítico" 
            value="12" 
            icon={AlertTriangle} 
            subtitle="Abaixo do mínimo exigido"
            trendBadge="-3 resolvidos hoje" 
            link="/estoque"
            type="red" 
          />
        </div>

        {/* 4. SEÇÃO DE GRÁFICOS: Consumo e Nível de Estoque */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0">
          <div className="lg:col-span-7 h-[380px]">
             <ConsumoSetorChart />
          </div>
          <div className="lg:col-span-5 h-[380px]">
             <InventoryChart />
          </div>
        </div>

        {/* 5. MOVIMENTAÇÃO DE ESTOQUE (Análise de Tendência) */}
        <div className="w-full h-[400px] shrink-0">
           <StockMovementChart />
        </div>

        {/* 6. LOTES RECENTES (Visibilidade de 4 itens + contador) */}
        <div className="w-full h-[480px] shrink-0">
           <RecentLots />
        </div>

      </div>

      {/* --- COLUNA LATERAL DINÂMICA --- */}
      <div className="xl:col-span-3">
        {/* h-full mantém a barra sólida acompanhando o crescimento da esquerda */}
        <div className="h-full">
          {activeSidebar === 'activities' ? (
            <RecentActivities />
          ) : (
            <ExpiryAlerts onClose={() => setActiveSidebar('activities')} />
          )}
        </div>
      </div>

    </div>
  );
}