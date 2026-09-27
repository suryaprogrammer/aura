import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-[#E5E7EB] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#ECFDF5] border border-[#D1FAE5] rounded-full text-[#065F46] text-xs font-semibold">
          <ShieldCheck size={14} className="text-[#059669]" />
          <span>AURA System Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User profile pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
          <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center text-[10px] font-bold">
            {user?.username ? user.username.substring(0, 2).toUpperCase() : 'AU'}
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-[#111827] leading-none">{user?.username}</div>
            <div className="text-[9px] text-[#6B7280] font-medium leading-none mt-0.5">Account #{user?.id}</div>
          </div>
        </div>

        {/* Exit / Sign out button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-[#FEF2F2] hover:border-[#FCA5A5] hover:text-[#EF4444] text-xs font-semibold text-[#4B5563] transition-all"
          title="Sign Out"
        >
          <LogOut size={14} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
};
