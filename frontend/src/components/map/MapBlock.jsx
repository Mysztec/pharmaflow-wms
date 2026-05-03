import React from 'react';

export default function MapBlock({ zone, isSelected, gridSize, onResizeStart, hasCollision, onDragStart }) {
  const style = {
    left: zone.x * gridSize,
    top: zone.y * gridSize,
    width: zone.w * gridSize,
    height: zone.h * gridSize,
  };

  const typeStyles = {
    zona: 'border-orange-500/40 bg-orange-500/10 text-orange-500',
    prateleira: 'border-blue-500/40 bg-blue-500/10 text-blue-500',
    corredor: 'border-gray-500/40 bg-gray-500/5 text-gray-400',
    especial: 'border-purple-500/40 bg-purple-500/10 text-purple-500',
  };

  const collisionClass = hasCollision ? 'border-red-500 bg-red-500/40 ring-4 ring-red-500/20 z-[100]' : '';

  const handles = [
    { id: 'n',  cursor: 'n-resize',  className: 'top-[-6px] left-1/2 -translate-x-1/2 w-8 h-2' },
    { id: 's',  cursor: 's-resize',  className: 'bottom-[-6px] left-1/2 -translate-x-1/2 w-8 h-2' },
    { id: 'e',  cursor: 'e-resize',  className: 'right-[-6px] top-1/2 -translate-y-1/2 w-2 h-8' },
    { id: 'w',  cursor: 'w-resize',  className: 'left-[-6px] top-1/2 -translate-y-1/2 w-2 h-8' },
    { id: 'nw', cursor: 'nw-resize', className: 'top-[-6px] left-[-6px] w-4 h-4' },
    { id: 'ne', cursor: 'ne-resize', className: 'top-[-6px] right-[-6px] w-4 h-4' },
    { id: 'sw', cursor: 'sw-resize', className: 'bottom-[-6px] left-[-6px] w-4 h-4' },
    { id: 'se', cursor: 'se-resize', className: 'bottom-[-6px] right-[-6px] w-4 h-4' },
  ];

  return (
    <div
      style={style}
      onMouseDown={(e) => { 
        e.stopPropagation(); // CRÍTICO: Impede que o fundo desmarque a seleção
        onDragStart(e); 
      }}
      className={`absolute border-2 rounded-xl p-2 flex flex-col justify-center items-center text-center select-none
        ${typeStyles[zone.type] || typeStyles.zona} 
        ${isSelected ? 'ring-2 ring-white ring-offset-4 ring-offset-[#0d0f10] z-50 shadow-2xl scale-[1.01]' : 'z-10'}
        ${collisionClass}
      `}
    >
      <div className="pointer-events-none">
        <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">{zone.name}</p>
        <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest mt-0.5">{zone.id_label}</p>
      </div>

      {isSelected && handles.map(h => (
        <div 
          key={h.id}
          onMouseDown={(e) => { 
            e.stopPropagation(); // Impede o drag ao tentar redimensionar
            onResizeStart(e, h.id); 
          }}
          className={`absolute bg-white rounded-full shadow-md z-[60] hover:scale-125 transition-transform ${h.className}`}
          style={{ cursor: h.cursor }}
        />
      ))}
    </div>
  );
}