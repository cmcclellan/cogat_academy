# Critical Review and Improvement Plan for CogAT Application

## Goal Description

Perform a comprehensive review of the existing React/Vite CogAT practice application, identify areas for technical, usability, and maintainability improvement, and implement a prioritized set of enhancements. The changes should improve code quality, performance, accessibility, developer experience, and test coverage while preserving existing functionality.

---

## User Review Required

> [!IMPORTANT]
> The proposed changes include **breaking updates** to component props and state handling that will require adjustments to any external code or documentation that imports these components.
>
> - Conversion of some components to **TypeScript** will change file extensions (`.jsx` → `.tsx`).
> - Introduction of a **global context** for shared state (grade, test selection, timer) will modify the way child components receive props.
> - Refactoring of navigation logic may affect custom CSS classes used in the UI.
> 
> Please confirm that you are comfortable with these breaking changes, or let us know if a more incremental approach is preferred.

---

## Open Questions

> [!WARN]
> - **Testing Framework Preference:** Do you prefer using **Vitest** (the Vite ecosystem default) or **Jest** for unit/integration tests?
> - **TypeScript Adoption:** Should we convert the entire codebase to TypeScript now, or adopt a gradual `.tsx` conversion for new/modified files only?
> - **Styling Strategy:** The project currently uses Tailwind CSS. Would you like to introduce **CSS modules** for component‑scoped styles, or keep Tailwind utilities exclusively?
> - **Accessibility Enhancements:** Are there any specific accessibility compliance targets (e.g., WCAG AA) you want to meet?
> - **Deployment Pipeline:** Do you want a CI workflow (GitHub Actions) added for linting, type‑checking, and test execution?

---

## Proposed Changes

### 1. Project Configuration & Tooling
- **Add ESLint & Prettier** with React, JSX, and Tailwind plugins.
- **Introduce `vite-plugin-checker`** for real‑time TypeScript/ESLint errors during development.
- **Add a GitHub Actions workflow** (`ci.yml`) to run lint, type‑check, and tests on each push.
- **Create a `vite.config.ts`** (rename from `.js`) to enable TypeScript support.

### 2. Codebase Refactor
- **Introduce a global context (`AppContext`)** to hold selected grade, test, battery, mode, and timer state. This removes prop‑drilling from `App.jsx` to child components.
- **Convert core components to functional hooks** using `useCallback` and `useMemo` where appropriate to prevent unnecessary re‑renders.
- **Add PropTypes (or TypeScript interfaces)** for all component props to improve developer ergonomics.
- **Extract constant data (`GRADE_LEVELS`, `PRACTICE_TESTS`, etc.)** into a dedicated `constants/` directory.
- **Rename `.jsx` files to `.tsx`** (or `.jsx` if TypeScript is not adopted) and update imports accordingly.
- **Create an `ErrorBoundary` component** to gracefully catch rendering errors.

### 3. Accessibility & UX Enhements
- Ensure all interactive elements have **ARIA labels** and proper keyboard focus handling.
- Add **skip‑navigation link** at the top of the page.
- Provide **screen‑reader announcements** for timer updates and score results.
- Refine color contrast in Tailwind classes to meet WCAG AA.

### 4. Performance Improvements
- Debounce the timer update to avoid state churn.
- Lazy‑load the `ExplanationModal` and `ScoreReport` using React `lazy`/`Suspense`.
- Cache procedural question generation results where possible.

### 5. Testing
- Write **unit tests** for utility functions (`cogatGenerators`, scoring logic).
- Add **component tests** for `Header`, `QuestionCard`, and `ScoreReport` using React Testing Library.
- Include **integration test** for the full flow (select grade → answer questions → view score).

### 6. Documentation
- Update `README.md` with setup instructions for TypeScript, linting, and testing.
- Add a **contributing guide** (`CONTRIBUTING.md`) outlining code style and PR process.

---

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure ESLint passes.
- Execute `npm run typecheck` (if TypeScript enabled) to verify no type errors.
- Run `npm test` (Vitest/Jest) and confirm ≥ 80% coverage.

### Manual Verification
- Spin up the dev server (`npm run dev`) and manually test:
  - Grade/Test/Battery selection persists across navigation.
  - Timer counts down correctly and announces expiration.
  - Accessibility checks with Chrome Lighthouse (score ≥ 90 for accessibility).
  - Lazy‑loaded components render without flash of unstyled content.

---

**Implementation will proceed after your approval of the above plan and clarification of the open questions.**
