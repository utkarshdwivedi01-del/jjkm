import { useState } from "react";

const changes = {
  tuesday: [
    { type: "remove", exercise: "Cable Standing Lat Pushdown", reason: "Replaced to make room for trap/rear delt work" },
    { type: "reduce", exercise: "Dumbbell Incline Curl", from: "4 sets", to: "3 sets", reason: "Slightly reduced to balance volume — still enough for bicep growth" },
    { type: "reduce", exercise: "Hammer Curl", from: "4 sets", to: "3 sets", reason: "Same — 3 sets is optimal for brachialis at this frequency" },
    { type: "reduce", exercise: "Reverse Curl", from: "4 sets", to: "3 sets", reason: "Same — forearms also get indirect work all session" },
    { type: "add", exercise: "Barbell Shrug", detail: "3 sets × 12 reps × 40-60kg", reason: "TRAPS were completely missing from this program. Upper traps need direct shrug work 2x/week." },
    { type: "add", exercise: "Cable Face Pull", detail: "3 sets × 15 reps", reason: "Hits rear delts AND middle traps simultaneously. Best posture-saver + shoulder health exercise in any program." },
  ],
  wednesday: [
    { type: "change", from: "Incline Bench Press", to: "Flat Barbell Bench Press", detail: "3 sets × 10 reps × 35-50kg", reason: "Incline appears on BOTH Wed and Fri in original — zero flat chest work. Flat bench maximises sternal (lower) chest fibers that incline skips." },
    { type: "add", exercise: "Cable Rear Delt Fly", detail: "3 sets × 15 reps", reason: "Rear delts need 2x/week stimulus. Push day is perfect — you're pressing fresh so add rear delt isolation before triceps fatigue sets in." },
  ],
  thursday: [
    { type: "add", exercise: "Dumbbell Standing Calf Raise", detail: "3 sets × 15 reps × 30-40kg", reason: "Calves were only trained Monday. Science says calves need 2x/week minimum — they're postural muscles with high endurance fiber content." },
  ],
  friday: [
    { type: "change", from: "Smith Incline Bench Press", to: "Flat Dumbbell Press", detail: "3 sets × 10 reps × 20-30kg each hand", reason: "Smith incline is the SAME movement as Wed's new flat bench (incline machine variant). DB flat press adds dumbbell ROM advantage and hits lower/mid chest differently." },
    { type: "remove", exercise: "Chest Dip", reason: "Chest Dip is already done on Wednesday. Repeating same exercise same week on chest+back day adds fatigue with zero extra stimulus — recovery killer." },
    { type: "add", exercise: "Cable Shrug", detail: "3 sets × 12 reps × 40-60kg", reason: "Traps need 2x/week. Cable shrugs on Friday pairs perfectly with the back session — you're already in the cable area, and lat pulldowns partially warm up the traps." },
  ],
  saturday: [
    { type: "remove", exercise: "Cable Pushdown", reason: "You already have Triceps Pushdown + High Pulley Overhead Extension — that's 2 tricep exercises covering short and long head. Cable Pushdown is redundant with Triceps Pushdown (same movement pattern)." },
    { type: "add", exercise: "Dumbbell Rear Delt Fly", detail: "3 sets × 15 reps × 8-12kg", reason: "Rear delts need isolation work on Shoulders day. The original only had Cable Rear Delt Row — added Fly for a different contraction angle hitting the posterior delt fully." },
  ],
};

const program = [
  {
    day: "MON",
    name: "Legs",
    sub: "Quads Focus + Abs",
    sets: 26,
    duration: "~1h 5m",
    color: "#f97316",
    changed: false,
    exercises: [
      { name: "Full Squat", detail: "4 sets × 7 reps × 40-50kg", tag: "Quads, Glutes" },
      { name: "Sled 45° Leg Press", detail: "4 sets × 10 reps × 100-150kg", tag: "Quads" },
      { name: "Lever Leg Extension", detail: "4 sets × 12 reps × 50kg", tag: "Quads" },
      { name: "Lever Lying Leg Curl", detail: "4 sets × 12 reps × 50kg", tag: "Hamstrings" },
      { name: "Dumbbell Standing Calf Raise", detail: "4 sets × 15 reps × 55kg", tag: "Calves" },
      { name: "Seated Leg Raise", detail: "3 sets × 10 reps", tag: "Abs" },
      { name: "Seated Flutter Kick", detail: "3 sets × 10 reps", tag: "Abs" },
    ],
  },
  {
    day: "TUE",
    name: "Pull",
    sub: "Back, Biceps + Forearms",
    sets: 24,
    duration: "~1h 5m",
    color: "#3b82f6",
    changed: true,
    exercises: [
      { name: "Lever Bent-over Row w/ V-bar", detail: "3 sets × 7-10 reps × 20-40kg", tag: "Lats, Mid-Back" },
      { name: "Bar Lateral Pulldown", detail: "3 sets × 12-15 reps × 40-45kg", tag: "Lats" },
      { name: "One Arm Row", detail: "3 sets × 10 reps × 35kg", tag: "Lats, Mid-Back" },
      { name: "Barbell Shrug", detail: "3 sets × 12 reps × 40-60kg", tag: "Traps ✦ NEW", isNew: true },
      { name: "Cable Face Pull", detail: "3 sets × 15 reps", tag: "Rear Delts + Mid Traps ✦ NEW", isNew: true },
      { name: "Dumbbell Incline Curl", detail: "3 sets × 10 reps × 20kg", tag: "Biceps", reduced: true },
      { name: "Hammer Curl", detail: "3 sets × 10 reps × 15kg", tag: "Brachialis", reduced: true },
      { name: "Reverse Curl", detail: "3 sets × 10 reps × 20kg", tag: "Forearms", reduced: true },
    ],
  },
  {
    day: "WED",
    name: "Push",
    sub: "Chest, Shoulders + Triceps",
    sets: 24,
    duration: "~1h 5m",
    color: "#10b981",
    changed: true,
    exercises: [
      { name: "Flat Barbell Bench Press", detail: "3 sets × 10 reps × 35-50kg", tag: "Lower/Mid Chest ✦ CHANGED", changed: true },
      { name: "Seated Shoulder Press", detail: "3 sets × 10 reps × 25-35kg", tag: "Front + Side Delts" },
      { name: "Lever Seated Fly", detail: "3 sets × 12 reps × 20kg", tag: "Chest" },
      { name: "Lateral Raise", detail: "3 sets × 15 reps × 15kg", tag: "Side Delts" },
      { name: "Cable Rear Delt Fly", detail: "3 sets × 15 reps", tag: "Rear Delts ✦ NEW", isNew: true },
      { name: "Chest Dip", detail: "3 sets × 12 reps × 62kg", tag: "Chest + Triceps" },
      { name: "Triceps Pushdown", detail: "3 sets × 12 reps × 25kg", tag: "Triceps (Short Head)" },
      { name: "One Arm Side Triceps Pushdown", detail: "3 sets × 12 reps × 20kg", tag: "Triceps" },
    ],
  },
  {
    day: "THU",
    name: "Legs",
    sub: "Glutes Focus + Abs",
    sets: 27,
    duration: "~1h 10m",
    color: "#8b5cf6",
    changed: true,
    exercises: [
      { name: "Full Squat", detail: "4 sets × 7 reps × 40-50kg", tag: "Quads, Glutes" },
      { name: "Hip Thrust", detail: "4 sets × 12 reps × 30-40kg", tag: "Glutes" },
      { name: "Sled 45° Leg Press", detail: "4 sets × 12 reps × 130-150kg", tag: "Glutes, Quads" },
      { name: "Lever Leg Extension", detail: "3 sets × 12 reps × 50kg", tag: "Quads" },
      { name: "Romanian Deadlift", detail: "3 sets × 12 reps × 40kg", tag: "Hamstrings, Glutes" },
      { name: "Dumbbell Standing Calf Raise", detail: "3 sets × 15 reps × 30-40kg", tag: "Calves ✦ NEW", isNew: true },
      { name: "Seated Leg Raise", detail: "3 sets × 10 reps", tag: "Abs" },
      { name: "Seated Flutter Kick", detail: "3 sets × 10 reps", tag: "Abs" },
    ],
  },
  {
    day: "FRI",
    name: "Chest + Back",
    sub: "Arnold Day 1",
    sets: 30,
    duration: "~1h 15m",
    color: "#ef4444",
    changed: true,
    exercises: [
      { name: "Incline Bench Press", detail: "3 sets × 10 reps × 30-45kg", tag: "Upper Chest" },
      { name: "Flat Dumbbell Press", detail: "3 sets × 10 reps × 20-30kg/hand", tag: "Mid/Lower Chest ✦ CHANGED", changed: true },
      { name: "Bar Lateral Pulldown", detail: "3 sets × 12 reps × 35-45kg", tag: "Lats" },
      { name: "Cable Lateral Pulldown w/ V-bar", detail: "3 sets × 12 reps × 40kg", tag: "Lats" },
      { name: "Lever Chest Press", detail: "3 sets × 10 reps × 35kg", tag: "Chest" },
      { name: "Lever Bent-over Row w/ V-bar", detail: "3 sets × 7 reps × 50kg", tag: "Lats, Mid-Back" },
      { name: "Lever Seated Fly", detail: "3 sets × 12 reps × 20kg", tag: "Chest" },
      { name: "Cable Low Row w/ Rope Attachment", detail: "3 sets × 12 reps × 40kg", tag: "Mid-Back" },
      { name: "Cable Shrug", detail: "3 sets × 12 reps × 40-60kg", tag: "Traps ✦ NEW", isNew: true },
      { name: "Cable Standing Lat Pushdown", detail: "3 sets × 12 reps × 30kg", tag: "Lats" },
    ],
  },
  {
    day: "SAT",
    name: "Shoulders + Arms",
    sub: "Arnold Day 2",
    sets: 30,
    duration: "~1h 15m",
    color: "#f59e0b",
    changed: true,
    exercises: [
      { name: "Lever Shoulder Press", detail: "3 sets × 10 reps × 30-40kg", tag: "Front + Side Delts" },
      { name: "Cable Standing Rear Delt Row", detail: "3 sets × 10 reps", tag: "Rear Delts" },
      { name: "Dumbbell Rear Delt Fly", detail: "3 sets × 15 reps × 8-12kg", tag: "Rear Delts ✦ NEW", isNew: true },
      { name: "Lateral Raise", detail: "3 sets × 15 reps × 15kg", tag: "Side Delts" },
      { name: "EZ Barbell Curl", detail: "3 sets × 12 reps × 10kg", tag: "Biceps" },
      { name: "Dumbbell Incline Curl", detail: "3 sets × 12 reps × 15kg", tag: "Biceps" },
      { name: "Hammer Curl", detail: "3 sets × 12 reps × 15kg", tag: "Brachialis" },
      { name: "Reverse Curl", detail: "3 sets × 12 reps × 15kg", tag: "Forearms" },
      { name: "Triceps Pushdown", detail: "3 sets × 12 reps × 25kg", tag: "Triceps (Short Head)" },
      { name: "High Pulley Overhead Tricep Extension", detail: "3 sets × 12 reps × 20kg", tag: "Triceps (Long Head)" },
    ],
  },
  {
    day: "SUN",
    name: "Rest",
    sub: "Cardio Only",
    sets: 0,
    duration: "—",
    color: "#6b7280",
    changed: false,
    exercises: [{ name: "Low-intensity cardio (30-45 min)", detail: "Walk / Cycle / Swim", tag: "Recovery" }],
  },
];

const changeReasons = {
  tuesday: {
    title: "Tuesday — Pull Day",
    color: "#3b82f6",
    items: changes.tuesday,
  },
  wednesday: {
    title: "Wednesday — Push Day",
    color: "#10b981",
    items: changes.wednesday,
  },
  thursday: {
    title: "Thursday — Leg Day (Glutes)",
    color: "#8b5cf6",
    items: changes.thursday,
  },
  friday: {
    title: "Friday — Chest + Back",
    color: "#ef4444",
    items: changes.friday,
  },
  saturday: {
    title: "Saturday — Shoulders + Arms",
    color: "#f59e0b",
    items: changes.saturday,
  },
};

const muscleVolume = [
  { muscle: "Chest", weekly: "15-18 sets", freq: "3x", status: "optimal" },
  { muscle: "Back (Lats)", weekly: "18-21 sets", freq: "3x", status: "optimal" },
  { muscle: "Quads", weekly: "16 sets", freq: "2x", status: "optimal" },
  { muscle: "Hamstrings", weekly: "9 sets", freq: "2x", status: "good" },
  { muscle: "Glutes", weekly: "14 sets", freq: "2x", status: "optimal" },
  { muscle: "Traps", weekly: "6 sets", freq: "2x", status: "good" },
  { muscle: "Rear Delts", weekly: "12 sets", freq: "3x", status: "optimal" },
  { muscle: "Side Delts", weekly: "9 sets", freq: "2x", status: "good" },
  { muscle: "Biceps", weekly: "12-15 sets", freq: "3x", status: "optimal" },
  { muscle: "Triceps", weekly: "12-15 sets", freq: "3x", status: "optimal" },
  { muscle: "Calves", weekly: "7 sets", freq: "2x", status: "good" },
  { muscle: "Abs", weekly: "12 sets", freq: "2x", status: "optimal" },
];

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("program");
  const [expandedChange, setExpandedChange] = useState(null);

  const day = program[activeDay];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e8e8f0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f1a1a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 20px 16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>🦖</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: "#fff" }}>
              PPL × Arnold Split
            </div>
            <div style={{ fontSize: 11, color: "#6b6b8a", letterSpacing: 1, textTransform: "uppercase" }}>
              Optimized v2.0 — Science-Based
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {["program", "changes", "volume"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.3,
                background: activeTab === tab ? "rgba(255,255,255,0.12)" : "transparent",
                color: activeTab === tab ? "#fff" : "#5a5a7a",
                transition: "all 0.2s",
              }}
            >
              {tab === "program" ? "📋 Program" : tab === "changes" ? "✏️ Changes" : "📊 Volume"}
            </button>
          ))}
        </div>
      </div>

      {/* PROGRAM TAB */}
      {activeTab === "program" && (
        <div>
          {/* Day Selector */}
          <div style={{ padding: "16px 16px 8px", overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
              {program.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: activeDay === i ? `2px solid ${d.color}` : "2px solid transparent",
                    background: activeDay === i
                      ? `${d.color}22`
                      : "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    minWidth: 52,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: activeDay === i ? d.color : "#5a5a7a",
                    letterSpacing: 0.5,
                  }}>{d.day}</span>
                  <span style={{ fontSize: 7, color: "#4a4a6a", marginTop: 3, letterSpacing: 0.3 }}>
                    {d.sets > 0 ? `${d.sets}s` : "REST"}
                  </span>
                  {d.changed && (
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: d.color, marginTop: 3,
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Day Header */}
          <div style={{ padding: "12px 16px" }}>
            <div style={{
              background: `linear-gradient(135deg, ${day.color}18, ${day.color}08)`,
              border: `1px solid ${day.color}30`,
              borderRadius: 16,
              padding: "16px",
              marginBottom: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
                    {day.name}
                  </div>
                  <div style={{ fontSize: 13, color: day.color, marginTop: 2, fontWeight: 500 }}>
                    {day.sub}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {day.sets > 0 && (
                    <>
                      <div style={{ fontSize: 28, fontWeight: 900, color: day.color, lineHeight: 1 }}>
                        {day.sets}
                      </div>
                      <div style={{ fontSize: 10, color: "#5a5a7a", marginTop: 2 }}>SETS</div>
                    </>
                  )}
                </div>
              </div>
              {day.duration !== "—" && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 10,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 12,
                  color: "#9a9ab8",
                }}>
                  ⏱ {day.duration}
                  {day.changed && (
                    <span style={{
                      fontSize: 10,
                      color: day.color,
                      fontWeight: 700,
                      marginLeft: 4,
                      background: `${day.color}20`,
                      padding: "1px 6px",
                      borderRadius: 4,
                    }}>UPDATED</span>
                  )}
                </div>
              )}
            </div>

            {/* Exercise List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {day.exercises.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    background: ex.isNew
                      ? `linear-gradient(135deg, ${day.color}14, ${day.color}06)`
                      : ex.changed
                      ? "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))"
                      : "rgba(255,255,255,0.03)",
                    border: ex.isNew
                      ? `1px solid ${day.color}40`
                      : ex.changed
                      ? "1px solid rgba(251,191,36,0.25)"
                      : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: ex.isNew ? `${day.color}30` : ex.changed ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: ex.isNew ? day.color : ex.changed ? "#fbbf24" : "#5a5a7a",
                    flexShrink: 0,
                  }}>
                    {ex.isNew ? "★" : ex.changed ? "↻" : ex.reduced ? "↓" : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: ex.isNew ? "#fff" : ex.changed ? "#fbbf24" : "#d8d8f0",
                      lineHeight: 1.3,
                    }}>
                      {ex.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#5a5a7a", marginTop: 2 }}>
                      {ex.detail}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: ex.isNew ? day.color : ex.changed ? "#fbbf24" : "#4a4a62",
                      marginTop: 4,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}>
                      {ex.tag}
                    </div>
                  </div>
                  {ex.isNew && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: day.color,
                      fontSize: 8,
                      fontWeight: 800,
                      color: "#000",
                      padding: "3px 8px",
                      borderBottomLeftRadius: 8,
                      letterSpacing: 0.5,
                    }}>NEW</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHANGES TAB */}
      {activeTab === "changes" && (
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 12,
            padding: "12px 14px",
            marginBottom: 16,
            fontSize: 13,
            color: "#93c5fd",
            lineHeight: 1.5,
          }}>
            <strong>5 days modified</strong> · 1 day unchanged (Monday) · All changes are volume-neutral or additive — no overtraining risk.
          </div>

          {Object.values(changeReasons).map((section, si) => (
            <div key={si} style={{ marginBottom: 14 }}>
              <button
                onClick={() => setExpandedChange(expandedChange === si ? null : si)}
                style={{
                  width: "100%",
                  background: expandedChange === si
                    ? `${section.color}18`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${expandedChange === si ? section.color + "50" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                    {section.title}
                  </div>
                  <div style={{ fontSize: 11, color: section.color, marginTop: 2 }}>
                    {section.items.length} changes
                  </div>
                </div>
                <span style={{ color: section.color, fontSize: 18 }}>
                  {expandedChange === si ? "▲" : "▼"}
                </span>
              </button>

              {expandedChange === si && (
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{
                      background: item.type === "add"
                        ? "rgba(16,185,129,0.06)"
                        : item.type === "remove"
                        ? "rgba(239,68,68,0.06)"
                        : "rgba(251,191,36,0.06)",
                      border: `1px solid ${item.type === "add" ? "rgba(16,185,129,0.2)" : item.type === "remove" ? "rgba(239,68,68,0.2)" : "rgba(251,191,36,0.2)"}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: 5,
                          background: item.type === "add" ? "#10b981" : item.type === "remove" ? "#ef4444" : "#fbbf24",
                          color: "#000",
                          letterSpacing: 0.5,
                        }}>
                          {item.type === "add" ? "+ ADD" : item.type === "remove" ? "− REMOVE" : item.type === "reduce" ? "↓ REDUCE" : "↻ CHANGE"}
                        </span>
                      </div>
                      {item.type === "change" ? (
                        <div style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 600, marginBottom: 4 }}>
                          <span style={{ color: "#ef4444", textDecoration: "line-through" }}>{item.from}</span>
                          <span style={{ color: "#5a5a7a", margin: "0 8px" }}>→</span>
                          <span style={{ color: "#10b981" }}>{item.to}</span>
                        </div>
                      ) : item.type === "reduce" ? (
                        <div style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 600, marginBottom: 4 }}>
                          {item.exercise}: <span style={{ color: "#fbbf24" }}>{item.from} → {item.to}</span>
                        </div>
                      ) : (
                        <div style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 600, marginBottom: 4 }}>
                          {item.exercise}
                          {item.detail && <span style={{ color: "#5a5a7a", fontWeight: 400, fontSize: 11 }}> · {item.detail}</span>}
                        </div>
                      )}
                      <div style={{ fontSize: 12, color: "#8888a8", lineHeight: 1.5 }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* VOLUME TAB */}
      {activeTab === "volume" && (
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 13, color: "#5a5a7a", marginBottom: 16, lineHeight: 1.5 }}>
            Science target: <strong style={{ color: "#9a9ab8" }}>10-20 sets/muscle/week</strong>. Below = estimated weekly totals after optimization.
          </div>
          {muscleVolume.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{ width: 110, fontSize: 13, fontWeight: 500, color: "#c8c8e0" }}>
                {m.muscle}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: m.status === "optimal" ? "80%" : "55%",
                    borderRadius: 3,
                    background: m.status === "optimal"
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                  }} />
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: 90 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: m.status === "optimal" ? "#10b981" : "#f59e0b" }}>
                  {m.weekly}
                </div>
                <div style={{ fontSize: 10, color: "#4a4a62" }}>{m.freq} / week</div>
              </div>
            </div>
          ))}
          <div style={{
            marginTop: 16,
            padding: "12px 14px",
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 10,
            fontSize: 12,
            color: "#6ee7b7",
            lineHeight: 1.6,
          }}>
            🟢 <strong>Optimal</strong> = 12-20 direct sets/week · 🟡 <strong>Good</strong> = 6-12 sets, still in the hypertrophy window. No muscle is being undertrained.
          </div>
        </div>
      )}

      <div style={{ height: 40 }} />
    </div>
  );
}
