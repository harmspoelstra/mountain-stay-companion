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
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
            Guest Journey Companion
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Mountain Stay Companion
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            Everything your guests need before, during and after their stay —
            all in one calm and simple place.
          </p>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
          >
            <h2 className="text-xl font-semibold">Start here</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Fill in the details below to generate a personal stay plan for your
              guest.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  Guest name
                </span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Susanne"
                  className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  Arrival date
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:bg-white"
                  required
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-medium text-stone-700">
                Chalet or destination
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Chalet des Montagnes"
                className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="mt-6 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              View my stay plan
            </button>
          </form>

          <div className="rounded-3xl bg-emerald-900 p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold">Why guests will like this</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-50">
              <li>One clear overview instead of multiple emails</li>
              <li>Less stress before arrival</li>
              <li>Easy to read on mobile</li>
              <li>Helpful for practical questions and planning</li>
            </ul>
          </div>
        </section>

        {showPlan && (
          <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold text-emerald-800">
              {guestName ? `Welcome, ${guestName}` : "Welcome"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {formattedArrivalDate ? (
                <>
                  Your arrival is planned for <strong>{formattedArrivalDate}</strong>
                  {destination ? <> at <strong>{destination}</strong></> : null}.
                </>
              ) : (
                "Your personal stay plan is ready."
              )}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 ring-1 ring-emerald-100">
                Checklist completed: {completedCount}/{checklist.length}
              </span>
              {destination ? (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 ring-1 ring-stone-200">
                  Destination: {destination}
                </span>
              ) : null}
            </div>
          </section>
        )}

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Stay timeline</h2>
            <span className="rounded-full bg-white px-3 py-1 text-sm text-stone-600 shadow-sm ring-1 ring-stone-200">
              {showPlan ? "Personal plan" : "Example content"}
            </span>
          </div>

          <div className="grid gap-4">
            {timeline.map((block) => (
              <div
                key={block.title}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-emerald-800">
                    {block.title}
                  </h3>
                  {showPlan && block.displayDate ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-800 ring-1 ring-emerald-100">
                      {block.displayDate}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Quick checklist</h2>
            <span className="text-sm text-stone-500">
              {completedCount} of {checklist.length} completed
            </span>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="grid gap-3">
              {checklist.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                    checkedItems[item]
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-stone-200 text-stone-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item]}
                    onChange={() => toggleChecklistItem(item)}
                    className="h-4 w-4"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
