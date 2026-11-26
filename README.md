# 🧠 CogAT Prep Academy - Free Cognitive Abilities Test Practice

A free, interactive, comprehensive web application built specifically for elementary students preparing for the **Cognitive Abilities Test (CogAT Form 7 and Form 8)**, with special attention to **Grade 2 (CogAT Level 8)**, while generalizable to Kindergarten through Grade 12.

---

## 🌟 Key Features for 2nd Graders (CogAT Level 8)

1. **True-to-Test Facsimile**:
   - **Verbal Battery (Primary)**: Picture Analogies (2x2 matrices), Sentence Completion (proctor read-aloud prompts), and Picture Classification (group rules).
   - **Quantitative Battery**: Number Analogies (numerical/count relations), Number Puzzles (visual balance scales & train cars), and Number Series (bead sequences and jump patterns).
   - **Nonverbal Battery**: Figure Matrices (geometric shape transformations, rotations, and shading), Paper Folding (1–2 folds and hole punch simulation), and Figure Classification (shared geometric rules).

2. **Audio Proctoring ("Read to Me")**:
   - In Grade 2, the actual CogAT proctor reads instructions and questions aloud. Our built-in Web Speech proctor speaks questions with gentle, natural pacing for early elementary children.
   - Includes an auto-read toggle and an on-demand speaker button.

3. **Interactive Paper Folding Demonstration**:
   - Spatial reasoning is historically the toughest section for 7–8 year olds. In Practice Mode, clicking **"Watch Paper Unfold Demo"** visually demonstrates the fold reversing and holes mirroring across the fold crease lines!

4. **Eliminator Tool (Process of Elimination)**:
   - Features the standardized test "Cross Out (X)" tool so children can mark choices they know are wrong and narrow their choices down to the right answer.

5. **Parent Coaching Tips & Cognitive Logic**:
   - Every question includes a full breakdown:
     - The underlying cognitive pattern / rule
     - Why other choices don't fit
     - Exact parent coaching questions to guide the child without giving away the answer.

6. **Practice Mode vs. Timed Exam Simulation**:
   - **Practice Mode**: Untimed, step-by-step explanations, celebration confetti, and instant feedback.
   - **Timed Exam**: 15-minute countdown, standardized bubble answer flow, and a final Stanine (1–9), Age Percentile Rank (APR), and Standard Age Score (SAS) performance report.

7. **Multi-Grade Generalizability**:
   - Switch anytime between Kindergarten (Level 5/6), Grade 1 (Level 7), Grade 2 (Level 8), Grade 3 (Level 9), and upper grades.

---

## 🚀 Free Deployment to GitHub Pages

This app is 100% static and client-side, making it **completely free and permanent to host on GitHub Pages**!

### Quick 3-Step Setup:

1. **Create a new repository on GitHub** (e.g. `cogat-prep`, set to Public).
2. **Push this code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CogAT Prep Academy"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
3. **Turn on GitHub Pages**:
   - In your GitHub repo, click **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
   - GitHub will automatically build and publish your site! In ~60 seconds, your site will be live at:
     `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/`

---

## 💻 Running Locally

The development server is running locally at:
**[http://localhost:5173/](http://localhost:5173/)**

To run it anytime from the terminal:
```bash
# Navigate to the project directory
cd c:\Users\chand\OneDrive\Documents\Apps\Cogat

# Start the interactive web app
npm run dev
```

To create a production build for hosting:
```bash
npm run build
```
The built files will be located in `dist/` and can be hosted anywhere (GitHub Pages, Vercel, Netlify) completely free.

---

## 📂 Project Architecture

```
Cogat/
├── index.html                 # Entry HTML with custom Google fonts
├── package.json               # Dependencies (React, Vite, Tailwind, Lucide, Confetti)
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Kid-friendly color system and typography
├── src/
│   ├── main.jsx               # React bootstrap
│   ├── index.css              # Custom animations and styles
│   ├── App.jsx                # Core test engine and state management
│   ├── data/
│   │   └── cogatData.js       # Comprehensive question bank, scoring formulas & battery norms
│   └── components/
│       ├── Header.jsx         # Grade selector, mode switcher, audio toggle
│       ├── AudioProctor.jsx   # Web Speech API audio proctoring
│       ├── QuestionCard.jsx   # Interactive test card with eliminator tool
│       ├── ExplanationModal.jsx# Cognitive rule & parent coaching breakdown
│       ├── ScoreReport.jsx    # Stanine, Percentile & Battery analytics
│       └── renderers/
│           ├── FigureMatrixRenderer.jsx      # Vector SVG 2x2 spatial matrix
│           ├── PaperFoldingRenderer.jsx      # Step folds, hole punches & unfold demo
│           ├── FigureClassificationRenderer.jsx # 3 stimulus figures group
│           ├── BalanceScaleRenderer.jsx      # Balance scales & train cars
│           ├── PictureCardRenderer.jsx       # Illustrated picture analogies & classification
│           └── NumberSeriesRenderer.jsx      # Visual beads & number sequences
```

---

## 💡 Adding New Questions

To add more questions, open `src/data/cogatData.js` and add an object to the `QUESTIONS` array following the documented schema:
- `grade`: `'2'` (or any grade `'k'`, `'1'`, `'3'`, etc.)
- `batteryId`: `'verbal'`, `'quantitative'`, or `'nonverbal'`
- `subtestId`: e.g. `'paper_folding'`, `'figure_matrices'`, `'number_puzzles'`, etc.
- `rendererType`: `'picture_analogy'`, `'sentence_completion'`, `'figure_matrix'`, `'paper_folding'`, `'balance_puzzle'`, `'number_series'`, etc.
- `explanation`: `rule`, `description`, `whyOthersWrong`, and `parentTip`.
