import React, { useState } from 'react';
import { ActionRoutine, ActionSlot, Character } from '../types/character';
import { ActionGroup, classActionRoutines, ACTION_GROUP_LABELS } from '../data/gameData';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface ActionRoutineDisplayProps {
  character: Character;
  actionRoutine: ActionRoutine;
  onUpdateActionRoutine: (routine: ActionRoutine) => void;
}

export const ActionRoutineDisplay: React.FC<ActionRoutineDisplayProps> = ({
  character,
  actionRoutine,
  onUpdateActionRoutine
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const getAvailableActions = (slotType: 'class' | 'universal' | 'enhanced'): string[] => {
    if (slotType === 'class') {
      // Get allowed actions for the primary class (first class)
      const primaryClass = character.classes[0];
      if (primaryClass && classActionRoutines[primaryClass.name]) {
        return classActionRoutines[primaryClass.name].allowedActions;
      }
      return ['PHYS', 'ITM', 'MV']; // Default fallback
    }
    
    if (slotType === 'universal' || slotType === 'enhanced') {
      // Universal and enhanced actions can use any action group
      return Object.keys(ACTION_GROUP_LABELS) as ActionGroup[];
    }
    
    return [];
  };

  const updateSlot = (index: number, updates: Partial<ActionSlot>) => {
    const newSlots = [...actionRoutine.slots];
    newSlots[index] = { ...newSlots[index], ...updates };
    onUpdateActionRoutine({ slots: newSlots });
  };

  const addEnhancedSlot = () => {
    const enhancedCount = actionRoutine.slots.filter(slot => slot.type === 'enhanced').length;
    const newSlot: ActionSlot = {
      type: 'enhanced',
      action: 'ITM',
      label: `EnhActRoutine #${enhancedCount + 1}`
    };
    onUpdateActionRoutine({ 
      slots: [...actionRoutine.slots, newSlot] 
    });
  };

  const removeSlot = (index: number) => {
    const newSlots = actionRoutine.slots.filter((_, i) => i !== index);
    // Renumber enhanced slots
    let enhancedCounter = 1;
    const renumberedSlots = newSlots.map(slot => {
      if (slot.type === 'enhanced') {
        return { ...slot, label: `EnhActRoutine #${enhancedCounter++}` };
      }
      return slot;
    });
    onUpdateActionRoutine({ slots: renumberedSlots });
  };

  const addCustomAction = (index: number) => {
    const customAction = prompt('Enter custom action:');
    if (customAction && customAction.trim()) {
      updateSlot(index, { action: customAction });
    } else if (customAction === '') {
      // Reset to default action for this slot type
      const availableActions = getAvailableActions(actionRoutine.slots[index].type);
      const defaultAction = availableActions[0] || 'ITM';
      updateSlot(index, { action: defaultAction });
    }
  };

  const renderActionDropdown = (slot: ActionSlot, index: number) => {
    const availableActions = getAvailableActions(slot.type);
    const isCustomAction = !availableActions.includes(slot.action as ActionGroup);
    
    // Create options list including custom action if present
    const dropdownOptions = [...availableActions];
    if (isCustomAction) {
      dropdownOptions.push(slot.action);
    }

    return (
      <div className="flex items-center gap-2">
        <select
          value={slot.action}
          onChange={(e) => {
            if (e.target.value === 'ADD_CUSTOM_ACTION') {
              addCustomAction(index);
            } else {
              updateSlot(index, { action: e.target.value });
            }
          }}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm border border-gray-500 flex-1"
        >
          {dropdownOptions.map(action => (
            <option key={action} value={action}>
              {ACTION_GROUP_LABELS[action as ActionGroup] || action}
            </option>
          ))}
          <option value="ADD_CUSTOM_ACTION">Custom Action...</option>
        </select>
        
        <button
          onMouseEnter={() => setShowTooltip(slot.action)}
          onMouseLeave={() => setShowTooltip(null)}
          className="text-gray-400 hover:text-gray-300"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        
        {showTooltip === slot.action && ACTION_GROUP_LABELS[slot.action as ActionGroup] && (
          <div className="absolute z-10 bg-gray-700 text-white text-xs rounded px-2 py-1 mt-8">
            {ACTION_GROUP_LABELS[slot.action as ActionGroup]}
          </div>
        )}
      </div>
    );
  };

  const getSlotLabel = (slot: ActionSlot) => {
    switch (slot.type) {
      case 'class': return 'Class Action';
      case 'universal': return 'Universal Action';
      case 'enhanced': return slot.label || 'Enhanced Action';
      default: return 'Action';
    }
  };

  return (
    <div className="space-y-3">
      {actionRoutine.slots.map((slot, index) => (
        <div key={index} className="flex items-center gap-3 bg-gray-700 rounded p-3">
          <div className="min-w-[120px]">
            <span className="text-sm font-medium text-gray-300">
              {getSlotLabel(slot)}:
            </span>
          </div>
          
          <div className="flex-1 relative">
            {renderActionDropdown(slot, index)}
          </div>
          
          {slot.type === 'enhanced' && (
            <button
              onClick={() => removeSlot(index)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={addEnhancedSlot}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 px-3 py-2 border-2 border-dashed border-gray-600 rounded w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Enhanced Action
      </button>
    </div>
  );
};