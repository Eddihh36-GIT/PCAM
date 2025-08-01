# Aduan Character Management Assistant - Project Briefing

## Zweck dieses Dokuments
Dieses Briefing ermöglicht es externen Parteien, die "Aduan Character Management Assistant" Anwendung in identischem Zustand zu replizieren und zu evaluieren.

## Anwendungsübersicht
Der "Aduan Character Management Assistant" ist eine webbasierte Charakterverwaltung für Pen-&-Paper-Rollenspiele. Die Anwendung bietet:

- **Charakterverwaltung**: Name, Klassen, Level, Gesundheit, Fähigkeitswerte
- **Power-System**: Verwaltung und Nutzung von Charakterfähigkeiten mit Formeln
- **Würfel-Simulator**: D4, D6, D8, D10, D12, D20, D100 mit Mehrfachwürfen
- **Diebesfähigkeiten**: Spezialisierte Skills für Diebesklassen
- **Daten-Management**: Import/Export von Charakterdaten

## Technische Voraussetzungen
- **Node.js** (LTS-Version empfohlen, mindestens v16)
- **npm** (wird mit Node.js installiert)
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)

## Einrichtung und Start

### 1. Projekt-Setup
```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### 2. Anwendung öffnen
Nach dem Start ist die Anwendung unter `http://localhost:5173` erreichbar.

## Wichtige Funktionalitäten zum Testen

### Charakter Management Tab
1. **Character Dashboard**
   - Charaktername durch Klick auf Edit-Icon ändern
   - Gesundheit über Damage/Healing-Felder anpassen
   - Action Routine konfigurieren

2. **Ability Score Tracker**
   - Base-Werte, Enhancement, Check-Boni anpassen
   - Automatische Berechnung der Gesamtwerte und Regeleffekte
   - Perception Score basierend auf höchstem Int/Wis-Wert

3. **Level Progression**
   - Klassen hinzufügen/entfernen
   - Level mit +/- Buttons anpassen
   - Focus-Auswahl ab Level 60

4. **Data Management**
   - Charakter als JSON exportieren
   - Gespeicherte Charaktere importieren

### Tools & Powers Tab
1. **Dice Roller**
   - Verschiedene Würfeltypen testen
   - Anzahl der Würfel anpassen
   - Ergebnishistorie beobachten

2. **Thieving Skills Manager** (nur bei Diebesklassen sichtbar)
   - Skills aus Dropdown auswählen und hinzufügen
   - Heroic Skills ab Level 60 verfügbar
   - **BEKANNTES PROBLEM**: Dropdown-Auswahl funktioniert derzeit nicht korrekt

3. **Power Management**
   - Vorhandene Powers nach Kategorien sortiert
   - Uses-Zähler für verschiedene Zeiträume
   - Formeln werden automatisch berechnet

4. **Power Editor**
   - Neue Powers erstellen
   - Formeln für dynamische Werte konfigurieren
   - Verschiedene Kategorien und Karma-Foci

## Testszenarien

### Basis-Funktionalität
1. Charaktername auf "Testcharakter" ändern
2. Gesundheit um 100 Punkte reduzieren
3. Strength Base-Wert auf 18 setzen
4. Eine neue Klasse hinzufügen

### Power-System
1. Im Power Editor eine neue Power erstellen
2. Uses-Formel aktivieren und testen
3. Im Power Management die Power verwenden
4. Reset-Kontrollen ausprobieren

### Daten-Persistenz
1. Charakter exportieren
2. Browser-Tab schließen und neu öffnen
3. Daten sollten automatisch geladen werden
4. Exportierte Datei wieder importieren

## Bekannte Probleme
- **Thieving Skills Dropdown**: Auswahl funktioniert nicht - Skills können nicht hinzugefügt werden
- **Geplante Verbesserung**: Skill-Auswahl-Button soll doppelt so breit werden

## Technische Details
- **Framework**: React 18 mit TypeScript
- **Build-Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Formeln**: expr-eval Library
- **Persistenz**: LocalStorage (automatisch)

## Erwartetes Verhalten
Nach erfolgreicher Einrichtung sollten Sie:
- Einen dunklen, professionell gestalteten Charakterbogen sehen
- Zwischen "Charakter Management" und "Tools & Powers" Tabs wechseln können
- Alle Eingabefelder funktionsfähig vorfinden
- Automatische Berechnungen bei Wertänderungen beobachten
- Würfelergebnisse in Echtzeit sehen

## Support
Bei Fragen oder Problemen während der Einrichtung, bitte Rücksprache halten.

---
*Erstellt für Evaluationszwecke - Stand: Aktueller Entwicklungsstand*