import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  Compass,
  Trophy,
  Wallet,
  PiggyBank,
  Shirt,
  BookOpen,
  Bot,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'To-Do Tasks', icon: CheckSquare },
  { to: '/fitness', label: 'Fitness Tracker', icon: Activity },
  { to: '/ai-engineer', label: 'AI Engineer Roadmap', icon: Compass },
  { to: '/hackathon', label: 'Hackathon Steps', icon: Trophy },
  { to: '/finance', label: 'Financial Tracker', icon: Wallet },
  { to: '/savings', label: 'Saving Money', icon: PiggyBank },
  { to: '/fashion', label: 'Fashion Notes', icon: Shirt },
  { to: '/ai-coach', label: 'AI Coach', icon: Bot, badge: 'Groq AI' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center relative shadow-xs">
            <div className="w-3 h-3 rounded-sm border-[1.5px] border-[#111827]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-[0.15em] text-[#111827]">AURA</h1>
            <p className="text-[10px] text-[#6B7280] font-medium">Personal Operating System</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-[#10B981]' : ''} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-[#059669] text-white'
                            : 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] text-[11px] space-y-1">
          <div className="flex items-center justify-between font-medium text-[#6B7280]">
            <span>FastAPI Server</span>
            <span className="flex items-center gap-1 text-[#059669] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Online
            </span>
          </div>
          <div className="text-[10px] text-[#9CA3AF]">http://127.0.0.1:8000</div>
        </div>
      </div>
    </aside>
  );
};
