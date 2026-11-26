const SUBTEST_ORDER = [
  'picture_analogies', 'sentence_completion', 'picture_classification',
  'number_analogies', 'number_puzzles', 'number_series',
  'figure_matrices', 'paper_folding', 'figure_classification'
];
const DIFFICULTY = { easy: 0, medium: 1, hard: 2 };

// Partition the entire practice bank once. Balance extra items between forms,
// and keep easier items earlier without presenting these as calibrated forms.
export function createPracticeTests(questions, count = 6) {
  const pool = questions.filter(q => q.purpose === 'practice' && q.alignment === 'test_format');
  const forms = Array.from({ length: count }, (_, index) => ({
    id: `test_${index + 1}`, name: `Practice Test ${index + 1}`, purpose: 'practice', questionIds: []
  }));
  for (const subtest of SUBTEST_ORDER) {
    const items = pool.filter(q => q.subtestId === subtest)
      .sort((a, b) => DIFFICULTY[a.difficulty] - DIFFICULTY[b.difficulty]);
    const quotas = forms.map(() => Math.floor(items.length / count));
    const bySize = forms.map((form, index) => ({ index, size: form.questionIds.length }))
      .sort((a, b) => a.size - b.size || a.index - b.index);
    for (let i = 0; i < items.length % count; i++) quotas[bySize[i].index]++;
    let start = 0;
    forms.forEach((form, index) => {
      form.questionIds.push(...items.slice(start, start + quotas[index]).map(q => q.id));
      start += quotas[index];
    });
  }
  return forms.map(form => ({ ...form, count: form.questionIds.length, badge: `${form.questionIds.length} questions`,
    description: `${form.questionIds.length} questions across all nine subtests. Work through the tests in order; explanations are available after each answer.` }));
}
