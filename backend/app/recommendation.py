import json
from datetime import datetime, timedelta
from sqlmodel import Session, select

from .models import Data, engine

RECOMMENDATIONS = {
    "stress": [
        "5 Minuten Atemübung durchführen",
        "Kurze Achtsamkeitsübung ausprobieren",
        "Eine kurze Pause vom Bildschirm einlegen",
        "Gedanken kurz schriftlich festhalten",
        "Benachrichtigungen für 10 Minuten stummschalten",
        "Kurz aufstehen und Schultern lockern",
        "Eine Aufgabe priorisieren und bewusst langsam angehen",
        "Für einen Moment bewusst tief durchatmen",
    ],
    "schlaf": [
        "Bildschirmzeit vor dem Schlaf reduzieren",
        "Eine feste Abendroutine etablieren",
        "Entspannungsübung vor dem Schlafen durchführen",
        "Raumtemperatur und Lichtverhältnisse optimieren",
        "Koffein am Abend vermeiden",
        "Zur gleichen Zeit ins Bett gehen",
        "Vor dem Schlafen eine ruhige Tätigkeit wählen",
        "Gedanken für morgen kurz notieren, um besser abzuschalten",
    ],
    "bewegung": [
        "Einen kurzen Spaziergang machen",
        "5 bis 10 Minuten Dehnübungen durchführen",
        "Eine kurze Bewegungspause einlegen",
        "Alltagswege bewusst zu Fuß gehen",
        "Kurz aufstehen und einige Schritte laufen",
        "Eine Treppe statt des Aufzugs nehmen",
        "Nach längerer Sitzzeit bewusst Bewegung einbauen",
        "Für ein paar Minuten locker mobilisieren",
    ],
    "ernaehrung": [
        "Eine regelmäßige Mahlzeitenstruktur einhalten",
        "Ausreichend Wasser trinken",
        "Verarbeitete Snacks reduzieren",
        "Eine frische Mahlzeit planen",
        "Heute eine vollwertige Mahlzeit bewusst einplanen",
        "Eine Trinkpause in den Alltag einbauen",
        "Eine kleine gesunde Zwischenmahlzeit vorbereiten",
        "Beim Essen kurz langsamer und bewusster werden",
    ],
}



def parse_confirmed_labels(confirmed_label: str | None) -> list[str]:
    if not confirmed_label:
        return []

    try:
        parsed = json.loads(confirmed_label)

        if isinstance(parsed, dict):
            return parsed.get("labels", [])

        if isinstance(parsed, list):
            return parsed

        return []
    except Exception:
        return []


def get_user_history(user_id: int) -> list[Data]:
    with Session(engine) as session:
        seven_days_ago = datetime.now() - timedelta(days=7)

        statement = select(Data).where(
            Data.user_id == user_id,
            Data.timestamp >= seven_days_ago
        )

        entries = session.exec(statement).all()

    return entries


def compute_label_frequency(entries: list[Data]) -> dict[str, int]:
    freq = {
        "stress": 0,
        "schlaf": 0,
        "bewegung": 0,
        "ernaehrung": 0,
    }

    for entry in entries:
        labels = parse_confirmed_labels(entry.confirmed_label)

        for label in labels:
            if label in freq:
                freq[label] += 1

    return freq


def generate_recommendations(user_id: int, confirmed_labels: list[str]) -> list[str]:
    history = get_user_history(user_id)
    freq = compute_label_frequency(history)

    rec_scores = []

    for label in confirmed_labels:
        if label not in RECOMMENDATIONS:
            continue

        for index, rec in enumerate(RECOMMENDATIONS[label]):
            score = 1.0

            # Historie des Users berücksichtigen
            score += freq[label] * 0.3

            # Reihenfolge innerhalb eines Labels leicht gewichten
            if index == 0:
                score += 0.15
            elif index == 1:
                score += 0.10
            elif index == 2:
                score += 0.05

            rec_scores.append((rec, score))

    rec_scores.sort(key=lambda x: x[1], reverse=True)

    recommendations = []
    seen = set()

    for rec, _score in rec_scores:
        if rec not in seen:
            recommendations.append(rec)
            seen.add(rec)

    return recommendations[:4]
