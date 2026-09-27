import React from 'react';
import { Activity, Dumbbell, Flame, Droplets, Plus } from 'lucide-react';

export const Fitness: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Fitness Tracker</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Deterministic Workout Logging, Exercises, Body Metrics & Hydration
          </p>
        </div>

        <button className="px-4 py-2 bg-[#111827] hover:bg-[#1F2937] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs self-start sm:self-auto">
          <Plus size={15} />
          <span>Log Workout</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Workouts Completed</span>
            <Dumbbell size={18} className="text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">0</div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 block">This week target: 4</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Calories Active</span>
            <Flame size={18} className="text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">0 <span className="text-xs font-normal text-[#6B7280]">kcal</span></div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 block">Daily goal: 450 kcal</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Water Intake</span>
            <Droplets size={18} className="text-[#3B82F6]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">0 <span className="text-xs font-normal text-[#6B7280]">/ 3.0 L</span></div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 block">Hydration Goal</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Body Weight</span>
            <Activity size={18} className="text-[#8B5CF6]" />
          </div>
          <div className="text-2xl font-bold text-[#111827]">-- <span className="text-xs font-normal text-[#6B7280]">kg</span></div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 block">Log body metrics</span>
        </div>
      </div>

      {/* Routine Outline */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <h2 className="text-sm font-bold text-[#111827] mb-4">Recommended Workout Splits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
            <h3 className="text-xs font-bold text-[#111827] mb-1">Push Day</h3>
            <p className="text-[11px] text-[#6B7280]">Bench Press, Overhead Press, Incline DB, Tricep Dips, Lateral Raises</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
            <h3 className="text-xs font-bold text-[#111827] mb-1">Pull Day</h3>
            <p className="text-[11px] text-[#6B7280]">Lat Pulldowns, Barbell Rows, Face Pulls, Bicep Curls, Rear Delt Flyes</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
            <h3 className="text-xs font-bold text-[#111827] mb-1">Legs & Core</h3>
            <p className="text-[11px] text-[#6B7280]">Squats, Romanian Deadlifts, Bulgarian Split Squats, Calf Raises, Planks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
