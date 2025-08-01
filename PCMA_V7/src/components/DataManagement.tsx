import React, { useRef } from 'react';
import { Download, Upload, Save, FolderOpen } from 'lucide-react';
import { Character } from '../types/character';

interface DataManagementProps {
  character: Character;
  onImportCharacter: (character: Character) => void;
}

export const DataManagement: React.FC<DataManagementProps> = ({ character, onImportCharacter }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name}_character_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Basic validation
        if (importedData && typeof importedData === 'object' && importedData.name && importedData.classes) {
          // Ensure all powers have the new currentUses structure
          if (importedData.powers) {
            importedData.powers = importedData.powers.map((power: any) => ({
              ...power,
              currentUses: {
                sequence: power.currentUses?.sequence || 0,
                round: power.currentUses?.round || 0,
                turn: power.currentUses?.turn || 0,
                hour: power.currentUses?.hour || 0,
                day: power.currentUses?.day || power.currentUses?.day || 0,
                week: power.currentUses?.week || power.currentUses?.week || 0,
                month: power.currentUses?.month || 0
              }
            }));
          }
          
          onImportCharacter(importedData);
          alert('Charakter erfolgreich importiert!');
        } else {
          alert('Ungültige Datei. Bitte wählen Sie eine gültige Charakter-JSON-Datei.');
        }
      } catch (error) {
        alert('Fehler beim Lesen der Datei. Bitte überprüfen Sie das Dateiformat.');
        console.error('Import error:', error);
      }
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Save className="w-6 h-6 text-green-400 mr-2" />
        <h2 className="text-xl font-bold text-white">Daten-Management</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleExport}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Charakter Exportieren
        </button>
        
        <button
          onClick={triggerFileInput}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Upload className="w-5 h-5 mr-2" />
          Charakter Importieren
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
      
      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>• <strong>Export:</strong> Speichert den aktuellen Charakter-Zustand als JSON-Datei</p>
        <p>• <strong>Import:</strong> Lädt einen gespeicherten Charakter-Zustand aus einer JSON-Datei</p>
        <p>• <strong>Tipp:</strong> Automatische lokale Speicherung finden zwar statt, erstell dennoch regelmäßig Backups nach wichtigen Änderungen</p>
      </div>
    </div>
  );
};