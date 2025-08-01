import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Calculator, Save, X } from 'lucide-react';
import { Power, Character } from '../types/character';
import { FORMULA_FIELDS, evaluateFormula, getFormulaVariables } from '../utils/formulaEvaluator';
import { AVAILABLE_FOCI } from '../data/gameData';

const FREQUENCY_OPTIONS = [
  'per sequence', 'per round', 'per turn',
  'per hour', 'per day', 'per week', 'per month'
];

const CATEGORY_OPTIONS = [
  { value: 'offensiv', label: 'Offensive' },
  { value: 'defensiv', label: 'Defensive' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
  { value: 'doomwarding', label: 'Doomwarding' },
  { value: 'class', label: 'Class' }
];

interface PowerEditorProps {
  character: Character;
  powers: Power[];
  onUpdatePowers: (powers: Power[]) => void;
}

export const PowerEditor: React.FC<PowerEditorProps> = ({ character, powers, onUpdatePowers }) => {
  const addNewPower = () => {
    const newPower: Power = {
      id: `power-${Date.now()}`,
      name: 'New Power',
      category: 'miscellaneous',
      karmaFocus: 'General',
      acquisitionLevel: 81,
      description: 'Describe your power here...',
      frequency: 'per day',
      maxUses: 1,
      activeCalculatedFields: [],
      calculatedFields: {},
      currentUses: { 
        sequence: 0, 
        round: 0, 
        turn: 0, 
        hour: 0, 
        day: 0, 
        week: 0, 
        month: 0 
      }
    };
    onUpdatePowers([...powers, newPower]);
  };

  const deletePower = (id: string) => {
    onUpdatePowers(powers.filter(power => power.id !== id));
  };

  const updatePower = (id: string, updates: Partial<Power>) => {
    onUpdatePowers(powers.map(power => 
      power.id === id ? { ...power, ...updates } : power
    ));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Power Editor</h2>
        <button
          onClick={addNewPower}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Power Hinzufügen
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {powers.map((power) => (
          <PowerTile 
            key={power.id} 
            character={character}
            power={power} 
            onUpdate={updatePower}
            onDelete={deletePower}
          />
        ))}
      </div>
    </div>
  );
};

interface PowerTileProps {
  character: Character;
  power: Power;
  onUpdate: (id: string, updates: Partial<Power>) => void;
  onDelete: (id: string) => void;
}

const PowerTile: React.FC<PowerTileProps> = ({ character, power, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Get available power types based on character's foci
  const getAvailablePowerTypes = () => {
    const availableTypes = ['General'];
    character.classes.forEach(cls => {
      if (cls.focus) {
        availableTypes.push(cls.focus);
      }
    });
    return availableTypes;
  };
  
  // Determine default power type for new powers
  const getDefaultPowerType = () => {
    if (character.classes.length === 1 && character.classes[0].focus) {
      return character.classes[0].focus;
    }
    return 'General';
  };
  
  const [editData, setEditData] = useState({
    name: power.name,
    category: power.category,
    karmaFocus: power.karmaFocus || getDefaultPowerType(),
    description: power.description || '',
    acquisitionLevel: power.acquisitionLevel || 81,
    empowerment: power.empowerment || 0,
    frequency: power.frequency || 'per day',
    maxUses: power.maxUses || 1,
    activeCalculatedFields: power.activeCalculatedFields || [],
    calculatedFields: power.calculatedFields || {}
  });

  const variables = getFormulaVariables(character);

  const handleSave = () => {
    onUpdate(power.id, {
      ...editData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: power.name,
      category: power.category,
      karmaFocus: power.karmaFocus || getDefaultPowerType(),
      description: power.description || '',
      acquisitionLevel: power.acquisitionLevel || 81,
      empowerment: power.empowerment || 0,
      frequency: power.frequency || 'per day',
      maxUses: power.maxUses || 1,
      activeCalculatedFields: power.activeCalculatedFields || [],
      calculatedFields: power.calculatedFields || {}
    });
    setIsEditing(false);
  };

  const toggleField = (fieldKey: string) => {
    const newActiveFields = editData.activeCalculatedFields.includes(fieldKey)
      ? editData.activeCalculatedFields.filter(f => f !== fieldKey)
      : [...editData.activeCalculatedFields, fieldKey];
    
    const newFormulas = { ...editData.calculatedFields };
    if (newActiveFields.includes(fieldKey) && !newFormulas[fieldKey]) {
      const field = FORMULA_FIELDS.find(f => f.key === fieldKey);
      const defaultFormula = field?.defaultFormulas?.[editData.karmaFocus] || '1';
      newFormulas[fieldKey] = defaultFormula;
    }

    setEditData({
      ...editData,
      activeCalculatedFields: newActiveFields,
      calculatedFields: newFormulas
    });
  };

  const handleKarmaFocusChange = (newKarmaFocus: string) => {
    const newFormulas = { ...editData.calculatedFields };
    
    // Update formulas for active fields based on new karma focus
    editData.activeCalculatedFields.forEach(fieldKey => {
      const field = FORMULA_FIELDS.find(f => f.key === fieldKey);
      if (field?.defaultFormulas?.[newKarmaFocus]) {
        newFormulas[fieldKey] = field.defaultFormulas[newKarmaFocus];
      }
    });

    setEditData({
      ...editData,
      karmaFocus: newKarmaFocus,
      calculatedFields: newFormulas,
    });
  };

  const updateFormula = (fieldKey: string, formula: string) => {
    setEditData({
      ...editData,
      calculatedFields: {
        ...editData.calculatedFields,
        [fieldKey]: formula
      }
    });
  };

  const hasUsesFormula = editData.activeCalculatedFields.includes('uses');

  if (isEditing) {
    return (
      <div className="border-2 border-blue-500 rounded-xl shadow-lg p-4 bg-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-blue-400">Power bearbeiten</h3>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              <Save size={14} />
              Speichern
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              <X size={14} />
              Abbrechen
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {power.empowerment !== undefined && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Power Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                  placeholder="Power Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Empowerment:</label>
                <input
                  type="number"
                  value={editData.empowerment}
                  onChange={(e) => setEditData({...editData, empowerment: parseInt(e.target.value) || 0})}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Kategorie:</label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({...editData, category: e.target.value as any})}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                >
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Karma Focus:</label>
                <select
                  value={editData.karmaFocus}
                  onChange={(e) => handleKarmaFocusChange(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                >
                  {getAvailablePowerTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Erhalten bei Level:</label>
            <input
              type="number"
              value={editData.acquisitionLevel}
              onChange={(e) => setEditData({...editData, acquisitionLevel: parseInt(e.target.value) || 81})}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Beschreibung:</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white h-20"
              placeholder="Power Beschreibung..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Frequenz:</label>
              <select
                value={editData.frequency}
                onChange={(e) => setEditData({ ...editData, frequency: e.target.value as any })}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
              >
                {FREQUENCY_OPTIONS.map((freq) => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Max Uses:</label>
              <input
                type="number"
                value={editData.maxUses}
                onChange={(e) => setEditData({...editData, maxUses: parseInt(e.target.value) || 1})}
                disabled={hasUsesFormula}
                className={`w-full p-2 border border-gray-500 rounded text-white ${
                  hasUsesFormula ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-600'
                }`}
                min="1"
              />
              {hasUsesFormula && (
                <p className="text-xs text-yellow-400 mt-1">
                  Wird durch Uses-Formel berechnet
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Aktive Felder:</label>
            <div className="flex flex-wrap gap-3">
              {FORMULA_FIELDS.map(field => (
                <label key={field.key} className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={editData.activeCalculatedFields.includes(field.key)}
                    onChange={() => toggleField(field.key)}
                    className="rounded"
                  />
                  <span className="text-sm">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {editData.activeCalculatedFields.map(fieldKey => {
            const field = FORMULA_FIELDS.find(f => f.key === fieldKey);
            const placeholder = field?.defaultFormulas?.[editData.powerType] || '1';
            return (
              <div key={fieldKey}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field?.label} Formel:
                </label>
                <input
                  type="text"
                  value={editData.calculatedFields[fieldKey] || ''}
                  onChange={(e) => updateFormula(fieldKey, e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white font-mono text-sm"
                  placeholder={field?.defaultFormulas?.[editData.karmaFocus] || placeholder}
                />
                <div className="text-xs text-gray-400 mt-1">
                  Verfügbare Variablen: Level, GesamtLevel, RogueLevel, FighterLevel, GesamtMAV, RogueMAV, FighterMAV, Empowerment
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-xl shadow-lg p-4 border border-gray-600">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-white">{power.name}</h3>
          <p className="text-sm text-blue-400">{power.karmaFocus} Power</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-300 p-1"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(power.id)}
            className="text-red-400 hover:text-red-300 p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {power.description && (
        <p className="text-sm text-gray-300 mb-4 italic">{power.description}</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {(power.activeCalculatedFields || []).map(fieldKey => {
          const field = FORMULA_FIELDS.find(f => f.key === fieldKey);
          const formula = power.calculatedFields?.[fieldKey] || field?.defaultFormulas?.[power.karmaFocus || 'General'] || '1';
          const result = evaluateFormula(formula, getFormulaVariables(character, power));
          
          return (
            <div key={fieldKey} className="bg-gray-600 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-green-400" />
                <span className="font-semibold text-sm text-gray-300">{field?.label}:</span>
              </div>
              <div className="text-2xl font-bold text-white">{result}</div>
              <div className="text-xs text-gray-400 font-mono mt-1">{formula}</div>
            </div>
          );
        })}
      </div>

      {power.empowerment && power.empowerment > 0 && (
        <div className="mt-3 text-sm text-blue-400">
          <p><strong>Empowerment:</strong> +{power.empowerment}</p>
        </div>
      )}

      {power.frequency && (
        <div className="mt-3 text-sm text-gray-400">
          <p><strong>Frequenz:</strong> {power.frequency}</p>
          <p><strong>Max Uses:</strong> {power.maxUses || 1}</p>
        </div>
      )}

      {power.acquisitionLevel && (
        <div className="text-xs text-gray-500 mt-3">
          Erhalten bei Level {power.acquisitionLevel}
        </div>
      )}
    </div>
  );
};