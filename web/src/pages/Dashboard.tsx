import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckSquare,
  TrendingUp,
  Wallet,
  PiggyBank,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Activity,
  Trophy,
  Bot,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-[#6B7280]">{dateFormatted}</div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight mt-1">
            Good day, <span className="text-[#059669]">{user?.username || 'Surya'}</span>
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Personal Command Center • Web Application Active
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl text-[#065F46] text-xs font-medium self-start sm:self-auto shrink-0">
          <ShieldCheck size={16} className="text-[#059669]" />
          <span>JWT Authenticated Session</span>
        </div>
      </div>

      {/* Focus & Quick AI Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#059669] text-xs font-bold tracking-wider uppercase mb-2">
              <Sparkles size={15} />
              <span>TODAY'S FOCUS</span>
            </div>
            <h2 className="text-lg font-bold text-[#111827]">
              Complete Python DSA practice & verify AURA Web Architecture
            </h2>
            <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
              Maintain daily execution targets across AI engineering, hackathon prep, and fitness consistency.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
            <span className="text-xs text-[#9CA3AF] font-medium">Status: Active Priority</span>
            <Link
              to="/tasks"
              className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1"
            >
              <span>Manage Tasks</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* AI Coach Quick Card */}
        <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-[#10B981]/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold tracking-widest text-[#10B981] uppercase">AI ASSISTANT</span>
              <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[9px] font-bold">Groq AI</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">AURA AI Coach</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Ask questions about study plans, hackathon strategy, or personal productivity.
            </p>
          </div>
          <Link
            to="/ai-coach"
            className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Bot size={15} />
            <span>Consult AI Coach</span>
          </Link>
        </div>
      </div>

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Tasks Summary */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">Tasks</h3>
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-medium">0 / 0 Done</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Categorized task management (Personal, College, AI, Coding, Hackathon, Fitness, Finance).
            </p>
          </div>
          <Link
            to="/tasks"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Open Tasks</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* AI Engineer Roadmap */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">AI Roadmap</h3>
              </div>
              <span className="text-[10px] text-[#059669] font-bold">Phase 3</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Foundation, Generative AI (Gemini API, LangChain, Agents, RAG), and Portfolio Projects.
            </p>
          </div>
          <Link
            to="/ai-engineer"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>View Roadmap</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Hackathon Roadmap */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">Hackathon Prep</h3>
              </div>
              <span className="text-[10px] text-[#059669] font-bold">Phase 7</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              23-point preparation checklist, MVP architecture, demo readiness, and judge rehearsal workflows.
            </p>
          </div>
          <Link
            to="/hackathon"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Checklist & Tips</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Fitness Tracker */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">Fitness</h3>
              </div>
              <span className="text-[10px] text-[#6B7280]">0 Workouts</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Body measurements, workout sessions, exercise tracking, sets, reps, weight, and water logging.
            </p>
          </div>
          <Link
            to="/fitness"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Open Fitness</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Finance */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">Finance</h3>
              </div>
              <span className="text-xs font-bold text-[#059669]">₹0 Balance</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Income/Expense logging, category breakdowns, and monthly financial summaries.
            </p>
          </div>
          <Link
            to="/finance"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Financial Tracker</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Savings Goals */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#D1D5DB] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PiggyBank size={18} className="text-[#111827]" />
                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase">Savings</h3>
              </div>
              <span className="text-[10px] text-[#6B7280]">Goals</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Target goals (e.g., Laptop ₹80,000), deposit logging, and progress calculation.
            </p>
          </div>
          <Link
            to="/savings"
            className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#059669] hover:underline flex items-center justify-between"
          >
            <span>Saving Goals</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
