import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Map, ArrowRightLeft, FileText, Users, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, path: '/', label: 'Dashboard' },
    { icon: Package, path: '/estoque', label: 'Estoque' },
    { icon: Map, path: '/mapa', label: 'Mapa' },
    { icon: ArrowRightLeft, path: '/movimentacoes', label: 'Entradas' },
    { icon: FileText, path: '/relatorios', label: 'Relatórios' },
    { icon: Users, path: '/usuarios', label: 'Usuários' },
  ];

  return (
    <aside className="w-16 flex flex-col items-center py-6 bg-[#1a1c1e] border-r border-white/5 h-screen">
      {/* Logo com o ícone laranja redondo */}
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-10 glow-orange">
        <Package className="text-white" size={24} />
      </div>

      <nav className="flex-1 space-y-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            title={item.label}
            className={({ isActive }) =>
              `p-2 rounded-lg flex items-center justify-center transition-all ${
                isActive ? 'bg-primary text-white glow-orange' : 'text-gray-500 hover:text-white'
              }`
            }
          >
            <item.icon size={22} />
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6 text-gray-500">
        <Settings className="cursor-pointer hover:text-white" size={22} />
        <LogOut className="cursor-pointer hover:text-accent-red" size={22} />
      </div>
    </aside>
  );
}