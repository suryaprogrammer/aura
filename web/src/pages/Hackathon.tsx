import React, { useState } from 'react';
import { Trophy, CheckSquare, Sparkles, Award, Zap, Code2, Presentation } from 'lucide-react';

interface ChecklistItem {
  id: number;
  phase: string;
  task: string;
  completed: boolean;
}

const initialChecklist: ChecklistItem[] = [
  // Phase A: Idea & Preparation (1-6)
  { id: 1, phase: 'Preparation', task: 'Identify clear problem statement with high judge emotional resonance', completed: true },
  { id: 2, phase: 'Preparation', task: 'Form complementary team (Frontend, Backend/AI, Pitch Lead)', completed: true },
  { id: 3, phase: 'Preparation', task: 'Validate track requirements & sponsor API bonus criteria', completed: false },
  { id: 4, phase: 'Preparation', task: 'Draft system architecture diagram & wireframe key screens', completed: false },
  { id: 5, phase: 'Preparation', task: 'Setup GitHub repository with boilerplate template & CI/CD', completed: false },
  { id: 6, phase: 'Preparation', task: 'Prepare fallback mock responses in case live APIs timeout', completed: false },

  // Phase B: MVP Development (7-15)
  { id: 7, phase: 'Development', task: 'Build core "Wow" feature first before secondary utilities', completed: false },
  { id: 8, phase: 'Development', task: 'Ensure single primary user flow works end-to-end flawlessly', completed: false },
  { id: 9, phase: 'Development', task: 'Implement clean, responsive UI with generous whitespace & green accents', completed: true },
  { id: 10, phase: 'Development', task: 'Integrate Groq AI / Gemini API with sub-second streaming latency', completed: false },
  { id: 11, phase: 'Development', task: 'Add loading spinners & micro-feedback for every user click', completed: false },
  { id: 12, phase: 'Development', task: 'Purge console errors, unhandled rejections & broken image links', completed: false },
  { id: 13, phase: 'Development', task: 'Test on real mobile browser and 1920px desktop displays', completed: false },
  { id: 14, phase: 'Development', task: 'Deploy live accessible staging URL (Vercel / Cloud Run)', completed: false },
  { id: 15, phase: 'Development', task: 'Prepare seeds & sample demo data so judges never see blank screens', completed: false },

  // Phase C: Demo & Pitch (16-23)
  { id: 16, phase: 'Pitch & Demo', task: 'Draft 3-minute pitch deck (Problem, Solution, Tech Stack, Business Value)', completed: false },
  { id: 17, phase: 'Pitch & Demo', task: 'Record 60-second backup walkthrough video (Loom/MP4)', completed: false },
  { id: 18, phase: 'Pitch & Demo', task: 'Hook the judges in the first 15 seconds with a relatable hook', completed: false },
  { id: 19, phase: 'Pitch & Demo', task: 'Show, don\'t just tell — start live demo within 45 seconds of pitch', completed: false },
  { id: 20, phase: 'Pitch & Demo', task: 'Rehearse pitch 5 times with timer and strict 3-minute cutoff', completed: false },
  { id: 21, phase: 'Pitch & Demo', task: 'Prepare answers for technical Q&A (scalability, security, API cost)', completed: false },
  { id: 22, phase: 'Pitch & Demo', task: 'Submit Devpost / submission form 30 minutes before deadline', completed: false },
  { id: 23, phase: 'Pitch & Demo', task: 'Verify live submission link from an incognito window', completed: false },
];

export const Hackathon: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  const toggleItem = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Hackathon Winning Steps</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            23-Point Execution Blueprint • Architecture, MVP Build & Pitch Rehearsal
          </p>
        </div>

        <div className="text-right self-start sm:self-auto">
          <div className="text-xl font-bold text-[#111827]">{completedCount} / 23</div>
          <div className="text-[10px] text-[#059669] font-bold">{progressPercent}% Ready for Submission</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold text-[#374151] mb-2">
          <span>Overall Readiness</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#10B981] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Zap size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">1. The 15-Second Hook</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Grab attention immediately with a clear human problem. Never spend 2 minutes explaining boring slides.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Code2 size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">2. Flawless Core Flow</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            One working flow beats five broken features. Perfect the primary user interaction and demo it live.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Presentation size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">3. Backup Video & Incognito Link</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Always record a 60s backup video in case of wifi failure. Test your deployed submission link early.
          </p>
        </div>
      </div>

      {/* 23-Point Checklist */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#111827] flex items-center gap-2">
          <Award size={16} className="text-[#10B981]" />
          <span>23-Point Preparation Checklist</span>
        </h2>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                item.completed
                  ? 'bg-[#FAFAFA] border-[#E5E7EB] opacity-75'
                  : 'bg-white border-[#E5E7EB] hover:border-[#10B981]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center text-white shrink-0 ${
                  item.completed ? 'bg-[#10B981] border-[#10B981]' : 'border-[#D1D5DB]'
                }`}
              >
                {item.completed && <CheckSquare size={13} />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] mr-2">
                  #{item.id} • {item.phase}
                </span>
                <span className={`text-xs font-semibold ${item.completed ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'}`}>
                  {item.task}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
