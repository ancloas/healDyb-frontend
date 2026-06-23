# Diabetes Companion — Core Loop (React Native / Expo)

This is the core 3-screen loop from the wireframe: **Home → Check-in → Feedback**.
Built with mock/local data — no backend needed to run and click through it.

## What's in here

```
App.js                      Navigation stack (Home, Checkin modal, Feedback modal)
theme.js                    Colors, spacing, type — single source of truth
data/mockData.js            All static data: today's checkpoints, lunch options,
                             feedback responses keyed by option, weekly metrics
components/
  StatusBadge.js            Small "Done / Now / Upcoming / Missed" pill
  CheckpointRow.js           One row in the daily timeline
screens/
  HomeScreen.js              Daily anchor: next action + checkpoint timeline + stats
  CheckinScreen.js           Tap-to-answer lunch check-in (no typing, no chat)
  FeedbackScreen.js          Instant response after logging — specific, data-backed
```

## Run it

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Expo:
   ```bash
   npx expo start
   ```
3. Scan the QR code with **Expo Go** on an Android phone, or press `a` to open
   an Android emulator if you have Android Studio set up.

## How the core loop works right now

1. **Home** shows the "Next check-in" card (Lunch · 12 PM) plus the full daily
   timeline from your notebook (8am → 10pm).
2. Tapping **"Log now"** on the lunch card (or tapping the Lunch row) opens
   **Check-in** as a bottom-sheet modal — 4 tap options, no free text.
3. Confirming an option routes to **Feedback** — a response that's specific
   to what she selected: what was good, what to watch, one tip for next time.
4. **"Got it"** pops back to Home.

## What's mock vs. what's real

- **Mock right now:** all data lives in `data/mockData.js`. Selecting an
  option doesn't persist anywhere — closing the app resets state.
- **Real/working:** navigation, the tap-to-select UI, the modal presentation
  pattern, and the feedback lookup logic (`feedbackByOption[optionId]`) —
  this is the actual shape your AI/backend response would plug into later.

## Next steps when you're ready

- Swap `data/mockData.js` reads for local storage (AsyncStorage) so state
  persists across app restarts.
- Replace the static `feedbackByOption` lookup with a real API call (Claude
  or your own backend) that takes her selected option + recent history and
  returns the same shape: `{ emoji, headline, detail, dataChips, nextTip }`.
- Wire up `expo-notifications` for the actual 8am/10am/12pm/.../10pm local
  push triggers from the notebook plan — each one deep-links into the
  relevant Check-in screen.
- Add the remaining screens from the wireframe (Log, Monitor) following the
  same theme.js + mockData.js pattern.
