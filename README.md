# C-Means Algorithm Calculator

An interactive Vite + React + TypeScript experience for exploring both crisp and fuzzy C-Means clustering in real time.

## How it works

The `useCMeans` hook orchestrates the flow: it keeps track of points, centroids, and the selected algorithm (`fuzzy` by default), derives distance and membership matrices, recomputes centroids, and exposes the aggregated cost function. Each iteration replaces the centroids and updates the matrices and charts that the UI renders.

## Key features

- Guided input: add exact or randomly generated Points and Centroids through the InputPoint component.
- Tabular views: PointTable lists each coordinate with four decimals, while MatrixTable shows the distance and membership matrices for every iteration.
- Visual feedback: DataChart draws both datasets using Chart.js to help you see clusters forming.
- Control buttons: Iterate advances the clustering algorithm, Reset clears the state, and the cost function is shown live for convergence monitoring.

## Algorithms provided

- CMeans: the crisp variant, where each point belongs to the closest centroid, centroids update via simple means, and the membership matrix is binary.
- fuzzyCMeans: the fuzzy variant with a soft membership matrix ($m=2$), weighted centroid updates, and a cost function that sums squared distances scaled by membership.
- useCMeans: switches between the two implementations based on configuration and keeps the shared state of points and centroids.

## Project structure

- src/components: reusable UI pieces (InputPoint, DataChart, MatrixTable, PointTable).
- src/utils: clustering logic (CMeans.ts, FuzzyCmeans.ts) and the shared hook (useCmeans.ts).
- src/App.tsx: main layout with responsive sections, action buttons, and composed components.

## Tech stack

- Vite + React 18 + TypeScript
- Ant Design for inputs, tables, and notifications
- Chart.js + react-chartjs-2 for scatter plots
- Tailwind CSS for responsive layout control

## Installation

1. Clone the repo and enter the directory:
   ```bash
   git clone https://github.com/username/CMeansTypescript.git
   cd CMeansTypescript
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the project

1. Start the dev server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173 in your browser.
2. Build for production:
   ```bash
   npm run build
   ```
3. Lint the codebase:
   ```bash
   npm run lint
   ```

## Usage

1. Add points or centroids either by manually typing coordinates or by generating random ones.
2. Click Iterate to recompute centroids based on the selected algorithm and observe updated matrices and graphs.
3. Check the displayed cost function to evaluate convergence.
4. Hit Reset to clear all points and centroids and start over.

## Suggested next steps

1. Add a UI control to toggle between the crisp and fuzzy variants.
2. Enable editing or removing previously added points or centroids.
3. Persist or export iteration data for further analysis.
