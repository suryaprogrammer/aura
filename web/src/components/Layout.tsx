import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  Compass,
  Trophy,
  Wallet,
  PiggyBank,
  Shirt,
  Bot,
} from 'lucide-react';

const mobileNavItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/fitness', label: 'Fitness', icon: Activity },
  { to: '/finance', label: 'Finance', icon: Wallet },
  { to: '/ai-coach', label: 'Coach', icon: Bot },
];

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row">
      {/* Desktop Sidebar (visible md+) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (visible < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-2 py-2 flex items-center justify-around z-40 shadow-lg">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all ${
                  isActive ? 'text-[#111827]' : 'text-[#9CA3AF] hover:text-[#4B5563]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} className={isActive ? 'text-[#10B981]' : ''} />
                  <span className="mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
