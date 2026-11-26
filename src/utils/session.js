import { QUESTIONS, SESSION_SETS } from '../data/cogatData.js';
import { generateProceduralQuestion } from './cogatGenerators.js';

export const GENERATED_SUBTESTS = {
  quantitative: ['number_analogies', 'number_puzzles', 'number_series'],
  nonverbal: ['figure_matrices', 'paper_folding', 'figure_classification']
};

// Balance keyed positions without changing question order or mutating the bank.
export function arrangeAnswers(questions, offset = 0) {
  const positions = questions.map((_, i) => (i + offset) % 4);
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return questions.map((question, index) => {
    const correct = question.options[question.correctAnswer];
    const options = question.options.filter((_, i) => i !== question.correctAnswer);
    const correctAnswer = positions[index] % question.options.length;
    options.splice(correctAnswer, 0, correct);
    return { ...question, correctAnswer, options: options.map((o, i) => ({ ...o, id: String.fromCharCode(65 + i) })) };
  });
}

export function buildSession({ testId = 'test_1', batteryId = 'all', mode = 'practice' }, offset = 0) {
  if (testId.startsWith('check_') && mode !== 'assessment') {
    throw new Error('Reserved independent checks require assessment mode.');
  }
  if (testId === 'enrichment' && mode === 'assessment') {
    throw new Error('Enrichment is excluded from assessments.');
  }
  if (testId === 'infinite') {
    if (mode === 'assessment') throw new Error('Assessments require a finite curated set.');
    return generatePracticeBatch(batteryId, 10, offset);
  }
  const form = SESSION_SETS.find(set => set.id === testId);
  const byId = new Map(QUESTIONS.map(q => [q.id, q]));
  const candidates = testId === 'enrichment' ? QUESTIONS.filter(q => q.alignment === 'enrichment')
    : (form?.questionIds || []).map(id => byId.get(id));
  return arrangeAnswers(candidates.filter(q => q && q.grade === '2'
    && (testId === 'enrichment' || q.alignment === 'test_format')
    && (batteryId === 'all' || q.batteryId === batteryId)), offset);
}

export function generatePracticeBatch(batteryId, count = 5, offset = 0) {
  const subtests = batteryId === 'all' ? Object.values(GENERATED_SUBTESTS).flat() : GENERATED_SUBTESTS[batteryId];
  if (!subtests) return [];
  return arrangeAnswers(Array.from({ length: count }, (_, i) =>
    ({ ...generateProceduralQuestion(subtests[(i + offset) % subtests.length], '2'), alignment: 'enrichment', purpose: 'practice',
      alignmentReason: 'Generated skill practice, excluded from Level 8 assessments.' })), offset);
}

export function summarizeSession(questions, answers) {
  const result = { correct: 0, answered: 0, total: questions.length, batteries: {} };
  for (const q of questions) {
    const battery = result.batteries[q.batteryId] ||= { correct: 0, answered: 0, total: 0 };
    battery.total++;
    if (Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] < q.options.length) {
      result.answered++; battery.answered++;
      if (answers[q.id] === q.correctAnswer) { result.correct++; battery.correct++; }
    }
  }
  return result;
}
