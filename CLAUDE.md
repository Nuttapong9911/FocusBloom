# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type-check with svelte-check + TypeScript
npm run check:watch  # Type-check in watch mode
npm run lint         # Run ESLint
```

There is no test suite. Use `npm run check` to validate types.

## Architecture

**FocusBloom** is a gamified Pomodoro timer app built with SvelteKit 5, Tailwind CSS 4, and TypeScript. The root redirect (`/`) goes to `/pomodoro`.

### Core Loop

A full Pomodoro cycle has 4 steps: `working_1` → `smallBreak` → `working_2` → `longBreak`. Completing the cycle generates 4 random fruits in the Farm. Users drag fruits into Baskets; combining 3 matching fruits upgrades them (level 1→2→3). The Sell Basket auto-converts to coins at the start of the next cycle.

### State Management

Three layers:

1. **Component-local state** (Svelte 5 `$state`/`$derived`/`$effect` runes) — timer value, status, and current step live in `src/routes/pomodoro/+page.svelte` and are passed down as props.
2. **Global state** (`src/global/state.svelte.ts`) — `coins` and `sellBasketStates` are globally reactive and synced to `localStorage` immediately on change.
3. **Callback registry** (`src/global/index.ts`) — a `Map` used by the drag-and-drop system so dropzones can notify draggable sources on drop completion.

### Drag & Drop

Custom Svelte actions in `src/lib/drag_and_drop/`:
- `draggable.ts` — attaches drag behavior and serializes `Fruit` data into `dataTransfer`
- `dropzone.ts` — handles drop events, calls registered callbacks via `callBackRegistry`
- `drag_event_parser.ts` — serializes/deserializes `Fruit` objects to/from `DragEvent.dataTransfer`

### Key Types and Constants

- Domain types are in `src/types/pomodoro.ts` — `Fruit`, `PomodoroStep`, `TimerStatus`, `PomodoroStepObj`
- Game config is in `src/constants/pomodoro.ts` — step durations, fruit sprites (10 emoji types × 3 levels), basket capacity (4), sell prices (1/5/10 coins per level), upgrade threshold (3 matching fruits)

### Persistence

The `Shop` component loads all basket state from `localStorage` on mount. Basket contents are stored per-key (`basket-1` through `basket-4`). Coins are stored as a plain string under `coins`.

### Layout

Root layout (`src/routes/+layout.svelte`) renders a 270px left Navbar sidebar alongside the main content area with a cream background. The `/pomodoro` page is a 50/50 split between the Pomodoro timer and Farm components, with the Shop taking the bottom 20%.
