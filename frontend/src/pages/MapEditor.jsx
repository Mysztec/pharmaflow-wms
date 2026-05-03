import React, { useState, useRef, useEffect } from 'react';
import { Square, Layout, Columns, Box, Grid, Trash2, Save, X } from 'lucide-react';
import MapBlock from '../components/map/MapBlock';

const GRID_SIZE = 20;

export default function MapEditor() {
  const containerRef = useRef(null);
  const [zones, setZones] = useState([
    { id: 1, name: 'Zona A — Medicamentos Comuns', id_label: 'ZA', type: 'zona', x: 5, y: 3, w: 12, h: 7, capacity: 2000 },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [interaction, setInteraction] = useState({ type: null, handle: null, offset: { x: 0, y: 0 } });
  const [hasCollision, setHasCollision] = useState(false);

  const selectedZone = zones.find(z => z.id === selectedId);

  const checkCollision = (rect1, allZones) => {
    return allZones.some(rect2 => {
      if (rect1.id === rect2.id) return false;
      return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      );
    });
  };

  const addZone = (type) => {
    const id = Date.now();
    const newZone = { id, name: `Nova ${type}`, id_label: 'NOVO', type, x: 2, y: 2, w: 8, h: 5, capacity: 1000 };
    setZones(prev => [...prev, newZone]);
    setSelectedId(id);
  };

  const updateSelected = (field, value) => {
    setZones(prev => prev.map(z => z.id === selectedId ? { ...z, [field]: value } : z));
  };

  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!interaction.type || !selectedId) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / GRID_SIZE;
      const mouseY = (e.clientY - rect.top) / GRID_SIZE;

      setZones(prev => {
        const active = prev.find(z => z.id === selectedId);
        if (!active) return prev;
        let next = { ...active };

        if (interaction.type === 'drag') {
          next.x = Math.round(mouseX - interaction.offset.x);
          next.y = Math.round(mouseY - interaction.offset.y);
        } else if (interaction.type === 'resize') {
          const h = interaction.handle;
          if (h.includes('e')) next.w = Math.max(2, Math.round(mouseX - active.x));
          if (h.includes('s')) next.h = Math.max(2, Math.round(mouseY - active.y));
          if (h.includes('w')) {
            const rightEdge = active.x + active.w;
            next.x = Math.min(rightEdge - 2, Math.round(mouseX));
            next.w = rightEdge - next.x;
          }
          if (h.includes('n')) {
            const bottomEdge = active.y + active.h;
            next.y = Math.min(bottomEdge - 2, Math.round(mouseY));
            next.h = bottomEdge - next.y;
          }
        }
        setHasCollision(checkCollision(next, prev));
        return prev.map(z => z.id === selectedId ? next : z);
      });
    };

    const handleGlobalUp = () => setInteraction({ type: null, handle: null, offset: { x: 0, y: 0 } });

    if (interaction.type) {
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
    };
  }, [interaction, selectedId]);

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
      
      {/* ADICIONAR */}
      <div className="w-64 shrink-0 bg-[#161819] border border-white/5 rounded-2xl p-6 flex flex-col gap-6">
        <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Ferramentas</h3>
        <div className="space-y-3 flex-1">
          <ToolBtn icon={Square} label="Zona" color="text-orange-500" onClick={() => addZone('zona')} />
          <ToolBtn icon={Layout} label="Prateleira" color="text-blue-500" onClick={() => addZone('prateleira')} />
          <ToolBtn icon={Columns} label="Corredor" color="text-gray-400" onClick={() => addZone('corredor')} />
          <ToolBtn icon={Box} label="Especial" color="text-purple-500" onClick={() => addZone('especial')} />
        </div>
        
        <div className="pt-6 border-t border-white/5 space-y-3">
          <button 
            onClick={() => { setZones(zones.filter(z => z.id !== selectedId)); setSelectedId(null); setHasCollision(false); }}
            disabled={!selectedId}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500/60 transition-all text-xs font-bold disabled:opacity-10"
          >
            <Trash2 size={16} /> Excluir Item
          </button>
          <button className={`w-full p-4 rounded-xl text-xs font-black uppercase transition-all shadow-lg ${hasCollision ? 'bg-red-500/20 text-red-500' : 'bg-primary text-white shadow-primary/20'}`}>
            <Save size={18} /> {hasCollision ? 'Sobreposição' : 'Salvar Layout'}
          </button>
        </div>
      </div>

      {/* CANVAS */}
      <div 
        ref={containerRef}
        className="flex-1 bg-[#0d0f10] rounded-3xl border border-white/5 relative overflow-hidden"
        onMouseDown={() => setSelectedId(null)} // Clicar no fundo limpa a seleção
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative w-full h-full p-10">
          {zones.map(z => (
            <MapBlock 
              key={z.id} zone={z} gridSize={GRID_SIZE} 
              isSelected={selectedId === z.id} hasCollision={selectedId === z.id && hasCollision}
              onClick={() => setSelectedId(z.id)}
              onResizeStart={(e, h) => setInteraction({ type: 'resize', handle: h })}
              onDragStart={(e) => {
                const rect = containerRef.current.getBoundingClientRect();
                setSelectedId(z.id); // Seleciona ao clicar para arrastar
                setInteraction({ 
                  type: 'drag', 
                  offset: { x: (e.clientX - rect.left) / GRID_SIZE - z.x, y: (e.clientY - rect.top) / GRID_SIZE - z.y } 
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* PROPRIEDADES */}
      <div className={`w-80 bg-[#161819] border border-white/5 rounded-2xl transition-all ${selectedId ? 'translate-x-0' : 'translate-x-full hidden'}`}>
        {selectedId && (
          <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Propriedades</h3>
              <button onClick={() => setSelectedId(null)}><X size={18} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4 overflow-y-auto pr-1">
              <Input label="Nome da Zona" value={selectedZone.name} onChange={(v) => updateSelected('name', v)} />
              <Input label="Código" value={selectedZone.id_label} onChange={(v) => updateSelected('id_label', v)} />
              <Input label="Capacidade" type="number" value={selectedZone.capacity} onChange={(v) => updateSelected('capacity', v)} />
              <div className="pt-4 border-t border-white/5 space-y-2">
                <p className="text-[9px] font-black text-gray-600 uppercase">Geometria</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 font-bold bg-white/[0.02] p-3 rounded-xl">
                  <span>X: {selectedZone.x}</span><span>Y: {selectedZone.y}</span>
                  <span>W: {selectedZone.w}</span><span>H: {selectedZone.h}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolBtn({ icon: Icon, label, color, onClick }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all text-left">
      <Icon size={18} className={color} />
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
    </button>
  );
}

function Input({ label, value, type = "text", onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
             className="w-full bg-[#0d0f10] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:border-primary/50 outline-none transition-all" />
    </div>
  );
}
