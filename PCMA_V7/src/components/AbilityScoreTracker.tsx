import React from 'react';
import { AbilityScoreDetail } from '../types/character';
import { getAbilityData } from '../lib/rules/abilityFunctions';

interface AbilityScoreTrackerProps {
  abilityScores: Record<string, AbilityScoreDetail>;
  onUpdateAbilityScores: (ability: string, field: keyof AbilityScoreDetail, value: number) => void;
}

export function AbilityScoreTracker({ abilityScores, onUpdateAbilityScores }: AbilityScoreTrackerProps) {
  const handleAbilityChange = (ability: string, field: keyof AbilityScoreDetail, value: number) => {
    onUpdateAbilityScores(ability, field, value);
  };

  const getModifier = (score: number): string => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const renderAbilityScore = (abilityName: string, ability: any) => {
    const totalScore = ability.baseScore + ability.enhancement;
    const abilityData = getAbilityData(abilityName as any, totalScore);

    return (
      <div key={abilityName} className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3 capitalize">{abilityName}</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Base</label>
            <input
              type="number"
              value={ability.baseScore}
              onChange={(e) => handleAbilityChange(abilityName, 'baseScore', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-600 text-white p-2 rounded text-sm"
              min="0"
              max="25"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Enhancement</label>
            <input
              type="number"
              value={ability.enhancement}
              onChange={(e) => handleAbilityChange(abilityName, 'enhancement', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-600 text-white p-2 rounded text-sm"
              min="0"
              max="25"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">Check</label>
          <select
            value={ability.check}
            onChange={(e) => handleAbilityChange(abilityName, 'check', parseInt(e.target.value))}
            className="w-full bg-gray-600 text-white p-2 rounded text-sm"
          >
            {Array.from({ length: 21 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">Defense</label>
          <select
            value={ability.defCheck}
            onChange={(e) => handleAbilityChange(abilityName, 'defCheck', parseInt(e.target.value))}
            className="w-full bg-gray-600 text-white p-2 rounded text-sm"
          >
            {Array.from({ length: 21 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <div>Total Score: {totalScore}</div>
          <div>Modifier: {getModifier(totalScore)}</div>
          <div>Total Check: {totalScore + ability.check}</div>
          <div>Total Defense: {totalScore + ability.defCheck}</div>
        </div>

        {abilityData && (
          <div className="mt-4 pt-3 border-t border-gray-600">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Ability Bonuses</h4>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {Object.entries(abilityData).map(([key, value]) => {
                if (key === 'bonusSpells' && Array.isArray(value)) {
                  const spellLevels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
                  const bonuses = value.map((bonus, index) => 
                    bonus > 0 ? `${spellLevels[index]}: +${bonus}` : null
                  ).filter(Boolean);
                  
                  return bonuses.length > 0 ? (
                    <div key={key} className="text-gray-400">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </span>
                      <span className="text-white">{bonuses.join(', ')}</span>
                    </div>
                  ) : null;
                }
                
                if (value === null || value === undefined) {
                  return (
                    <div key={key} className="text-gray-400">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </span>
                      <span className="text-white">–</span>
                    </div>
                  );
                }
                
                return (
                  <div key={key} className="text-gray-400">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </span>
                    <span className="text-white">
                      {typeof value === 'number' && value > 0 ? `+${value}` : value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Ability Scores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(abilityScores).map(([abilityName, ability]) =>
          renderAbilityScore(abilityName, ability)
        )}
      </div>
    </div>
  );
}