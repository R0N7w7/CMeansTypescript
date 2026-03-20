# C-Means Calculator (React + TypeScript)

Interactive web application to explore both **crisp C-Means** and **Fuzzy C-Means** clustering in 2D.

It lets you add points and centroids, iterate the algorithm, visualize cluster assignment, and inspect distance/membership matrices and cost function updates in real time.

## Table of contents

1. [Purpose](#purpose)
2. [Tech stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project structure](#project-structure)
5. [Execution flow](#execution-flow)
6. [Implemented algorithms](#implemented-algorithms)
7. [How to use the app](#how-to-use-the-app)
8. [Setup and scripts](#setup-and-scripts)
9. [Design decisions](#design-decisions)
10. [Current limitations](#current-limitations)
11. [Suggested roadmap](#suggested-roadmap)

## Purpose

This project is focused on learning and visual exploration of clustering:

- Compare hard assignment (crisp) vs soft assignment (fuzzy).
- Observe how centroids move across iterations.
- Understand cost function evolution.

## Tech stack

- **Frontend:** React 18 + TypeScript + Vite.
- **UI:** Ant Design + Tailwind CSS.
- **Charts:** Chart.js + react-chartjs-2.
- **Code quality:** ESLint + TypeScript strict mode.

## Architecture

The app follows a clear separation between presentation and numeric logic:

1. **UI layer (components):** receives user input and renders tables/charts.
2. **State and orchestration layer (hook):** centralizes points, centroids, and iteration flow.
3. **Algorithm layer (utils):** computes distances, memberships, centroids, and cost.

### Conceptual diagram

```text
UI (App + components)
  -> useCMeans (state + algorithm selection)
    -> CMeans / fuzzyCMeans (math computation)
      -> outputs: matrices, new centroids, cost
    -> UI re-renders with updated outputs
```

## Project structure

```text
.
|-- index.html
|-- package.json
|-- vite.config.ts
|-- tailwind.config.js
|-- src
|   |-- App.tsx                 # main UI composition
|   |-- main.tsx                # React bootstrap
|   |-- index.css               # Tailwind directives
|   |-- vite-env.d.ts           # global types (Point)
|   |-- components
|   |   |-- InputPoint.tsx      # manual/random point and centroid input
|   |   |-- PointTable.tsx      # points/centroids table
|   |   |-- MatrixTable.tsx     # distance/membership matrix table
|   |   |-- DataChart.tsx       # scatter plot with dominant-cluster coloring
|   |-- utils
|   |   |-- CMeans.ts           # crisp C-Means algorithm
|   |   |-- FuzzyCmeans.ts      # Fuzzy C-Means algorithm
|   |   |-- useCmeans.ts        # orchestration/state hook
```

## Execution flow

1. User adds points and centroids from the UI.
2. The `useCMeans` hook recomputes derived values through `useMemo` when state changes.
3. Depending on the selected algorithm, it runs `CMeans` or `fuzzyCMeans`.
4. The following outputs are produced:
   - distance matrix,
   - membership matrix,
   - new centroids,
   - cost values and total cost.
5. When clicking **Iterate**, centroids are replaced by `newCentroids`.
6. UI immediately reflects updated tables, chart, and cost.

## Implemented algorithms

### 1) Crisp C-Means (CMeans.ts)

- Distance: Euclidean in 2D.
- Membership: binary (each point belongs to the closest centroid).
- Centroid update: arithmetic mean of assigned points.
- Cost: sum of distances for active assignments.

### 2) Fuzzy C-Means (FuzzyCmeans.ts)

- Fixed fuzzification parameter: $m = 2$.
- Soft membership:

$$
u_{ij} = \frac{1}{\sum_{k=1}^{c}\left(\frac{d_{ij}}{d_{kj}}\right)^{\frac{2}{m-1}}}
$$

- Centroid update weighted by $u_{ij}^m$.
- Fuzzy objective function:

$$
J = \sum_{i=1}^{c}\sum_{j=1}^{n} u_{ij}^m\, d_{ij}^2
$$

## How to use the app

1. Add points in **Add Point** (manual or random).
2. Add centroids in **Add Centroid** (manual or random).
3. Observe distribution in the scatter chart.
4. Click **Iterate** to run one algorithm step.
5. Repeat until centroids/cost stabilize.
6. Use **Reset** to start over.

## Setup and scripts

### Requirements

- Node.js 18 or newer.
- npm 9 or newer.

### Install

```bash
npm install
```

### Available scripts

```bash
npm run dev      # Vite development server
npm run build    # TypeScript check + production build
npm run preview  # preview production build
npm run lint     # ESLint static analysis
```

By default, development server runs at `http://localhost:5173`.

## Design decisions

- **Single domain hook (`useCMeans`)** to centralize state and iteration rules.
- **Pure utility functions in `utils`** to keep math logic testable and React-agnostic.
- **Dominant-cluster color mapping in chart** to improve fuzzy result readability.
- **Matrix tables** to make each iteration traceable.

## Current limitations

- UI starts in `fuzzy` mode by default and does not yet expose an algorithm selector.
- No persistence or export for experiment sessions.
- No per-point or per-centroid edit/delete actions (only global reset).
- No unit/integration test suite yet.

## Suggested roadmap

1. Add a UI selector to switch between `crisp` and `fuzzy`.
2. Expose fuzzification parameter $m$ in the UI.
3. Add iteration history (centroids and cost per step).
4. Export data and matrices to CSV/JSON.
5. Add tests for `utils` and `useCMeans`.
