import React from 'react';
import { TrendingUp, Plus, Minus, Trash2 } from 'lucide-react';
import { Character } from '../types/character';
import { AVAILABLE_CLASSES, AVAILABLE_FOCI } from '../data/gameData';

interface LevelProgressionProps {
  character: Character;
  onUpdateLevel: (className: string, amount: number) => void;
  onAddClass: () => void;
  onRemoveClass: (className: string) => void;
  onUpdateClassName: (oldName: string, newName: string) => void;
  onUpdateClassFocus: (className: string, focus: string) => void;
}

export const LevelProgression: React.FC<LevelProgressionProps> = ({ 
  character, 
  onUpdateLevel, 
  onAddClass, 
  onRemoveClass, 
  onUpdateClassName, 
  onUpdateClassFocus 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
        <h2 className="text-xl font-bold text-white">Level Progression</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Gesamt Level:</span>
            <span className="text-2xl font-bold text-green-400">{character.totalLevel}</span>
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Gesamt MAV:</span>
            <span className="text-2xl font-bold text-blue-400">{character.totalMAV}</span>
          </div>
        </div>
      </div>
      
      {/* Classes */}
      <div className="space-y-4">
        {character.classes.map((cls) => (
          <div key={cls.name} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <select
                  value={cls.name}
                  onChange={(e) => onUpdateClassName(cls.name, e.target.value)}
                  className="bg-gray-600 text-white px-2 py-1 rounded text-sm border border-gray-500"
                >
                  {AVAILABLE_CLASSES.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
                {character.classes.length > 1 && (
                  <button
                    onClick={() => onRemoveClass(cls.name)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateLevel(cls.name, -1)}
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onUpdateLevel(cls.name, 1)}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Current Level:</span>
                <span className="text-white font-bold">{cls.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Current MAV:</span>
                <span className="text-blue-400 font-bold">{cls.mav}</span>
              </div>
              
              {/* Focus Selection for this class */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">Focus:</label>
                <select
                  value={cls.focus || ''}
                  onChange={(e) => onUpdateClassFocus(cls.name, e.target.value)}
                  disabled={cls.level < 60}
                  className={`w-full p-2 rounded text-sm border border-gray-500 ${
                    cls.level < 60 
                      ? 'bg-gray-600 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  <option value="">Kein Focus</option>
                  {AVAILABLE_FOCI.map(focus => (
                    <option key={focus} value={focus}>{focus}</option>
                  ))}
                </select>
                {cls.level < 60 && (
                  <p className="text-xs text-yellow-400 mt-1">
                    Focus verfügbar ab Level 60
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Class Button */}
        <div className="bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-500">
          <button
            onClick={onAddClass}
            className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 py-2"
          >
            <Plus className="w-5 h-5" />
            Klasse hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};