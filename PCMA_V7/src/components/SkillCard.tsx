import React, { useState } from 'react';
import { Character } from '../types/character';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/Select';
import { exceptionalPowers, maskedMysteryPowers, isHeroicSkill, getThievingClasses } from '../data/thievingSkillsData';

interface SkillCardProps {
  skill: string;
  character: Character;
  onRemove: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, character, onRemove }) => {
  const [baseScore, setBaseScore] = useState(0);
  const [skillBonus, setSkillBonus] = useState(0);
  const [checkBonus, setCheckBonus] = useState(0);
  const [exceptional, setExceptional] = useState(false);
  const [maskedMystery, setMaskedMystery] = useState(false);
  const [godskill, setGodskill] = useState('');
  const [sourceInfo, setSourceInfo] = useState({ base: '', skill: '', check: '' });

  const base = baseScore + skillBonus;
  const effective = base + checkBonus;

  // Check if character has thieving classes and their levels
  const thievingClasses = getThievingClasses();
  const characterThievingClasses = character.classes.filter(cls => 
    thievingClasses.includes(cls.name)
  );
  
  const hasThievingClass = characterThievingClasses.length > 0;
  const maxThievingLevel = hasThievingClass 
    ? Math.max(...characterThievingClasses.map(cls => cls.level))
    : 0;

  // Check if heroic skills should be available (level 60+)
  const isHeroic = isHeroicSkill(skill);
  const heroicAvailable = !isHeroic || (hasThievingClass && maxThievingLevel >= 60);

  const unlockedExceptional = exceptional ? (exceptionalPowers[skill] || []) : [];
  const unlockedMM = maskedMystery ? (maskedMysteryPowers[skill] || ['Keine speziellen Kräfte']) : [];

  return (
    <Card className="my-4">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">{skill}</h2>
            {isHeroic && (
              <span className="text-sm text-yellow-400">
                {heroicAvailable 
                  ? `Heroic Skill verfügbar (Level ${maxThievingLevel})` 
                  : `Heroic Skill - benötigt Level 60+ (aktuell: ${maxThievingLevel})`
                }
              </span>
            )}
          </div>
          <Button variant="destructive" onClick={onRemove}>
            Entfernen
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Base Score</label>
            <Input 
              type="number" 
              value={baseScore} 
              onChange={(e) => setBaseScore(Number(e.target.value))} 
            />
            <Input 
              placeholder="Source Info" 
              value={sourceInfo.base} 
              onChange={(e) => setSourceInfo({ ...sourceInfo, base: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Skill Bonus</label>
            <Input 
              type="number" 
              value={skillBonus} 
              onChange={(e) => setSkillBonus(Number(e.target.value))} 
            />
            <Input 
              placeholder="Source Info" 
              value={sourceInfo.skill} 
              onChange={(e) => setSourceInfo({ ...sourceInfo, skill: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Check Bonus</label>
            <Input 
              type="number" 
              value={checkBonus} 
              onChange={(e) => setCheckBonus(Number(e.target.value))} 
            />
            <Input 
              placeholder="Source Info" 
              value={sourceInfo.check} 
              onChange={(e) => setSourceInfo({ ...sourceInfo, check: e.target.value })}
              className="mt-2"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={exceptional} 
                onCheckedChange={setExceptional}
                disabled={!heroicAvailable}
              />
              <label className={`text-sm ${heroicAvailable ? 'text-gray-300' : 'text-gray-500'}`}>
                Exceptional
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={maskedMystery} 
                onCheckedChange={setMaskedMystery}
                disabled={!heroicAvailable}
              />
              <label className={`text-sm ${heroicAvailable ? 'text-gray-300' : 'text-gray-500'}`}>
                Masked Mystery
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Godskill</label>
              <Select onValueChange={setGodskill} value={godskill}>
                <SelectTrigger>
                  <SelectValue placeholder="Godskill-Level" />
                </SelectTrigger>
                <SelectContent>
                  {[81, 91, 101, 111, 121].map(lvl => (
                    <SelectItem key={lvl} value={String(lvl)}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <h3 className="font-semibold text-gray-300 mb-2">Berechnete Werte</h3>
          <p className="text-white">
            <span className="text-blue-400">Base = {base}</span> | 
            <span className="text-green-400 ml-2">Effektiv = {effective}</span>
          </p>
        </div>

        {heroicAvailable && exceptional && unlockedExceptional.length > 0 && (
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="font-semibold text-green-400 mb-2">Exceptional Powers</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {unlockedExceptional.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {heroicAvailable && maskedMystery && (
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="font-semibold text-purple-400 mb-2">Masked Mystery Powers</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {unlockedMM.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {!heroicAvailable && (
          <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3">
            <p className="text-yellow-200 text-sm">
              Heroic Skills und ihre besonderen Fähigkeiten sind erst ab Level 60 in einer Thieving-Klasse verfügbar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};