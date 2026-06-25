// data/mockData.js
// This mirrors the exact daily structure from the notebook:
// 8am -> 10am -> 12pm -> 3pm -> 5pm -> 6pm -> 8pm -> 10pm
// In production this comes from local storage + a scheduling engine.
// For now it's static so the UI can be built and tested end to end.

export const todayCheckpoints = [
  {
    id: 'morning',
    time: '8 AM',
    title: 'Morning walk',
    icon: '🌅',
    status: 'done', // done | pending | now | missed
    type: 'activity',
  },
  {
    id: 'breakfast',
    time: '10 AM',
    title: 'Breakfast logged',
    icon: '🍳',
    status: 'done',
    type: 'meal',
    loggedValue: 'Poha + chai',
  },
  {
    id: 'lunch',
    time: '12 PM',
    title: 'Lunch check-in',
    icon: '🍽️',
    status: 'now',
    type: 'meal',
  },
  {
    id: 'afternoon_activity',
    time: '3 PM',
    title: 'No activity logged',
    icon: '🚶',
    status: 'pending',
    type: 'activity',
  },
  {
    id: 'chai',
    time: '5 PM',
    title: 'Chai sugar log',
    icon: '☕',
    status: 'pending',
    type: 'habit',
  },
  {
    id: 'dinner',
    time: '8 PM',
    title: 'Dinner + post-meal walk',
    icon: '🌙',
    status: 'pending',
    type: 'meal',
  },
  {
    id: 'sleep',
    time: '10 PM',
    title: 'Sleep tracking starts',
    icon: '😴',
    status: 'pending',
    type: 'sleep',
  },
];

export const quickStats = [
  { id: 'weight', label: 'Weight', value: '86.2 kg', delta: '↓ 3.8 kg', good: true },
  { id: 'glucose', label: 'Glucose (fasting)', value: '128', delta: '↓ 14 pts', good: true },
];

export const streak = 12;

// The lunch check-in question + options — tap-to-answer, not free text.
export const lunchCheckin = {
  id: 'lunch',
  tag: 'Lunch · 12:00 PM',
  question: 'Lunch mein kya tha?',
  options: [
    { id: 'dal_roti', label: 'Dal, roti, sabzi' },
    { id: 'rice', label: 'Rice based meal' },
    { id: 'outside', label: 'Bahar ka khana' },
    { id: 'not_yet', label: 'Abhi nahi khaya' },
  ],
};

// Feedback engine output — in production this is computed from the
// selected option + her recent history (last 3 lunches, fiber pattern, etc.)
// Keyed by option id so the Feedback screen can look up a response.
export const feedbackByOption = {
  dal_roti: {
    emoji: '👍',
    headline: 'Good plate. Dal + sabzi covers your fiber.',
    detail: 'Roti portion was higher than your last 3 lunches.',
    dataChips: [
      { label: 'Fiber', value: 'Good' },
      { label: 'Roti qty', value: '3 — high' },
      { label: 'Salad first', value: 'No' },
    ],
    nextTip: 'Next time: salad ya kachumber pehle khayein, roti 2 tak rakhein.',
  },
  rice: {
    emoji: '⚠️',
    headline: 'Rice meals spike faster — pair it with dal next time.',
    detail: 'No fiber-first item logged today.',
    dataChips: [
      { label: 'Fiber', value: 'Low' },
      { label: 'Carb load', value: 'High' },
      { label: 'Salad first', value: 'No' },
    ],
    nextTip: 'Try a small bowl of dal or curd before rice — slows the sugar spike.',
  },
  outside: {
    emoji: '🔎',
    headline: 'Noted. Outside food is harder to track — that\'s okay.',
    detail: 'No fiber or portion data available for this meal.',
    dataChips: [
      { label: 'Fiber', value: 'Unknown' },
      { label: 'Logged', value: 'Yes' },
      { label: 'Salad first', value: '—' },
    ],
    nextTip: 'A short walk after this meal will help more than usual today.',
  },
  not_yet: {
    emoji: '⏰',
    headline: 'No problem — we\'ll check back in 30 minutes.',
    detail: 'Long gaps between meals can cause bigger spikes later.',
    dataChips: [
      { label: 'Last meal', value: '4h ago' },
      { label: 'Status', value: 'Snoozed' },
      { label: 'Reminder', value: '30 min' },
    ],
    nextTip: 'Try not to skip — even a small snack now keeps things steady.',
  },
};

// Weekly monitor data
export const weeklyMetrics = [
  { id: 'weight', icon: '⚖️', label: 'Weight', value: '86.2 kg', trend: '↓ 0.6 kg', good: true, lastLogged: 'logged Sun' },
  { id: 'glucose', icon: '🩸', label: 'Fasting glucose', value: '128 mg/dL', trend: '↓ 6 pts', good: true, lastLogged: 'logged today' },
  { id: 'bp', icon: '💗', label: 'Blood pressure', value: '—', trend: 'Due today', good: false, lastLogged: 'last: 5 days ago' },
  { id: 'sleep', icon: '😴', label: 'Sleep avg', value: '6h 40m', trend: 'Below 7h target', good: false, lastLogged: 'auto-tracked' },
];

export const adherence = [
  { id: 'breakfast', label: 'Breakfast', pct: 86 },
  { id: 'lunch', label: 'Lunch', pct: 100 },
  { id: 'dinner_walk', label: 'Dinner walk', pct: 57 },
  { id: 'chai', label: 'Chai log', pct: 71 },
];

export const weekActivity = [
  { day: 'M', state: 'full' },
  { day: 'T', state: 'full' },
  { day: 'W', state: 'partial' },
  { day: 'T', state: 'full' },
  { day: 'F', state: 'full' },
  { day: 'S', state: 'none' },
  { day: 'S', state: 'partial' },
];
