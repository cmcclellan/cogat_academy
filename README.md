# CogAT Prep Academy

An independent Grade 2 reasoning-practice app built with React and Vite. The supported experience is **Grade 2, CogAT Level 8**; there is no grade selector or claim of validated coverage for other grades.

The app offers practice samples rather than standardized CogAT test forms. It is not affiliated with or endorsed by Riverside Insights.

## Practice content

The curated bank contains **310 Grade 2 activities**: **198 Level 8 format practice questions**, **66 reserved format-check questions**, and **46 separate enrichment activities** across the nine subtests:

| Battery | Subtests |
| --- | --- |
| Verbal | Picture Analogies, Sentence Completion, Picture Classification |
| Quantitative | Number Analogies, Number Puzzles, Number Series |
| Nonverbal | Figure Matrices, Paper Folding, Figure Classification |

**Practice mode offers six numbered practice tests, each with 33 questions covering all nine subtests**: nine verbal, nine quantitative, and fifteen nonverbal questions. Together they use all 198 format-practice questions exactly once. Questions are grouped by subtest, with easier author-rated items placed in earlier tests. The forms are not psychometrically calibrated or equated.

**Assessment mode offers three numbered assessments**, each with 22 reserved format questions: six verbal, six quantitative, and ten nonverbal. These 66 questions are excluded from routine practice and enrichment. Entering assessment mode starts at Assessment 1. Use a different assessment for a later attempt; the app does not track lifetime exposure across page refreshes.

The main selector shows only the tests for the selected mode. Battery filters, Skill builders, and Generated practice are under the collapsed **Practice options** section. The previous full-bank and difficulty-collection choices are replaced by the six practice tests; no questions were removed.

### Level 8 format and enrichment

The alignment uses Riverside's [level-specific test descriptions](https://onlinehelp.riversideinsights.com/Help/DM/mergedProjects/DM_Assessments_Help/DataManager_Test_Assessment/Test_and_Score_Descriptions/CogAT_Test_Descriptions.htm) and [Forms 7/8 online administration guide, printed page 4](https://info.riversideinsights.com/hubfs/SC%20DOE/Online%20Testing/CogAT%20DAforOnlineTesting%20L5-8_v10.pdf). Level 8 Number Puzzles use a missing-number equation; object trains are described for Levels 5/6 and 7.

| Area | Level 8 format collections | Separate enrichment |
| --- | --- | --- |
| Number Puzzles | 24 missing-number equations with addition/subtraction, unknown operands/results, and equal expressions | 24 object-train activities |
| Number Analogies | One complete quantity pair and one incomplete pair in a 2x2 matrix | 18 activities with two complete example pairs |
| Number Series | Select the next bead group | Four beginning/middle-gap activities |
| Figure Matrices and Classification | Existing figure transformations plus 24 arrangement questions involving movement, reflection, exchanges, relative positions, and multiple figures | Generated spatial skill practice |
| Paper Folding | Existing circular punches plus 24 cutout activities: triangles, squares, edge notches, crease joins, multiple punches, and mixed modifications | Generated fold practice |

**Level 8 format** means an independently authored activity uses the published task and response format. It does not mean Riverside validated the item, that difficulty matches an official form, or that every possible reasoning pattern is covered. The 46 scaffold activities remain available under **Practice options ? Skill builders**; they cannot enter assessments. Generated activities are also labeled enrichment. The session builder enforces the separation in addition to the UI labels.

New questions include reasoning-skill metadata, explanations, and feedback tied to the selected distractor's likely misconception. Fold diagrams, cutout choices, and unfolding demonstrations are built from the same geometry. Cut regions are clipped to the folded paper and reflected in reverse fold order; joined openings are shown as one removed region rather than separate outlined pieces.

Question prompts and read-aloud scripts give directions without disclosing the reasoning rule. Answer choices do not display category or function captions that reveal the solution. Answer positions are balanced when a session is created and remain stable during that session.

Level 8 Number Puzzles display equations and numeral answer choices. Quantity analogies and series retain pictorial quantities. Object trains remain available as enrichment. Code-native illustrations replace pictures that previously depicted a different object. Paper-fold diagrams, choices, and unfolding demonstrations use a shared geometric model, including punches centered on a crease or the intersection of folds.

Generated enrichment covers six quantitative and nonverbal subtests only. It does not generate verbal questions, provide calibrated difficulty, or constitute a readiness assessment. Selecting verbal generated practice shows an availability message and a route back to curated questions; the app does not silently substitute another battery.

## Student modes

**Practice** gives immediate feedback after an answer. The student can open the explanation and parent coaching tip. For paper folding, the demonstration becomes available after answering.

**Assessment (untimed)** uses a fixed curated question set. An introduction explains the session before it begins. Reserved assessments use their own fixed questions, separate from the six feedback-based practice tests. Students select an answer and use Next themselves; they may revisit questions and revise choices before submission. The app shows answered-question counts without revealing correctness, coaching, or unfolding demonstrations. Enrichment and generated activities are excluded from this mode. Selecting an enrichment collection switches to practice mode.

Finishing opens a submission check that lists unanswered questions and offers a route back to them. Submitting locks the answers. Students can then review every question, including unanswered questions, and read its explanation without changing the recorded results. Changing session settings after answering requires confirmation before clearing the current session.

Grade 2 Level 8 subtests are untimed; the app does not apply an artificial countdown. See Riverside's [administration guidance](https://info.riversideinsights.com/datamanager-onlinehelp/which-grade-levels-are-self-guided-and-which-need-to-be-proctor-led-for-the-iowa-assessments-and-cogat). Schools determine their actual administration and configuration.

## Understanding results

The results show correct answers, answered and unanswered counts, and accuracy **on answered questions**. Battery summaries distinguish an unattempted battery from an incorrect answer.

The app does not calculate Standard Age Scores, stanines, national percentile ranks, gifted labels, or eligibility predictions. Official CogAT reporting uses standardized score conversions and norms; see Riverside's [score descriptions and conversions](https://onlinehelp.riversideinsights.com/Help/Elevate/Topics/015_Interpreting_Scores/Types_of_Scores.htm).

Independent checks contain only a small sample of questions per subtest, with extra spatial and paper-folding items. Results describe only the current session and cannot establish mastery or predict an official score. Repeated questions and practice with immediate feedback also limit what can be inferred about independent performance.

## Running locally

```sh
npm install
npm run dev
```

Vite prints the local preview address. On Windows PowerShell systems that block `npm.ps1`, use `npm.cmd` for these commands.

```sh
npm test
npm run build
npm run preview
```

Regression tests use the Node.js built-in test runner. The production build is written to `dist/` and can be hosted as a static site. The repository's GitHub Actions workflow builds and deploys to GitHub Pages when configured for that destination.

## Main implementation files

- `src/App.jsx`: session configuration, answer state, submission, and locked review.
- `src/data/cogatData.js`: original Grade 2 content, combined bank, and question-set metadata.
- `src/data/verbalExpansion.js`: 54 new verbal questions.
- `src/data/quantitativeExpansion.js`: 54 new quantitative questions.
- `src/data/nonverbalExpansion.js`: 54 new nonverbal questions.
- `src/utils/practiceTests.js`: deterministic partitioning into six nonoverlapping practice tests.
- `src/utils/session.js`: constrained session construction, answer placement, and practice summaries.
- `src/utils/cogatGenerators.js`: generated quantitative and nonverbal practice.
- `src/data/quantitativeAlignment.js`: equation and 2x2/next-series replacements plus enrichment classification.
- `src/data/spatialAlignment.js`: positional and multiple-figure spatial questions.
- `src/data/paperCuttingAlignment.js`: cutout, notch, and multiple-modification questions.
- `src/utils/spatial.js`: scene transformations and geometry.
- `src/utils/paperGeometry.js`: fold, clipping, and cutout geometry shared by diagrams and solutions.
- `src/components/QuestionCard.jsx`: answer interaction and mode-specific feedback.
- `src/components/ScoreReport.jsx`: descriptive practice results.
- `src/components/ExplanationModal.jsx`: keyboard-accessible explanation dialog.
- `src/components/renderers/`: quantity, picture, figure, train, and paper-fold displays.

## Current limits

Progress is held in memory for the current page session; refreshing clears it. This release does not add saved student profiles, adaptive instruction, longitudinal mastery tracking, or psychometrically equated assessment forms. Generated questions may repeat reasoning templates. Usability testing with students and educator review remain necessary before making stronger learning-outcome claims.

CogAT is a registered trademark of Riverside Insights.
