import React from 'react';
import { Power, Character } from '../types/character';
import { PowerCard } from './PowerCard';
import { evaluateFormula, getFormulaVariables } from '../utils/formulaEvaluator';

interface PowerManagementProps {
  character: Character;
  powers: Power[];
  onUpdatePower: (powerId: string, updates: Partial<Power>) => void;
}

export const PowerManagement: React.FC<PowerManagementProps> = ({ character, powers, onUpdatePower }) => {
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

  const categories = {
    offensiv: powers.filter(p => p.category === 'offensiv').sort((a, b) => {
      const levelA = a.acquisitionLevel || 0;
      const levelB = b.acquisitionLevel || 0;
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.name.localeCompare(b.name);
    }),
    defensiv: powers.filter(p => p.category === 'defensiv').sort((a, b) => {
      const levelA = a.acquisitionLevel || 0;
      const levelB = b.acquisitionLevel || 0;
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.name.localeCompare(b.name);
    }),
    miscellaneous: powers.filter(p => p.category === 'miscellaneous').sort((a, b) => {
      const levelA = a.acquisitionLevel || 0;
      const levelB = b.acquisitionLevel || 0;
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.name.localeCompare(b.name);
    }),
    doomwarding: powers.filter(p => p.category === 'doomwarding').sort((a, b) => {
      const levelA = a.acquisitionLevel || 0;
      const levelB = b.acquisitionLevel || 0;
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.name.localeCompare(b.name);
    }),
    class: powers.filter(p => p.category === 'class').sort((a, b) => {
      const levelA = a.acquisitionLevel || 0;
      const levelB = b.acquisitionLevel || 0;
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.name.localeCompare(b.name);
    })
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Power Management</h2>
      
      {Object.entries(categories).map(([category, categoryPowers]) => {
        if (categoryPowers.length === 0) return null;
        
        return (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-300 mb-3 capitalize">
              {category === 'offensiv' ? 'Offensive Powers' : 
               category === 'defensiv' ? 'Defensive Powers' :
               category === 'miscellaneous' ? 'Miscellaneous Powers' :
               category === 'doomwarding' ? 'Doomwarding Powers' :
               'Class Powers'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryPowers.map(power => (
                <PowerCard
                  key={power.id}
                  character={character}
                  power={power}
                  onUsesPower={handleUsesPower}
                  onUpdateCount={handleUpdateCount}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};