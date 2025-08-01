import React, { useState } from 'react';
import { Character } from '../types/character';
import { SkillCard } from './SkillCard';
import { Button } from './ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/Select';
import { thievingSkills, getThievingClasses, isHeroicSkill } from '../data/thievingSkillsData';
import { Zap } from 'lucide-react';

interface ThievingSkillsManagerProps {
  character: Character;
  skills: string[];
  onUpdateSkills: (skills: string[]) => void;
}

export const ThievingSkillsManager: React.FC<ThievingSkillsManagerProps> = ({ 
  character, 
  skills, 
  onUpdateSkills 
}) => {
  const [selectedSkill, setSelectedSkill] = useState('');

  // Check if character has thieving classes and their levels
  const thievingClasses = getThievingClasses();
  const characterThievingClasses = character.classes.filter(cls => 
    thievingClasses.includes(cls.name)
  );
  
  const hasThievingClass = characterThievingClasses.length > 0;
  const maxThievingLevel = hasThievingClass 
    ? Math.max(...characterThievingClasses.map(cls => cls.level))
    : 0;

  // Filter skills based on heroic availability
  const availableSkills = thievingSkills.filter(skill => {
    if (skills.includes(skill)) return false; // Already added
    
    const isHeroic = isHeroicSkill(skill);
    if (isHeroic && (!hasThievingClass || maxThievingLevel < 60)) {
      return false; // Heroic skill not available
    }
    
    return true;
  });

  const addSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      onUpdateSkills([...skills, selectedSkill]);
      setSelectedSkill('');
    }
  };

  const addAllSkills = () => {
    const allAvailableSkills = [...new Set([...skills, ...availableSkills])];
    onUpdateSkills(allAvailableSkills);
  };
  const removeSkill = (skillToRemove: string) => {
    onUpdateSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Zap className="w-6 h-6 text-purple-400 mr-2" />
        <h1 className="text-2xl font-bold text-white">Thieving Skills Verwaltung</h1>
      </div>

      <div className="flex gap-4 items-center mb-6">
        <div className="flex-1">
          <Select onValueChange={setSelectedSkill} value={selectedSkill}>
            <SelectTrigger>
              <SelectValue placeholder="Skill wählen" />
            </SelectTrigger>
            <SelectContent>
              {availableSkills.map(skill => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addSkill} disabled={!selectedSkill}>
          Skill hinzufügen
        </Button>
        <Button 
          onClick={addAllSkills} 
          variant="secondary"
          disabled={availableSkills.length === 0}
        >
          Alle hinzufügen
        </Button>
      </div>

      <div className="space-y-4">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Keine Thieving Skills ausgewählt.</p>
            <p className="text-sm mt-2">Wähle einen Skill aus der Liste oben aus, um zu beginnen.</p>
          </div>
        ) : (
          skills.map(skill => (
            <SkillCard 
              key={skill} 
              skill={skill} 
              character={character}
              onRemove={() => removeSkill(skill)} 
            />
          ))
        )}
      </div>
    </div>
  );
};