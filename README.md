# Health Tips ML Plattform

## Übersicht

Dieses Projekt wurde im Rahmen der Bachelorarbeit

**„Personalisierte Gesundheitsempfehlungen durch maschinelles Lernen: Entwicklung einer webbasierten Datenanalyseplattform“** 

entwickelt.

Ziel der Anwendung ist es, eine **webbasierte Plattform zur Analyse von Freitexteingaben im Kontext mentaler Gesundheit** bereitzustellen. Nutzer können ihren aktuellen Zustand in natürlicher Sprache beschreiben, woraufhin das System relevante Problembereiche automatisch identifiziert und darauf basierend **nachvollziehbare, personalisierte Handlungsempfehlungen** generiert.

Die Anwendung verfolgt bewusst einen **prototypischen Ansatz** und dient als Proof of Concept zur Untersuchung, wie Machine Learning sinnvoll in einen nutzerzentrierten Web-Workflow integriert werden kann.

---

## Zielsetzung der Arbeit

Die zentrale Zielsetzung besteht darin, eine Plattform zu entwickeln, die:

* **niedrigschwellige Datenerfassung** über Freitext ermöglicht
* **unstrukturierte Texte automatisch analysiert** (Multi-Label-Klassifikation)
* relevante Bereiche wie

  * Stress
  * Schlaf
  * Bewegung
  * Ernährung
    identifiziert
* daraus **transparente und alltagstaugliche Empfehlungen** ableitet

Ein zentraler Fokus liegt dabei auf der **Kombination aus Machine Learning und Nutzerinteraktion (Human-in-the-Loop)**, um die Grenzen automatischer Klassifikation auszugleichen. 

---

## Funktionsweise

Die Anwendung basiert auf einem mehrstufigen Interaktionsprozess:

1. **Freitext-Eingabe**
   Nutzer beschreiben ihren aktuellen Zustand in eigenen Worten

2. **Automatische Analyse (ML-Modell)**

   * Multi-Label-Klassifikation
   * Ausgabe von Wahrscheinlichkeiten pro Kategorie

3. **Human-in-the-Loop**

   * Nutzer bestätigen oder korrigieren die erkannten Kategorien
   * finale Entscheidung bleibt beim Nutzer

4. **Empfehlungsgenerierung**

   * regelbasierte Ableitung von Handlungsempfehlungen
   * basierend auf bestätigten Kategorien und Gewichtung

5. **Speicherung & Verlauf**

   * Einträge werden persistiert
   * Analyse von Entwicklungen über Zeit möglich

Dieser Ansatz verbindet automatische Analyse mit Nutzerkontrolle und adressiert gezielt die Unsicherheiten bei der Verarbeitung natürlicher Sprache. 

---

## Technologiestack

### Frontend

* React (TypeScript)
* Vite
* Axios
* React Router

### Backend

* FastAPI (Python)
* SQLAlchemy
* SQLite
* Scikit-learn (TF-IDF + logistische Regression)

### Machine Learning

* Multi-Label-Klassifikation
* TF-IDF-Vektorisierung
* One-vs-Rest Ansatz
* optionaler Vergleich mit transformerbasierten Modellen (z. B. BERT)

### Infrastruktur

* Docker & Docker Compose (Entwicklungsumgebung)

---

## Machine Learning Ansatz

Das System verwendet ein Klassifikationsmodell zur Analyse kurzer, deutschsprachiger Texte.

* Eingabe: Freitext (z. B. „Ich schlafe schlecht und habe viel Stress“)
* Ausgabe: Wahrscheinlichkeiten für mehrere Kategorien gleichzeitig

Besonderheiten:

* Multi-Label-Klassifikation (mehrere Kategorien pro Text möglich)
* Fokus auf **kurze, alltagsnahe Texte**
* Training auf synthetisch generierten Daten (≈350 Beispiele)

### Wichtige Erkenntnis

Die Arbeit zeigt, dass automatische Klassifikation grundsätzlich funktioniert, jedoch:

* bei **kurzen und mehrdeutigen Texten limitiert ist**
* stark von der **Datenqualität** abhängt
* durch Nutzerinteraktion deutlich verbessert werden kann 

---

## Projektstruktur

```bash
.
├── frontend/        # React Webanwendung
├── backend/         # FastAPI API + ML-Modell
├── docker-compose.yml
└── README.md
```

---

## Installation & Start

### Voraussetzungen

* Node.js
* Python 3.10+
* Docker (optional)

---

### Mit Docker (empfohlen)

```bash
docker-compose up --build
```

Frontend: [http://localhost:5173](http://localhost:5173)
Backend: [http://localhost:8000](http://localhost:8000)

---

### Manuell

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Einschränkungen & Prototyp-Charakter

Diese Anwendung ist bewusst als **Proof of Concept** konzipiert und weist folgende Einschränkungen auf:

* Keine produktionsreife Authentifizierung
* Lokale Datenhaltung (SQLite)
* Teilweise hardcodierte Konfigurationen
* ML-Modell basiert auf **synthetischen Trainingsdaten**

Die Ergebnisse sind daher als **prototypische Annäherung** zu interpretieren und nicht als endgültige Lösung. 

---

## Einordnung im Gesundheitskontext

Die Anwendung ist **kein medizinisches System**.

* keine Diagnose
* keine Therapieempfehlung
* keine klinische Validierung

Ziel ist ausschließlich:
👉 Unterstützung bei **Selbstreflexion und Selbstbeobachtung**

---

## Zentrale Erkenntnisse

* Machine Learning kann Freitexte sinnvoll vorstrukturieren
* Nutzerinteraktion ist entscheidend für Qualität
* transparente, regelbasierte Systeme sind im Gesundheitskontext vorteilhaft
* Datenqualität ist wichtiger als Modellkomplexität

---

## Ausblick

Mögliche Weiterentwicklungen:

* Nutzung realer Nutzerdaten für Training
* Einsatz leistungsfähigerer Modelle (z. B. Transformer)
* stärkere Personalisierung
* Nutzerstudien zur Evaluation
* Erweiterung der Kategorien und Empfehlungen

---

## Autor

Tim Roloff
B. Sc. Informatik – Internationale Hochschule Duales Studium

Die Entwicklung erfolgte ausschließlich durch mich. Mehrere Contributor im Repository ergeben sich aus unterschiedlichen Git-Konfigurationen auf verschiedenen Geräten.

---

## Lizenz

<a href="https://github.com/Bludwell/Health-Tips-ML-Plattform/tree/main">Health-Tips-ML-Plattform</a> © 2026 by <a href="https://example.com">Tim Roloff</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">

