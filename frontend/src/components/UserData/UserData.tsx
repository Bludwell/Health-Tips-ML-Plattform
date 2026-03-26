import NavBar from "../NavBar/NavBar";
import useActivityData from "../../hooks/useActivityData";
import "./UserData.css";

type Entry = {
  id: number;
  timestamp: string;
  text: string;
  predicted_label: string | null;
  confirmed_label: string | null;
};

const ALL_LABELS = ["stress", "schlaf", "bewegung", "ernaehrung"];

const labelNames: Record<string, string> = {
  stress: "Stress",
  schlaf: "Schlaf",
  bewegung: "Bewegung",
  ernaehrung: "Ernährung",
};

const UserData = () => {
  const { data, error, loading } = useActivityData();

  const parseConfirmedLabels = (confirmedLabel: string | null): string[] => {
    if (!confirmedLabel) return [];

    try {
      const parsed = JSON.parse(confirmedLabel);

      if (Array.isArray(parsed)) return parsed;
      if (Array.isArray(parsed.labels)) return parsed.labels;

      return [];
    } catch {
      return [];
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return timestamp;

    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const entries: Entry[] = Array.isArray(data) ? data : [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    return !Number.isNaN(entryDate.getTime()) && entryDate >= sevenDaysAgo;
  });

  const labelCounts = ALL_LABELS.reduce<Record<string, number>>(
    (acc, label) => {
      acc[label] = 0;
      return acc;
    },
    {},
  );

  recentEntries.forEach((entry) => {
    const labels = parseConfirmedLabels(entry.confirmed_label);
    labels.forEach((label) => {
      if (label in labelCounts) {
        labelCounts[label] += 1;
      }
    });
  });

  const maxCount = Math.max(...Object.values(labelCounts), 1);

  return (
    <>
      <NavBar />

      <div className="userdata-wrapper">
        <div className="userdata-container">
          <h1>Deine Einträge</h1>

          {loading && <p>Lade Einträge...</p>}
          {error && <p className="userdata-error">{error}</p>}

          {!loading && !error && (
            <>
              <section className="summary-section">
                <h2>Letzte 7 Tage</h2>
                <p className="summary-text">
                  In den letzten 7 Tagen:{" "}
                  {ALL_LABELS.map((label) => (
                    <span className="txt" key={label}>
                      {labelNames[label]} {labelCounts[label]}×{" "}
                    </span>
                  ))}
                </p>

                <div className="trend-list">
                  {ALL_LABELS.map((label) => (
                    <div key={label} className="trend-item">
                      <div className="trend-label-row">
                        <span className="txt">{labelNames[label]}</span>
                        <span className="txt">{labelCounts[label]}×</span>
                      </div>

                      <div className="trend-bar-bg">
                        <div
                          className="trend-bar-fill"
                          style={{
                            width: `${(labelCounts[label] / maxCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="entries-section">
                <h2>Alle Einträge</h2>

                {entries.length === 0 ? (
                  <p>Noch keine Einträge vorhanden.</p>
                ) : (
                  <div className="entry-list">
                    {entries
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime(),
                      )
                      .map((entry) => {
                        const confirmedLabels = parseConfirmedLabels(
                          entry.confirmed_label,
                        );

                        return (
                          <div key={entry.id} className="entry-card">
                            <div className="entry-header">
                              <span className="entry-date">
                                {formatDate(entry.timestamp)}
                              </span>
                            </div>

                            <div className="entry-body">
                              <p className="entry-text">{entry.text}</p>

                              <div className="label-chip-list">
                                {confirmedLabels.length > 0 ? (
                                  confirmedLabels.map((label) => (
                                    <span key={label} className="label-chip">
                                      {labelNames[label] || label}
                                    </span>
                                  ))
                                ) : (
                                  <span className="no-labels">
                                    Keine bestätigten Labels
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserData;
