import React from 'react';
import { Power, Character } from '../types/character';
import { 
  Clock, 
  Calendar,
  RotateCcw,
  TrendingUp,
  Calculator,
  Timer,
  CalendarDays
} from 'lucide-react';
import { OffensiveIcon } from './icons/OffensiveIcon';
import { DefensiveIcon } from './icons/DefensiveIcon';
import { MiscellaneousIcon } from './icons/MiscellaneousIcon';
import { DoomwardingIcon } from './icons/DoomwardingIcon';
import { ClassIcon } from './icons/ClassIcon';
import { evaluateFormula, getFormulaVariables, FORMULA_FIELDS } from '../utils/formulaEvaluator';

interface PowerCardProps {
  character: Character;
  power: Power;
  onUsesPower: (powerId: string, type: 'sequence' | 'round' | 'turn' | 'hour' | 'day' | 'week' | 'month', amount: number) => void;
  onUpdateCount: (powerId: string, count: number) => void;
  condensedView?: boolean;
}

// Define the hex color values for each power category
const CATEGORY_HEX_COLORS = {
  'offensiv': '#f87171',
  'defensiv': '#61a4fa', 
  'miscellaneous': '#fb923c',
  'doomwarding': '#186534',
  'class': '#9600ff'
};

export const PowerCard: React.FC<PowerCardProps> = ({ character, power, onUsesPower, onUpdateCount, condensedView = false }) => {
  const getCategoryIcon = (category: string) => {
    const fillColor = CATEGORY_HEX_COLORS[category as keyof typeof CATEGORY_HEX_COLORS] || '#fb923c';
    switch (category) {
      case 'offensiv': return <OffensiveIcon className="w-5 h-5" fillColor={fillColor} />;
      case 'miscellaneous': return <MiscellaneousIcon className="w-5 h-5" fillColor={fillColor} />;
      case 'defensiv': return <DefensiveIcon className="w-5 h-5" fillColor={fillColor} />;
      case 'doomwarding': return <DoomwardingIcon className="w-5 h-5" fillColor={fillColor} />;
      case 'class': return <ClassIcon className="w-5 h-5" fillColor={fillColor} />;
      default: return <MiscellaneousIcon className="w-5 h-5" fillColor={fillColor} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'offensiv': return 'border-red-400';
      case 'miscellaneous': return 'border-orange-400';
      case 'defensiv': return 'border-blue-400';
      case 'doomwarding': return 'border-green-800';
      case 'class': return 'border-purple-600';
      default: return 'border-gray-400';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'per turn': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'per round': return <RotateCcw className="w-4 h-4 text-orange-400" />;
      case 'per sequence': return <RotateCcw className="w-4 h-4 text-green-400" />;
      case 'per hour': return <Timer className="w-4 h-4 text-cyan-400" />;
      case 'per day': return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'per week': return <CalendarDays className="w-4 h-4 text-purple-400" />;
      case 'per month': return <CalendarDays className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'per sequence': return 'Sequenz';
      case 'per round': return 'Runde';
      case 'per turn': return 'Turn';
      case 'per hour': return 'Stunde';
      case 'per day': return 'Tag';
      case 'per week': return 'Woche';
      case 'per month': return 'Monat';
      default: return 'Unbekannt';
    }
  };

  const getFrequencyKey = (frequency: string): keyof Power['currentUses'] => {
    switch (frequency) {
      case 'per sequence': return 'turn'; // Internal key mapping
      case 'per round': return 'round';
      case 'per turn': return 'sequence'; // Internal key mapping
      case 'per hour': return 'hour';
      case 'per day': return 'day';
      case 'per week': return 'week';
      case 'per month': return 'month';
      default: return 'day';
    }
  };

  // Get calculated values if power uses formulas
  const getCalculatedValues = () => {
    if (!power.calculatedFields || !power.activeCalculatedFields) {
      return {};
    }

    const variables = getFormulaVariables(character, power);
    const calculatedValues: { [key: string]: number } = {};

    power.activeCalculatedFields.forEach(fieldKey => {
      const formula = power.calculatedFields![fieldKey];
      if (formula) {
        calculatedValues[fieldKey] = evaluateFormula(formula, variables);
      }
    });

    return calculatedValues;
  };

  const calculatedValues = getCalculatedValues();

  // Get the effective max uses (either from formula or fixed value)
  const getEffectiveMaxUses = () => {
    if (power.activeCalculatedFields?.includes('uses')) {
      return calculatedValues.uses || 1;
    }
    return power.maxUses || 1;
  };

  const renderUsageSection = () => {
    if (!power.frequency) return null;

    const frequencyKey = getFrequencyKey(power.frequency);
    const maxUses = getEffectiveMaxUses();
    const currentUses = power.currentUses[frequencyKey];
    const remainingUses = maxUses - currentUses;
    const icon = getFrequencyIcon(power.frequency);
    const label = getFrequencyLabel(power.frequency);

    return (
      <div className="flex items-center justify-between bg-gray-700 rounded p-2">
        <div className="flex items-center">
          {icon}
          <span className="text-sm text-gray-300 ml-2">{label}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white min-w-[40px] text-center">
            {remainingUses}/{maxUses}
          </span>
          <button
            onClick={() => onUsesPower(power.id, frequencyKey, 1)}
            disabled={currentUses >= maxUses}
            className="w-6 h-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-white text-sm font-bold"
          >
            +
          </button>
          <button
            onClick={() => onUsesPower(power.id, frequencyKey, -1)}
            disabled={currentUses <= 0}
            className="w-6 h-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded text-white text-sm font-bold"
          >
            -
          </button>
        </div>
      </div>
    );
  };

  const renderCalculatedField = (fieldKey: string, value: number) => {
    const field = FORMULA_FIELDS.find(f => f.key === fieldKey);
    if (!field) return null;

    const formula = power.calculatedFields![fieldKey];

    return (
      <div key={fieldKey} className="bg-gray-700 rounded p-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Calculator className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-gray-300">{field.label}</span>
          </div>
          <span className="text-white font-bold text-lg">{value}</span>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {formula}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-l-4 ${getCategoryColor(power.category)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {getCategoryIcon(power.category)}
          <h3 className="text-lg font-semibold text-white ml-2">{power.name}</h3>
          {power.karmaFocus && (
            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded ml-2">
              {power.karmaFocus}
            </span>
          )}
        </div>
        {power.hasInitiativePhase && (
          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
            Initiative Phase
          </span>
        )}
      </div>

      {!condensedView && power.description && (
        <p className="text-sm text-gray-400 mb-3 italic">
          {power.description}
        </p>
      )}

      <div className="space-y-2">
        {/* Show calculated fields if available */}
        {power.activeCalculatedFields && power.activeCalculatedFields.length > 0 && (
          <div className="space-y-2">
            {power.activeCalculatedFields.map(fieldKey => 
              renderCalculatedField(fieldKey, calculatedValues[fieldKey] || 0)
            )}
          </div>
        )}

        {/* Show usage section for powers with frequency */}
        {renderUsageSection()}

        {power.duration && (
          <div className="text-xs text-gray-400">
            Dauer: {power.duration}
          </div>
        )}

        {power.progression && (
          <div className="bg-gray-700 rounded p-2 mt-2">
            <div className="flex items-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-xs font-semibold text-gray-300">Progression</span>
            </div>
            <div className="text-xs text-gray-400">
              Nächste Stufe: Level {power.progression.nextLevel}
            </div>
            <div className="text-xs text-green-400">
              {power.progression.effect}
            </div>
          </div>
        )}

        {power.empowerment !== undefined && (
          <div className="text-xs text-blue-400 mt-2">
            Empowerment: +{power.empowerment}
          </div>
        )}

        {!condensedView && power.acquisitionLevel && (
          <div className="text-xs text-gray-500 mt-2">
            Erhalten bei Level {power.acquisitionLevel}
          </div>
        )}
      </div>
    </div>
  );
};