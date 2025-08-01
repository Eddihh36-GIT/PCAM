import React from 'react';
import { RotateCcw, Clock, Calendar, RefreshCw, Timer, CalendarDays } from 'lucide-react';

interface ResetControlsProps {
  onReset: (type: 'turn' | 'round' | 'sequence' | 'hour' | 'day' | 'week' | 'month') => void;
}

export const ResetControls: React.FC<ResetControlsProps> = ({ onReset }) => {
  const resetButtons = [
    { type: 'sequence' as const, label: 'Sequenz Reset', icon: RefreshCw, color: 'bg-green-600 hover:bg-green-700' },
    { type: 'round' as const, label: 'Runde Reset', icon: RotateCcw, color: 'bg-orange-600 hover:bg-orange-700' },
    { type: 'turn' as const, label: 'Turn Reset', icon: Clock, color: 'bg-yellow-600 hover:bg-yellow-700' },
    { type: 'hour' as const, label: 'Stunde Reset', icon: Timer, color: 'bg-cyan-600 hover:bg-cyan-700' },
    { type: 'day' as const, label: 'Tag Reset', icon: Calendar, color: 'bg-blue-600 hover:bg-blue-700' },
    { type: 'week' as const, label: 'Woche Reset', icon: CalendarDays, color: 'bg-purple-600 hover:bg-purple-700' },
    { type: 'month' as const, label: 'Monat Reset', icon: CalendarDays, color: 'bg-red-600 hover:bg-red-700' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Reset Kontrollen</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {resetButtons.map(({ type, label, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => onReset(type)}
            className={`flex flex-col items-center justify-center ${color} text-white px-3 py-3 rounded-lg font-medium transition-colors min-h-[80px]`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">{label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>• <strong>Hierarchische Resets:</strong> Höhere Ebenen setzen alle darunterliegenden zurück</p>
      </div>
    </div>
  );
};