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
