import React, { useState } from 'react';
import { aiApi, ApiError } from '../services/api';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, BookOpen, Trophy, FileText } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export const AiCoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'coach',
      text: 'Hello! I am your AURA Personal AI Coach powered by Groq AI. How can I assist with your study roadmap, hackathon strategy, or productivity today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputContext, setInputContext] = useState('');
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendMessage = async (type: 'coach' | 'study' | 'hackathon' | 'summarize' = 'coach') => {
    const text = inputContext.trim();
    if (!text || loadingMode) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputContext('');
    setLoadingMode(type);

    try {
      let aiResponseText = '';
      if (type === 'coach') {
        const res = await aiApi.getCoachResponse(text);
        aiResponseText = res.response;
      } else if (type === 'study') {
        const res = await aiApi.getStudyPlan(text);
        aiResponseText = res.response;
      } else if (type === 'hackathon') {
        const res = await aiApi.getHackathonAdvice(text);
        aiResponseText = res.response;
      } else if (type === 'summarize') {
        const res = await aiApi.getSummary(text);
        aiResponseText = res.response;
      }

      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : 'AI service query failed. Please verify GROQ_API_KEY in backend/.env.';
      setErrorMessage(msg);
    } finally {
      setLoadingMode(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">AURA AI Coach</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Personal AI Operating System Coach (Powered by Groq LLM Backend Integration)
          </p>
        </div>

        <div className="px-3 py-1.5 bg-[#111827] text-white rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto">
          <Sparkles size={14} className="text-[#10B981]" />
          <span>FastAPI /api/ai Active</span>
        </div>
      </div>

      {/* Preset Action Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-[#9CA3AF] shrink-0">Quick AI Actions:</span>
        <button
          onClick={() => { setInputContext('Give me a 7-day study plan for FastAPI and React TypeScript'); sendMessage('study'); }}
          disabled={!!loadingMode}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#10B981] text-xs font-semibold text-[#374151] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer disabled:opacity-50"
        >
          <BookOpen size={14} className="text-[#059669]" />
          <span>Generate Study Plan</span>
        </button>

        <button
          onClick={() => { setInputContext('What are the best tips for winning a 24-hour hackathon?'); sendMessage('hackathon'); }}
          disabled={!!loadingMode}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#10B981] text-xs font-semibold text-[#374151] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer disabled:opacity-50"
        >
          <Trophy size={14} className="text-[#D97706]" />
          <span>Hackathon Advice</span>
        </button>

        <button
          onClick={() => { setInputContext('Summarize key principles of building clean web software architectures'); sendMessage('summarize'); }}
          disabled={!!loadingMode}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#10B981] text-xs font-semibold text-[#374151] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer disabled:opacity-50"
        >
          <FileText size={14} className="text-[#3B82F6]" />
          <span>Summarize Text</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs flex flex-col h-[520px]">
        {/* Messages view */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#111827] text-white' : 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]'
                }`}
              >
                {msg.sender === 'user' ? 'You' : <Bot size={18} />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#111827] text-white rounded-tr-xs'
                    : 'bg-[#FAFAFA] border border-[#E5E7EB] text-[#111827] rounded-tl-xs whitespace-pre-wrap'
                }`}
              >
                <div className="font-medium">{msg.text}</div>
                <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-[#9CA3AF]'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loadingMode && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5] flex items-center justify-center shrink-0">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] text-xs text-[#6B7280] flex items-center gap-2">
                <RefreshCw size={14} className="animate-spin text-[#10B981]" />
                <span>AI Coach is thinking ({loadingMode})...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#EF4444] text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFAFA] rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage('coach');
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputContext}
              onChange={(e) => setInputContext(e.target.value)}
              placeholder="Ask your AI Coach anything..."
              className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
              disabled={!!loadingMode}
            />

            <button
              type="submit"
              disabled={!inputContext.trim() || !!loadingMode}
              className="h-11 px-5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
