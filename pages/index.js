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
    }));
  }, [arrivalDate]);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  function formatDateWithOffset(baseDate, offsetDays) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offsetDays);

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
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

            <button type="submit">View my stay plan</button>
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