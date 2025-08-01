import React from 'react';
import { Power, Character } from '../types/character';
import { PowerCard } from './PowerCard';
import { evaluateFormula, getFormulaVariables } from '../utils/formulaEvaluator';

interface PowerListDisplayProps {
  character: Character;
  powers: Power[];
  onUpdatePower: (powerId: string, updates: Partial<Power>) => void;
}

export const PowerListDisplay: React.FC<PowerListDisplayProps> = ({ character, powers, onUpdatePower }) => {
  const handleUsesPower = (powerId: string, type: 'sequence' | 'round' | 'turn' | 'hour' | 'day' | 'week' | 'month', amount: number) => {
    const power = powers.find(p => p.id === powerId);
    if (!power) return;

    // Get the effective max uses (either from formula or fixed value)
    let maxUses = power.maxUses || 1;
    if (power.activeCalculatedFields?.includes('uses')) {
      const variables = getFormulaVariables(character, power);
      const formula = power.calculatedFields?.uses || '1';
      maxUses = evaluateFormula(formula, variables);
    }
    
    const newUses = Math.max(0, power.currentUses[type] + amount);
    
    if (newUses <= maxUses) {
      onUpdatePower(powerId, {
        currentUses: {
          ...power.currentUses,
          [type]: newUses
        }
      });
    }
  };
  
  const handleUpdateCount = (powerId: string, count: number) => {
    onUpdatePower(powerId, { currentCount: count });
  };

  // Sort all powers by acquisition level and then by name
  const sortedPowers = [...powers].sort((a, b) => {
    const levelA = a.acquisitionLevel || 0;
    const levelB = b.acquisitionLevel || 0;
    if (levelA !== levelB) {
      return levelA - levelB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Powerlist</h2>
      
      {sortedPowers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Keine Powers vorhanden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedPowers.map(power => (
            <PowerCard
              key={power.id}
              character={character}
              power={power}
              onUsesPower={handleUsesPower}
              onUpdateCount={handleUpdateCount}
              condensedView={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};