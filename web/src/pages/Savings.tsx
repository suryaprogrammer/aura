import React, { useState } from 'react';
import { PiggyBank, Target, Plus, TrendingUp, CheckCircle2 } from 'lucide-react';

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

export const Savings: React.FC = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    { id: '1', title: 'Developer Workstation / Mac', targetAmount: 85000, currentAmount: 32000, targetDate: '2026-12-31' },
    { id: '2', title: 'Emergency Reserve Fund', targetAmount: 25000, currentAmount: 18000, targetDate: '2026-11-15' },
  ]);

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount);
    if (!title.trim() || isNaN(target) || target <= 0) return;

    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      targetAmount: target,
      currentAmount: 0,
      targetDate: targetDate || '2027-01-01',
    };

    setGoals([...goals, newGoal]);
    setTitle('');
    setTargetAmount('');
    setTargetDate('');
  };

  const addDeposit = (id: string, amount: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <PiggyBank className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Saving Money Notes</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Target Savings Goals & Progress Tracking
          </p>
        </div>
      </div>

      {/* Add Goal Form */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">Create Savings Goal</h2>
        <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal name (e.g. Laptop)"
            className="h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
          />

          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Target Amount (₹)"
            className="h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
          />

          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#10B981]"
          />

          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Goal</span>
          </button>
        </form>
      </div>

      {/* Active Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const percent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          return (
            <div key={goal.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-[#111827]">{goal.title}</h3>
                    <p className="text-xs text-[#6B7280]">Target Date: {goal.targetDate}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]">
                    {percent}% Reached
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-xl font-bold text-[#111827]">₹{goal.currentAmount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-[#6B7280]">/ ₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-[#10B981] transition-all rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </div>

              <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#9CA3AF]">Quick Deposit:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addDeposit(goal.id, 500)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
                  >
                    +₹500
                  </button>
                  <button
                    onClick={() => addDeposit(goal.id, 1000)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
                  >
                    +₹1,000
                  </button>
                  <button
                    onClick={() => addDeposit(goal.id, 5000)}
                    className="px-2.5 py-1 rounded-lg bg-[#ECFDF5] border border-[#D1FAE5] hover:bg-[#D1FAE5] text-xs font-semibold text-[#059669]"
                  >
                    +₹5,000
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
