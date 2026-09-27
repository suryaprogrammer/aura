import React from 'react';
import { Compass, CheckCircle2, Circle, Code, Cpu, Layers } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  topics: string[];
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Stage 1: Engineering Foundation',
    subtitle: 'Python, Data Structures, OOP & Linux CLI',
    status: 'in-progress',
    topics: ['Python 3.12 Deep Dive', 'Arrays, Strings, HashMaps, Trees & Graphs', 'Git & GitHub Workflows', 'FastAPI & REST API Standards'],
  },
  {
    id: 2,
    title: 'Stage 2: Web & Backend Mastery',
    subtitle: 'React, TypeScript, Vite & Relational DBs',
    status: 'in-progress',
    topics: ['React + TypeScript Architecture', 'Tailwind CSS Custom Styling', 'SQLite & PostgreSQL with SQLAlchemy', 'JWT Authentication & Security'],
  },
  {
    id: 3,
    title: 'Stage 3: AI Fundamentals & Generative AI',
    subtitle: 'LLMs, Prompt Engineering, Gemini API & RAG',
    status: 'upcoming',
    topics: ['Google Gemini API Integration', 'LangChain & LlamaIndex Frameworks', 'Vector Databases (Chroma, Qdrant, Pinecone)', 'Retrieval-Augmented Generation (RAG) Architecture'],
  },
  {
    id: 4,
    title: 'Stage 4: Autonomous Agents & Tool Use',
    subtitle: 'Function Calling, ReAct Loop & Multi-Agent Systems',
    status: 'upcoming',
    topics: ['Model Tool Calling & Function Execution', 'ReAct Reasoning Loops', 'Multi-Agent Collaboration (CrewAI / AutoGen)', 'Evaluation & Guardrails'],
  },
  {
    id: 5,
    title: 'Stage 5: Portfolio Capstone Projects',
    subtitle: 'Kural AI & Chuvi AI Production Deployments',
    status: 'upcoming',
    topics: ['Kural AI — Tamil Ethics & Literature Intelligence', 'Chuvi AI — Personal Voice & Vision Assistant', 'Cloud Deployment on Vercel & Cloud Run', 'System Metrics & Monitoring'],
  },
];

export const AiEngineer: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">AI Engineer Roadmap</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Phase 3 Curriculum • Step-by-Step Path to Production AI Engineering
          </p>
        </div>

        <div className="px-3 py-1.5 bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl text-[#065F46] text-xs font-semibold self-start sm:self-auto">
          Progress: Stage 1 & 2 Active
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`bg-white border rounded-2xl p-6 shadow-xs transition-all ${
              stage.status === 'in-progress' ? 'border-[#10B981] ring-1 ring-[#10B981]/20' : 'border-[#E5E7EB]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#111827] text-white">
                    Stage {stage.id}
                  </span>
                  <h2 className="text-base font-bold text-[#111827]">{stage.title}</h2>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">{stage.subtitle}</p>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                  stage.status === 'completed'
                    ? 'bg-[#10B981] text-white'
                    : stage.status === 'in-progress'
                    ? 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}
              >
                {stage.status === 'completed'
                  ? 'Completed'
                  : stage.status === 'in-progress'
                  ? 'Active Stage'
                  : 'Upcoming'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-3 border-t border-[#F3F4F6]">
              {stage.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#374151]">
                  {stage.status === 'completed' ? (
                    <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  ) : (
                    <Circle size={14} className="text-[#9CA3AF] shrink-0" />
                  )}
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
