import { useMemo, useState } from "react";

export default function MountainStayCompanion() {
  const [guestName, setGuestName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [destination, setDestination] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const timelineTemplate = [
    {
      key: "14days",
      title: "14 days before arrival",
      offsetDays: -14,
      items: [
        "Order your ski passes",
        "Book ski rental if needed",
        "Arrange linen and towels",
        "Check optional extras",
      ],
      focus: "Time to arrange the essentials for your trip.",
    },
    {
      key: "2days",
      title: "2 days before arrival",
      offsetDays: -2,
      items: [
        "Check the weather forecast",
        "Review your travel route",
        "Read the arrival instructions carefully",
        "Keep your booking details ready",
      ],
      focus: "A good moment for the final checks before departure.",
    },
    {
      key: "arrival",
      title: "Arrival day",
      offsetDays: 0,
      items: [
        "Check-in starts from 17:00",
        "Use the access information provided",
        "Follow parking instructions",
        "Contact us if you need help",
      ],
      focus: "Today is arrival day. Make sure your access details are ready.",
    },
    {
      key: "stay",
      title: "During your stay",
      offsetDays: 1,
      items: [
        "Read the house rules",
        "Check recycling and bin information",
        "Review ski access or shuttle info",
        "Use support contact details when needed",
      ],
      focus: "Your stay has started. Here is the practical information for this phase.",
    },
    {
      key: "departure",
      title: "Departure day",
      offsetDays: 7,
      items: [
        "Leave the property tidy",
        "Follow key return instructions",
        "Double-check personal belongings",
        "Safe travels home",
      ],
      focus: "Time to review the departure checklist before heading home.",
    },
  ];

  const checklist = [
    "I checked my travel route",
    "I ordered ski passes",
    "I arranged ski rental",
    "I read the arrival instructions",
    "I packed everything I need",
  ];

  const formattedArrivalDate = useMemo(() => {
    if (!arrivalDate) return "";
    const date = new Date(arrivalDate);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }, [arrivalDate]);

  const timeline = useMemo(() => {
    if (!arrivalDate) return timelineTemplate;

    return timelineTemplate.map((block) => ({
      ...block,
      displayDate: formatDateWithOffset(arrivalDate, block.offsetDays),
      eventDate: getDateWithOffset(arrivalDate, block.offsetDays),
    }));
  }, [arrivalDate]);

  const todaysFocus = useMemo(() => {
    if (!arrivalDate || !showPlan) return null;

    const today = startOfDay(new Date());
    const datedBlocks = timeline
      .filter((block) => block.eventDate)
      .sort((a, b) => a.eventDate - b.eventDate);

    let current = datedBlocks[0];
    let next = null;

    for (let i = 0; i < datedBlocks.length; i += 1) {
      const block = datedBlocks[i];
      if (today >= block.eventDate) {
        current = block;
        next = datedBlocks[i + 1] || null;
      } else {
        next = block;
        break;
      }
    }

    if (today < datedBlocks[0].eventDate) {
      current = datedBlocks[0];
      next = datedBlocks[1] || null;
    }

    return {
      current,
      next,
      daysUntilCurrent: differenceInDays(today, current.eventDate),
      daysUntilNext: next ? differenceInDays(today, next.eventDate) : null,
    };
  }, [arrivalDate, showPlan, timeline]);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  function startOfDay(date) {
    const clone = new Date(date);
    clone.setHours(0, 0, 0, 0);
    return clone;
  }

  function getDateWithOffset(baseDate, offsetDays) {
    const date = new Date(baseDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offsetDays);
    return date;
  }

  function formatDateWithOffset(baseDate, offsetDays) {
    const date = getDateWithOffset(baseDate, offsetDays);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function differenceInDays(fromDate, toDate) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((toDate - fromDate) / msPerDay);
  }

  function getRelativeLabel(days) {
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days > 1) return `In ${days} days`;
    if (days === -1) return "Started yesterday";
    return `${Math.abs(days)} days ago`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowPlan(true);
  }

  function toggleChecklistItem(item) {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  }

 
  function formatICSDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  function formatICSDateTime(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  function escapeICS(text) {
    return String(text)
      .replace(/\/g, "\\")
      .replace(/;/g, "\;")
      .replace(/,/g, "\,")
      .replace(/
/g, "\n");
  }

  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <div className="eyebrow">Guest Journey Companion</div>
          <h1>Mountain Stay Companion</h1>
          <p className="lead">
            Everything your guests need before, during and after their stay —
            all in one calm and simple place.
          </p>
        </header>

        <section className="grid">
          <form onSubmit={handleSubmit} className="card">
            <h2>Start here</h2>
            <p className="muted">
              Fill in the details below to generate a personal stay plan for your
              guest.
            </p>

            <div className="form-grid">
              <div className="input-wrap">
                <label>Guest name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Susanne"
                />
              </div>

              <div className="input-wrap">
                <label>Arrival date</label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-wrap">
              <label>Chalet or destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Chalet des Montagnes"
              />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="submit">View my stay plan</button>
              {showPlan && arrivalDate ? (
                <button type="button" onClick={downloadCalendar} className="secondary-button">
                  Add reminders to calendar
                </button>
              ) : null}
            </div>
          </form>

          <div className="card-dark">
            <h2>Why guests will like this</h2>
            <ul>
              <li>One clear overview instead of multiple emails</li>
              <li>Less stress before arrival</li>
              <li>Easy to read on mobile</li>
              <li>Helpful for practical questions and planning</li>
            </ul>
          </div>
        </section>

        {showPlan && todaysFocus ? (
          <section className="focus-card">
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Today’s focus</div>
                <h2 style={{ marginBottom: 8 }}>{todaysFocus.current.title}</h2>
                <p className="muted" style={{ marginBottom: 0 }}>
                  {todaysFocus.current.focus}
                </p>
              </div>
              <div className="badge">{getRelativeLabel(todaysFocus.daysUntilCurrent)}</div>
            </div>

            <ul>
              {todaysFocus.current.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {todaysFocus.next ? (
              <div className="next-step-box">
                <strong>Next step:</strong> {todaysFocus.next.title} — {getRelativeLabel(todaysFocus.daysUntilNext)}
              </div>
            ) : null}
          </section>
        ) : null}

        {showPlan && (
          <section className="card" style={{ marginBottom: 24 }}>
            <h2>{guestName ? `Welcome, ${guestName}` : "Welcome"}</h2>
            <p className="muted">
              {formattedArrivalDate ? (
                <>
                  Your arrival is planned for <strong>{formattedArrivalDate}</strong>
                  {destination ? <> at <strong>{destination}</strong></> : null}.
                </>
              ) : (
                "Your personal stay plan is ready."
              )}
            </p>

            <div className="badges">
              <span className="badge">
                Checklist completed: {completedCount}/{checklist.length}
              </span>
              {destination ? (
                <span className="badge badge-neutral">
                  Destination: {destination}
                </span>
              ) : null}
            </div>
          </section>
        )}

        <section>
          <div className="section-head">
            <h2>Stay timeline</h2>
            <div className="badge badge-neutral">
              {showPlan ? "Personal plan" : "Example content"}
            </div>
          </div>

          <div className="timeline">
            {timeline.map((block) => (
              <div key={block.title} className="timeline-card">
                <div className="timeline-top">
                  <h3>{block.title}</h3>
                  {showPlan && block.displayDate ? (
                    <div className="timeline-date">{block.displayDate}</div>
                  ) : null}
                </div>

                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Quick checklist</h2>
            <div className="progress">
              {completedCount} of {checklist.length} completed
            </div>
          </div>

          <div className="checklist-card">
            {checklist.map((item) => (
              <label
                key={item}
                className={`check-item ${checkedItems[item] ? "done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={!!checkedItems[item]}
                  onChange={() => toggleChecklistItem(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
