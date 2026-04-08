# Interactive Calendar Component

A polished, interactive React calendar component inspired by the functionality and aesthetics of a physical wall calendar. Created for the Frontend Engineering Challenge.

## Features

- **Wall Calendar Aesthetic**: Displays a visual anchor (dynamic high-quality imagery based on the current season/month) alongside a beautiful monthly grid.
- **Micro-animations & Theme Support**: Contains delightful hover states, month transitions, and full support for Light/Dark modes.
- **Day Range Selector**: Select start and end dates with clear, contiguous highlighting that connects days. Click a start date, then click an end date to finalize a range.
- **Integrated Notes**: A monthly scratchpad. Notes are auto-saved per-month to `localStorage`. An indicator also reminds you of the currently selected date range.
- **Fully Responsive**: Side-by-side flexbox layout on desktop cleanly stacked vertically on mobile devices.

## Tech Stack
- **React (Vite Base)**
- **Vanilla CSS** (No external UI frameworks)
- **date-fns** (Robust date math & logic)
- **lucide-react** (Crisp vector icons)

## How to Run Locally

If you haven't already installed the dependencies, first ensure you have Node.js installed on your machine.

1. Clone this repository and navigate to the project directory:
   ```bash
   cd tuf-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up the local development server:
   ```bash
   npm run dev
   ```
4. Open the running url in your browser (typically `http://localhost:5173`).

## Design Decisions
- **`date-fns` over `Date` constructor**: Handled edge cases (leap years, month padding) much more declaratively.
- **Vanilla CSS Variables**: Made Light/Dark theming trivially easy and performs wonderfully by just swapping CSS variables at the root `:root` and `[data-theme='dark']` levels.
- **Storage Strategy**: The notes synchronize to `localStorage` based on the visible month (`yyyy-MM`). This creates a frictionless "jot it down on the calendar" workflow that physical calendar users are accustomed to.
