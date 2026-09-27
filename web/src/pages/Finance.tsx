import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Tag, Calendar, ArrowUpRight } from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: 'Food' | 'Travel' | 'Education' | 'Projects' | 'Personal' | 'Salary';
  date: string;
}

export const Finance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Stipend / Freelance Work', amount: 15000, type: 'income', category: 'Salary', date: '2026-09-20' },
    { id: '2', title: 'Domain & Cloud Hosting', amount: 1200, type: 'expense', category: 'Projects', date: '2026-09-22' },
    { id: '3', title: 'Books & Course Subscription', amount: 850, type: 'expense', category: 'Education', date: '2026-09-25' },
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState<Transaction['category']>('Food');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Financial Tracker</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Personal Income & Expense Management with Deterministic Summaries
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-2">
            <span>Net Balance</span>
            <Wallet size={16} className="text-[#10B981]" />
          </div>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-[#059669]' : 'text-[#EF4444]'}`}>
            ₹{balance.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 block">Current Available Funds</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-2">
            <span>Total Income</span>
            <TrendingUp size={16} className="text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-[#059669] font-medium mt-1 block">+ Total Inflow</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-2">
            <span>Total Expenses</span>
            <TrendingDown size={16} className="text-[#EF4444]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-[#EF4444] font-medium mt-1 block">- Total Outflow</span>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">Add Transaction</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Transaction description"
            className="h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (₹)"
            className="h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="h-10 px-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#10B981]"
          >
            <option value="expense">Expense (-)</option>
            <option value="income">Income (+)</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Transaction['category'])}
            className="h-10 px-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#10B981]"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Projects">Projects</option>
            <option value="Salary">Salary / Income</option>
            <option value="Personal">Personal</option>
          </select>

          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Entry</span>
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827]">Transaction Log</h2>

        <div className="space-y-2">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    t.type === 'income' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#EF4444]'
                  }`}
                >
                  {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">{t.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold text-[#6B7280]">{t.category}</span>
                    <span className="text-[10px] text-[#9CA3AF]">• {t.date}</span>
                  </div>
                </div>
              </div>

              <div className={`text-sm font-bold ${t.type === 'income' ? 'text-[#059669]' : 'text-[#111827]'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
