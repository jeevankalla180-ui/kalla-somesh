import React from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId } from '../../types';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    notifications,
    markNotificationAsRead,
    setCurrentView,
  } = useApp();

  if (!isNotificationsModalOpen) return null;

  const handleAction = (id: string, view?: ViewId) => {
    markNotificationAsRead(id);
    if (view) {
      setCurrentView(view);
      setIsNotificationsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-end p-4 sm:p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in slide-in-from-right-8 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-700" />
            <h3 className="font-bold text-sm text-slate-800">Real-Time Alerts & Monitoring</h3>
          </div>
          <button
            onClick={() => setIsNotificationsModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No new alerts. Your business is operating normally.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleAction(n.id, n.actionView)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  !n.read
                    ? 'bg-purple-50/70 border-purple-200'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {n.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                    {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {n.type === 'opportunity' && <Sparkles className="w-4 h-4 text-pink-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {n.description}
                    </p>
                    {n.actionView && (
                      <span className="text-[10px] text-purple-700 font-semibold mt-1.5 flex items-center gap-1">
                        <span>Open Feature</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400">
            Real-time business telemetry engine continuously monitoring all accounts
          </span>
        </div>
      </div>
    </div>
  );
};
