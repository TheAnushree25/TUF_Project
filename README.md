📅 Interactive Calendar Component

This is a clean and interactive calendar component built using React, inspired by the look and feel of a physical wall calendar. The goal was to combine aesthetics with functionality while keeping the experience smooth and intuitive.

✨ Features
🎨 Beautiful Calendar UI

The calendar includes a dynamic visual banner that changes based on the current month/season, giving it a real wall-calendar vibe alongside a clean monthly grid.

⚡ Smooth Interactions & Theme Support
Subtle hover effects and transitions between months
Supports both Light and Dark mode for better usability
📆 Date Range Selection

You can:

Click once to select a start date
Click again to select an end date
The range is clearly highlighted in a connected way
📝 Built-in Notes

Each month comes with a small scratchpad:

Notes are automatically saved using localStorage
You don’t lose anything on refresh
Also shows the currently selected date range
📱 Responsive Design
Works smoothly on all screen sizes
Desktop → side-by-side layout
Mobile → neatly stacked layout
🛠️ Tech Stack
React (Vite)
Vanilla CSS (no UI libraries used)
date-fns (for handling dates easily)
lucide-react (for clean icons)
🚀 How to Run Locally

Make sure you have Node.js installed.

# Go to project folder
cd tuf-project

# Install dependencies
npm install

# Start development server
npm run dev

Then open:

http://localhost:5173
🤔 Design Choices
📌 Why date-fns?

Handling dates with plain JavaScript can get messy (leap years, month boundaries, etc.).
date-fns made everything simpler and more reliable.

🎨 Why Vanilla CSS?

Using CSS variables made it really easy to implement light/dark themes without extra libraries.
It also keeps performance fast and the codebase lightweight.

💾 Notes Storage Approach

Notes are saved based on the current month (yyyy-MM) in localStorage.

This mimics how people use physical calendars —
👉 you write notes for a specific month and come back to them later.

💡 Final Thoughts

This project focuses on:

Clean UI/UX
Thoughtful interactions
Practical features inspired by real-world usage