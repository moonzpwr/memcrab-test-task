# Matrix Table Test Task (React + TypeScript)

## Overview

This project is a dynamic matrix table built with React and TypeScript.  
It demonstrates handling of derived calculations, UI interactions, and performance-aware rendering without using external UI libraries or state managers.

The application generates a matrix of numeric data and allows users to interact with it through updates, analysis, and visual feedback.

---

## Tech Stack

- React
- TypeScript
- React Context API
- Hooks (useState, useMemo, useCallback, useEffect)
- No external UI libraries
- No Redux / Redux Toolkit
- No CSS-in-JS libraries

---

## Features

### 1. Matrix Generation

The user can generate a matrix with dimensions:

- **M** → number of rows (0–100)
- **N** → number of columns (0–100)

Each cell contains:

```ts
type Cell = {
	id: number; // unique identifier
	amount: number; // random 3-digit value
};
```

### 2. Row Sum Calculation

Each row displays a sum column, calculated as:

- sum of all cell values in the row
- updated automatically when cell values change

### 3. Column Percentile (60th percentile)

The last row of the table shows the 60th percentile per column, calculated using interpolation.

Example:

```ts
[1, 2] → 1.6
[5, 2] → 3.8
```

### 4. Cell Increment

When hovering over a cell:

- the system finds X nearest cells by value
- highlights them visually
- comparison is based on absolute difference between values

Optimization:

- calculations are debounced to avoid excessive recomputation during fast hover movement

### 6. Row Percentage View (Hover on Sum)

When hovering over a row sum:

- each cell temporarily displays percentage contribution to row sum

Formula:

```ts
(cell value / row sum) * 100
```

### 7. Row Heatmap

When row sum is hovered each cell displays a heatmap intensity based on:

```ts
(cell value / max value in row) * 100
```

### 8. Row Management

Users can:

- add a new row (appended to matrix)
- remove an existing row

---

### Architecture Overview

## State Structure

- Matrix state: main source of truth
- UI state:
  - hovered cell
  - hovered row (sum interaction)
- Derived data:
  - row sums
  - column percentiles
  - nearest cells
  - heatmap values
  - row percentages

## Design Principles

- Immutable state updates
- Separation of concerns (state vs derived data vs UI state)
- No derived values stored in state
- Memoized calculations where needed
- Stable identifiers for rows and cells

## Performance Considerations

- Debounced hover-based computations for nearest cell search
- useMemo used for expensive derived calculations
- Stable row and cell IDs prevent unnecessary re-renders
- React.memo applied to row and cell components

## Key Implementation Notes

- Row identity is based on row.id, not array index
- Cell identity is based on unique cell.id
- Visual ordering (zebra striping) is handled via CSS (nth-child)
- Hover-based calculations are separated from immediate UI state

---

### Notes

This project was built as a technical test task focusing on:

- React rendering behavior
- state management without external libraries
- performance-aware UI design
- derived data computation patterns
- clean component architecture
