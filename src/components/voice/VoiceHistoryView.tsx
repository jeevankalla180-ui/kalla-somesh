import React, { useState } from 'react';
import {
  MessageSquareText,
  Volume2,
  Calendar,
  Sparkles,
  Code,
  Tag,
  Search,
  CheckCircle2,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceHistoryView: React.FC = () => {
  const { voiceHistory, speakText, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);

  const filtered = voiceHistory.filter(
    (item) =>
      item.transcription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.intent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayVoice = (id: string, text: string) => {
    setActivePlaybackId(id);
    speakText(text);
    setTimeout(() => setActivePlaybackId(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2B1055] via-[#4A1D6D] to-[#6B21A8] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Permanent Audit & Knowledge Base
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Voice Chat History & Structured Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Store the user's voice recordings, convert them into text, save what the system understood as
            structured data, and keep the responses provided during each conversation for future reference.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('live-voice')}
          className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
        >
          Open Live Voice
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transcripts, responses, or structured intents..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> saved audio sessions
        </div>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No voice logs matched your search.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-purple-200 transition-all space-y-3"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase">
                    {item.intent}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date} • {item.time}</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase px-2 py-0.5 rounded-md bg-slate-100">
                    Lang: {item.language.toUpperCase()}
                  </span>
                </div>

                <button
                  onClick={() => handlePlayVoice(item.id, item.response)}
                  className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-700" />
                  <span>{activePlaybackId === item.id ? 'Playing...' : 'Play Answer Audio'}</span>
                </button>
              </div>

              {/* User Spoken Transcript */}
              <div className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100">
                <span className="text-[10px] uppercase font-bold text-purple-700 block mb-1">
                  User Voice Transcription (ध्वनि प्रतिलेखन):
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  "{item.transcription}"
                </p>
              </div>

              {/* System Spoken Response */}
              <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                  System Spoken Advice / उत्तर:
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed font-semibold">
                  {item.response}
                </p>
              </div>

              {/* Structured Machine Understanding */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase mb-2">
                  <Code className="w-3.5 h-3.5 text-slate-400" />
                  <span>Structured Intelligence Extracted:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {Object.entries(item.structuredData).map(([key, val]) => (
                    <div key={key} className="bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-medium mr-1 text-[11px]">{key}:</span>
                      <span className="font-bold text-slate-800 text-[11px]">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
