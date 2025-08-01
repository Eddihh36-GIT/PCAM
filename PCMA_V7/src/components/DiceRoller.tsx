import React, { useState } from 'react';
import { Dice6 } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { DiceD4Icon } from './icons/dice/DiceD4Icon';
import { DiceD6Icon } from './icons/dice/DiceD6Icon';
import { DiceD8Icon } from './icons/dice/DiceD8Icon';
import { DiceD10Icon } from './icons/dice/DiceD10Icon';
import { DiceD12Icon } from './icons/dice/DiceD12Icon';
import { DiceD20Icon } from './icons/dice/DiceD20Icon';
import { DiceD100Icon } from './icons/dice/DiceD100Icon';

interface DiceResult {
  type: string;
  count: number;
  results: number[];
  total: number;
  timestamp: number;
}

export const DiceRoller: React.FC = () => {
  const [diceCounts, setDiceCounts] = useState({
    d4: 1,
    d6: 1,
    d8: 1,
    d10: 1,
    d12: 1,
    d20: 1,
    d100: 1
  });

  const [results, setResults] = useState<DiceResult[]>([]);

  const rollDice = (sides: number, count: number): number[] => {
    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
  };

  const rollD100 = (count: number): number[] => {
    const rolls = [];
    for (let i = 0; i < count; i++) {
      const tens = Math.floor(Math.random() * 10); // 0-9
      const ones = Math.floor(Math.random() * 10); // 0-9
      const result = tens === 0 && ones === 0 ? 100 : tens * 10 + ones;
      rolls.push(result);
    }
    return rolls;
  };

  const handleRoll = (diceType: keyof typeof diceCounts) => {
    const count = diceCounts[diceType];
    if (count <= 0) return;

    let rollResults: number[];
    let sides: number;

    switch (diceType) {
      case 'd4':
        sides = 4;
        rollResults = rollDice(4, count);
        break;
      case 'd6':
        sides = 6;
        rollResults = rollDice(6, count);
        break;
      case 'd8':
        sides = 8;
        rollResults = rollDice(8, count);
        break;
      case 'd10':
        sides = 10;
        rollResults = rollDice(10, count);
        break;
      case 'd12':
        sides = 12;
        rollResults = rollDice(12, count);
        break;
      case 'd20':
        sides = 20;
        rollResults = rollDice(20, count);
        break;
      case 'd100':
        sides = 100;
        rollResults = rollD100(count);
        break;
      default:
        return;
    }

    const total = rollResults.reduce((sum, roll) => sum + roll, 0);
    const newResult: DiceResult = {
      type: diceType,
      count,
      results: rollResults,
      total,
      timestamp: Date.now()
    };

    setResults(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const updateDiceCount = (diceType: keyof typeof diceCounts, value: number) => {
    setDiceCounts(prev => ({
      ...prev,
      [diceType]: Math.max(1, value)
    }));
  };

  const getDiceIcon = (diceType: string) => {
    switch (diceType) {
      case 'd4': return <DiceD4Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd6': return <DiceD6Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd8': return <DiceD8Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd10': return <DiceD10Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd12': return <DiceD12Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd20': return <DiceD20Icon className="w-12 h-12" fillColor="#fff" />;
      case 'd100': return <DiceD100Icon className="w-12 h-12" fillColor="#fff" />;
      default: return <DiceD6Icon className="w-12 h-12" fillColor="#fff" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-6">
        <Dice6 className="w-6 h-6 text-green-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">Würfel Simulator</h2>
      </div>

      {/* Dice Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {Object.entries(diceCounts).map(([diceType, count]) => (
          <div key={diceType} className="bg-gray-700 rounded-lg p-4 text-center">
            <button
              onClick={() => handleRoll(diceType as keyof typeof diceCounts)}
              className="w-full mb-3 text-4xl hover:scale-110 transition-transform cursor-pointer"
              title={`${diceType.toUpperCase()} würfeln`}
            >
              {getDiceIcon(diceType)}
            </button>
            <div className="text-xs text-gray-400 mb-2">
              {diceType.toUpperCase()}
            </div>
            <Input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => updateDiceCount(diceType as keyof typeof diceCounts, parseInt(e.target.value) || 1)}
              className="text-center text-sm"
            />
          </div>
        ))}
      </div>

      {/* Results Display */}
      {results.length > 0 && (
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Letzte Würfelergebnisse</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.map((result, index) => (
              <div key={result.timestamp} className="bg-gray-600 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-400 font-medium">
                    {result.count}×{result.type.toUpperCase()}
                  </span>
                  <span className="text-green-400 font-bold text-lg">
                    Summe: {result.total}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  Einzelwürfe: {result.results.join(', ')}
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setResults([])}
            className="mt-3 w-full"
          >
            Ergebnisse löschen
          </Button>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>• Klicke auf einen Würfel, um ihn zu würfeln</p>
        <p>• Ändere die Anzahl der Würfel in den Eingabefeldern</p>
        <p>• D100 wird mit 2×D10 simuliert (00+0 = 100)</p>
      </div>
    </div>
  );
};