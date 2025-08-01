import React from 'react';
import { User, Heart, Zap, Edit3 } from 'lucide-react';
import { Character, ActionRoutine } from '../types/character';
import { ActionRoutineDisplay } from './ActionRoutineDisplay';

interface CharacterDashboardProps {
  character: Character;
  actionRoutine: ActionRoutine;
  onUpdateCharacterName: (newName: string) => void;
  onUpdateActionRoutine: (routine: ActionRoutine) => void;
  onApplyDamage: (amount: number) => void;
  onApplyHealing: (amount: number) => void;
  onUpdateBaseHealth: (newHealth: number) => void;
  onUpdateVigor: (newVigor: number) => void;
}

export const CharacterDashboard: React.FC<CharacterDashboardProps> = ({ 
  character, 
  actionRoutine,
  onUpdateCharacterName,
  onUpdateActionRoutine,
  onApplyDamage,
  onApplyHealing,
  onUpdateBaseHealth,
  onUpdateVigor,
}) => {
  const totalHealth = character.health + character.vigor;
  const healthPercentage = character.currentHealth / totalHealth;
  const isLowHealth = character.currentHealth < totalHealth;
  
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tempName, setTempName] = React.useState(character.name);
  const [damageAmount, setDamageAmount] = React.useState(0);
  const [healAmount, setHealAmount] = React.useState(0);
  const [isEditingHealth, setIsEditingHealth] = React.useState(false);
  const [isEditingVigor, setIsEditingVigor] = React.useState(false);
  const [tempHealth, setTempHealth] = React.useState(character.health);
  const [tempVigor, setTempVigor] = React.useState(character.vigor);

  const handleNameSave = () => {
    onUpdateCharacterName(tempName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(character.name);
    setIsEditingName(false);
  };

  const handleHealthSave = () => {
    onUpdateBaseHealth(tempHealth);
    setIsEditingHealth(false);
  };

  const handleVigorSave = () => {
    onUpdateVigor(tempVigor);
    setIsEditingVigor(false);
  };

  const handleDamageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && damageAmount > 0) {
      onApplyDamage(damageAmount);
      setDamageAmount(0);
    }
  };

  const handleHealKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && healAmount > 0) {
      onApplyHealing(healAmount);
      setHealAmount(0);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <User className="w-8 h-8 text-blue-400 mr-3" />
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="text-2xl font-bold bg-gray-700 text-white px-2 py-1 rounded"
              onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
            />
            <button
              onClick={handleNameSave}
              className="text-green-400 hover:text-green-300"
            >
              ✓
            </button>
            <button
              onClick={handleNameCancel}
              className="text-red-400 hover:text-red-300"
            >
              ✗
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{character.name}</h1>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-gray-400 hover:text-gray-300"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Klasse(n)</h3>
          {character.classes.map((cls, index) => (
            <div key={index} className="text-white">
              <span className="font-medium">{cls.name}</span>
              <span className="text-gray-400 ml-2">({cls.level})</span>
              {cls.focus && (
                <span className="text-blue-400 ml-2 text-sm">- {cls.focus}</span>
              )}
            </div>
          ))}
          <div className="mt-2 text-sm text-gray-400">
            Gesamt-Level: {character.totalLevel}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Aktive Foci</h3>
          {character.classes
            .filter(cls => cls.focus)
            .map((cls, index) => (
              <div key={index} className="text-white text-sm">
                {cls.focus} ({cls.name})
              </div>
            ))}
          {character.classes.filter(cls => cls.focus).length === 0 && (
            <div className="text-gray-400 text-sm">Keine Foci aktiv</div>
          )}
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">MAV Levels</h3>
          {character.classes.map((cls, index) => (
            <div key={index} className="text-white text-sm">
              {cls.name} MAV {cls.mav}
            </div>
          ))}
          <div className="mt-2 text-sm text-blue-400 font-medium">
            Gesamt MAV: {character.totalMAV}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Heart className="w-5 h-5 text-red-400 mr-2" />
            <h3 className="text-sm font-semibold text-gray-300">Health</h3>
          </div>
          <div className="text-white mb-3">
            <div className="text-2xl font-bold text-green-400 mb-1">
              <span className={isLowHealth ? 'text-red-400' : 'text-green-400'}>
                {character.currentHealth.toLocaleString()}
              </span>
              <span className="text-green-400"> / {totalHealth.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>HP:</span>
                {isEditingHealth ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={tempHealth}
                      onChange={(e) => setTempHealth(parseInt(e.target.value) || 0)}
                      className="w-20 bg-gray-600 text-white px-1 py-0 rounded text-sm"
                    />
                    <button onClick={handleHealthSave} className="text-green-400 text-xs">✓</button>
                    <button onClick={() => setIsEditingHealth(false)} className="text-red-400 text-xs">✗</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>{character.health.toLocaleString()}</span>
                    <button onClick={() => setIsEditingHealth(true)} className="text-gray-400 hover:text-gray-300">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Vigor:</span>
                {isEditingVigor ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={tempVigor}
                      onChange={(e) => setTempVigor(parseInt(e.target.value) || 0)}
                      className="w-20 bg-gray-600 text-white px-1 py-0 rounded text-sm"
                    />
                    <button onClick={handleVigorSave} className="text-green-400 text-xs">✓</button>
                    <button onClick={() => setIsEditingVigor(false)} className="text-red-400 text-xs">✗</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>{character.vigor.toLocaleString()}</span>
                    <button onClick={() => setIsEditingVigor(true)} className="text-gray-400 hover:text-gray-300">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Damage and Healing Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Damage</label>
              <input
                type="number"
                value={damageAmount}
                onChange={(e) => setDamageAmount(parseInt(e.target.value) || 0)}
                onKeyPress={handleDamageKeyPress}
                className="w-full bg-gray-600 text-white px-2 py-1 rounded text-sm"
                min="0"
                placeholder="Enter drücken"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Healing</label>
              <input
                type="number"
                value={healAmount}
                onChange={(e) => setHealAmount(parseInt(e.target.value) || 0)}
                onKeyPress={handleHealKeyPress}
                className="w-full bg-gray-600 text-white px-2 py-1 rounded text-sm"
                min="0"
                placeholder="Enter drücken"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 md:col-span-3 lg:col-span-3">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            <h3 className="text-sm font-semibold text-gray-300">Action Routine</h3>
          </div>
          <ActionRoutineDisplay
            character={character}
            actionRoutine={actionRoutine}
            onUpdateActionRoutine={onUpdateActionRoutine}
          />
        </div>
      </div>
    </div>
  );
};