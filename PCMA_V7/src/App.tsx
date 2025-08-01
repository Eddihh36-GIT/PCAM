import React, { useState, useEffect } from 'react';
import { Character, Power, AbilityScoreDetail, ActionRoutine } from './types/character';
import { initialCharacter } from './data/characterData';
import { CharacterDashboard } from './components/CharacterDashboard';
import { AbilityScoreTracker } from './components/AbilityScoreTracker';
import { PowerEditor } from './components/PowerEditor';
import { LevelProgression } from './components/LevelProgression';
import { ResetControls } from './components/ResetControls';
import { PowerManagement } from './components/PowerManagement';
import { DataManagement } from './components/DataManagement';
import { ThievingSkillsManager } from './components/ThievingSkillsManager';
import { PowerListDisplay } from './components/PowerListDisplay';
import { DiceRoller } from './components/DiceRoller';
import { getThievingClasses } from './data/thievingSkillsData';
import { evaluateFormula, getFormulaVariables } from './utils/formulaEvaluator';
import { Settings, Zap, User, Wrench } from 'lucide-react';

const STORAGE_KEY = 'aduan-character-data';

function App() {
  const [activeTab, setActiveTab] = useState<'management' | 'tools' | 'thieving'>('management');
  const [character, setCharacter] = useState<Character>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure abilityScores exist for backward compatibility
        if (!parsed.abilityScores) {
          parsed.abilityScores = initialCharacter.abilityScores;
        }
        // Ensure thievingSkills exist for backward compatibility
        if (!parsed.thievingSkills) {
          parsed.thievingSkills = [];
        }
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to load character from localStorage:', error);
    }
    return initialCharacter;
  });
  
  const [actionRoutine, setActionRoutine] = useState<ActionRoutine>(() => {
    // Initialize with default Class Action and Universal Action
    return {
      slots: [
        { type: 'class', action: 'PHYS' },
        { type: 'universal', action: 'ITM' }
      ]
    };
  });
  
  const [activeView, setActiveView] = useState<'management' | 'editor' | 'powerlist'>('management');

  // Auto-save to localStorage whenever character changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    } catch (error) {
      console.warn('Failed to save character to localStorage:', error);
    }
  }, [character]);

  // Calculate total level and MAV based on new rules
  const calculateTotals = (classes: any[]) => {
    if (classes.length === 0) return { totalLevel: 0, totalMAV: 0 };
    
    const sortedClasses = [...classes].sort((a, b) => b.level - a.level);
    const highestLevel = sortedClasses[0].level;
    
    let totalLevel = highestLevel;
    let totalMAV = 0;
    
    classes.forEach(cls => {
      const mavContribution = Math.max(0, cls.level - 80);
      totalMAV += mavContribution;
      
      if (cls.level !== highestLevel) {
        totalLevel += Math.max(0, cls.level - 80);
      }
    });
    
    return { totalLevel, totalMAV };
  };
  const handleUpdatePowers = (newPowers: Power[]) => {
    setCharacter(prev => ({
      ...prev,
      powers: newPowers
    }));
  };

  const handleUpdatePower = (powerId: string, updates: Partial<Power>) => {
    setCharacter(prev => ({
      ...prev,
      powers: prev.powers.map(power => 
        power.id === powerId ? { ...power, ...updates } : power
      )
    }));
  };

  const handleUpdateLevel = (className: string, amount: number) => {
    setCharacter(prev => {
      const newClasses = prev.classes.map(cls => {
        if (cls.name === className) {
          const newLevel = Math.max(1, cls.level + amount);
          const newMAV = Math.max(0, newLevel - 80);
          return { ...cls, level: newLevel, mav: newMAV };
        }
        return cls;
      });

      const { totalLevel: newTotalLevel, totalMAV: newTotalMAV } = calculateTotals(newClasses);

      // Update power progressions based on new levels
      const updatedPowers = prev.powers.map(power => {
        if (power.progression) {
          const relevantClass = newClasses.find(cls => 
            (power.name.includes('Deadly') && cls.name === 'Fighter') ||
            (power.name.includes('Treasure') && cls.name === 'Rogue') ||
            (power.name.includes('Quicken') && cls.name === 'Rogue')
          );
          
          if (relevantClass && relevantClass.level >= power.progression.nextLevel) {
            // Power progression achieved - could trigger effects here
            return {
              ...power,
              progression: {
                ...power.progression,
                baseLevel: power.progression.nextLevel,
                nextLevel: power.progression.nextLevel + 5 // Example next progression
              }
            };
          }
        }
        return power;
      });

      return {
        ...prev,
        classes: newClasses,
        totalLevel: newTotalLevel,
        totalMAV: newTotalMAV,
        powers: updatedPowers
      };
    });
  };

  const handleUpdateCharacterName = (newName: string) => {
    setCharacter(prev => ({ ...prev, name: newName }));
  };

  const handleApplyDamage = (amount: number) => {
    setCharacter(prev => ({
      ...prev,
      currentHealth: Math.max(0, prev.currentHealth - amount)
    }));
  };

  const handleApplyHealing = (amount: number) => {
    setCharacter(prev => {
      const maxHealth = prev.health + prev.vigor;
      return {
        ...prev,
        currentHealth: Math.min(maxHealth, prev.currentHealth + amount)
      };
    });
  };

  const handleUpdateBaseHealth = (newHealth: number) => {
    setCharacter(prev => {
      const maxHealth = newHealth + prev.vigor;
      return {
        ...prev,
        health: newHealth,
        currentHealth: Math.min(maxHealth, prev.currentHealth)
      };
    });
  };

  const handleUpdateVigor = (newVigor: number) => {
    setCharacter(prev => {
      const maxHealth = prev.health + newVigor;
      return {
        ...prev,
        vigor: newVigor,
        currentHealth: Math.min(maxHealth, prev.currentHealth)
      };
    });
  };

  const handleAddClass = () => {
    setCharacter(prev => {
      const newClasses = [...prev.classes, { name: 'Warrior', level: 81, mav: 1, focus: undefined }];
      const { totalLevel: newTotalLevel, totalMAV: newTotalMAV } = calculateTotals(newClasses);
      
      return {
        ...prev,
        classes: newClasses,
        totalLevel: newTotalLevel,
        totalMAV: newTotalMAV
      };
    });
  };

  const handleRemoveClass = (className: string) => {
    setCharacter(prev => {
      const newClasses = prev.classes.filter(cls => cls.name !== className);
      const { totalLevel: newTotalLevel, totalMAV: newTotalMAV } = calculateTotals(newClasses);
      
      return {
        ...prev,
        classes: newClasses,
        totalLevel: newTotalLevel,
        totalMAV: newTotalMAV
      };
    });
  };

  const handleUpdateClassName = (oldName: string, newName: string) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map(cls => 
        cls.name === oldName ? { ...cls, name: newName } : cls
      )
    }));
  };

  const handleUpdateFoci = (newFoci: string[]) => {
    setCharacter(prev => ({ ...prev, foci: newFoci }));
  };
  const handleReset = (type: 'turn' | 'round' | 'sequence' | 'hour' | 'day' | 'week' | 'month') => {
    setCharacter(prev => ({
      ...prev,
      powers: prev.powers.map(power => {
        // Calculate effective max uses for this power
        let effectiveMaxUses = power.maxUses || 1;
        if (power.activeCalculatedFields?.includes('uses') && power.calculatedFields?.uses) {
          const variables = getFormulaVariables(prev, power);
          effectiveMaxUses = evaluateFormula(power.calculatedFields.uses, variables);
        }
        
        const resetUses = { ...power.currentUses };
        
        // Hierarchical reset logic
        switch (type) {
          case 'month':
            resetUses.month = 0;
            resetUses.week = 0;
            resetUses.day = 0;
            resetUses.hour = 0;
            resetUses.sequence = 0; // Turn in game terms
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'week':
            resetUses.week = 0;
            resetUses.day = 0;
            resetUses.hour = 0;
            resetUses.sequence = 0; // Turn in game terms
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'day':
            resetUses.day = 0;
            resetUses.hour = 0;
            resetUses.sequence = 0; // Turn in game terms
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'hour':
            resetUses.hour = 0;
            resetUses.sequence = 0; // Turn in game terms
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'turn': // Turn in game terms (maps to sequence internally)
            resetUses.sequence = 0; // Turn in game terms
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'round':
            resetUses.round = 0;
            resetUses.turn = 0; // Sequence in game terms
            break;
          case 'sequence': // Sequence in game terms (maps to turn internally)
            resetUses.turn = 0; // Sequence in game terms
            break;
        }
        
        return { ...power, currentUses: resetUses };
      })
    }));
  };

  const handleImportCharacter = (importedCharacter: Character) => {
    // Ensure currentHealth is set if not present
    const characterWithHealth = {
      ...importedCharacter,
      currentHealth: importedCharacter.currentHealth || (importedCharacter.health + importedCharacter.vigor),
      // Ensure abilityScores exist for backward compatibility
      abilityScores: importedCharacter.abilityScores || initialCharacter.abilityScores
    };
    setCharacter(characterWithHealth);
  };

  const handleUpdateAbilityScores = (ability: string, field: keyof AbilityScoreDetail, value: number) => {
    setCharacter(prev => ({
      ...prev,
      abilityScores: {
        ...prev.abilityScores,
        [ability]: {
          ...prev.abilityScores[ability as keyof typeof prev.abilityScores],
          [field]: value
        }
      }
    }));
  };

  const handleUpdateClassFocus = (className: string, focus: string) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map(cls => 
        cls.name === className ? { ...cls, focus: focus || undefined } : cls
      )
    }));
  };

  const handleUpdateThievingSkills = (newSkills: string[]) => {
    setCharacter(prev => ({
      ...prev,
      thievingSkills: newSkills
    }));
  };
  const handleUpdateActionRoutine = (routine: ActionRoutine) => {
    setActionRoutine(routine);
  };

  // Check if character has thieving classes for conditional rendering
  const hasThievingClass = () => {
    const thievingClasses = getThievingClasses();
    return character.classes.some(cls => thievingClasses.includes(cls.name));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Aduan Charakterverwaltungs-Assistent
          </h1>
          <p className="text-gray-400">
            Pen-&-Paper Charakterverwaltung • Prototyp/MVP
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('management')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'management' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <User className="w-5 h-5" />
              Charakter Management
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'tools' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Wrench className="w-5 h-5" />
              Tools & Powers
            </button>
            {hasThievingClass() && (
              <button
                onClick={() => setActiveTab('thieving')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'thieving' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Zap className="w-5 h-5" />
                Thieving Skills
              </button>
            )}
          </div>
        </div>

        {/* Management Tab Content */}
        {activeTab === 'management' && (
          <>
            <CharacterDashboard 
              character={character} 
              actionRoutine={actionRoutine}
              onUpdateCharacterName={handleUpdateCharacterName}
              onUpdateActionRoutine={handleUpdateActionRoutine}
              onApplyDamage={handleApplyDamage}
              onApplyHealing={handleApplyHealing}
              onUpdateBaseHealth={handleUpdateBaseHealth}
              onUpdateVigor={handleUpdateVigor}
            />
            
            <AbilityScoreTracker 
              abilityScores={character.abilityScores}
              onUpdateAbilityScores={handleUpdateAbilityScores}
            />
            
            <LevelProgression 
              character={character} 
              onUpdateLevel={handleUpdateLevel}
              onAddClass={handleAddClass}
              onRemoveClass={handleRemoveClass}
              onUpdateClassName={handleUpdateClassName}
              onUpdateClassFocus={handleUpdateClassFocus}
            />
            
            <DataManagement character={character} onImportCharacter={handleImportCharacter} />
          </>
        )}
        
        {/* Tools Tab Content */}
        {activeTab === 'tools' && (
          <>
            <DiceRoller />
            
            {/* Navigation for Power sections */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveView('management')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === 'management' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Power Management
                </button>
                <button
                  onClick={() => setActiveView('powerlist')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === 'powerlist' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Powerlist
                </button>
                <button
                  onClick={() => setActiveView('editor')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === 'editor' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Power Editor
                </button>
              </div>
            </div>

            {activeView === 'management' && (
              <PowerManagement character={character} powers={character.powers} onUpdatePower={handleUpdatePower} />
            )}
            
            {activeView === 'powerlist' && (
              <PowerListDisplay character={character} powers={character.powers} onUpdatePower={handleUpdatePower} />
            )}
            
            {activeView === 'editor' && (
              <PowerEditor character={character} powers={character.powers} onUpdatePowers={handleUpdatePowers} />
            )}
            
            <ResetControls onReset={handleReset} />
          </>
        )}
        
        {/* Thieving Skills Tab Content */}
        {activeTab === 'thieving' && hasThievingClass() && (
          <ThievingSkillsManager 
            character={character} 
            skills={character.thievingSkills}
            onUpdateSkills={handleUpdateThievingSkills}
          />
        )}
      </div>
    </div>
  );
}

export default App;