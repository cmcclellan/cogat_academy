import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import ExplanationModal from './components/ExplanationModal';
import ScoreReport from './components/ScoreReport';
import { QUESTIONS, GRADE_LEVELS, BATTERIES, PRACTICE_TESTS } from './data/cogatData';
import { generateProceduralQuestion } from './utils/cogatGenerators';
import { ArrowLeft, ArrowRight, Award, RotateCcw, Zap } from 'lucide-react';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState('2'); // Default: Grade 2 (Level 8)
  const [selectedTest, setSelectedTest] = useState('all_bank'); // Default: All Questions (Full Bank)
  const [selectedBattery, setSelectedBattery] = useState('all');
  const [testMode, setTestMode] = useState('practice');
  const [autoReadAudio, setAutoReadAudio] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showScoreReport, setShowScoreReport] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Procedural dynamic questions cache for Infinite mode
  const [infiniteQuestions, setInfiniteQuestions] = useState([]);

  // Generate initial batch for infinite mode when activated
  useEffect(() => {
    if (selectedTest === 'infinite' && infiniteQuestions.length === 0) {
      generateMoreInfiniteQuestions(10);
    }
  }, [selectedTest]);

  const generateMoreInfiniteQuestions = (count = 5) => {
    const subtests = [
      'number_analogies',
      'number_puzzles',
      'number_series',
      'figure_matrices',
      'paper_folding',
      'figure_classification'
    ];
    const newBatch = [];
    for (let i = 0; i < count; i++) {
      const randomSubtest = subtests[Math.floor(Math.random() * subtests.length)];
      newBatch.push(generateProceduralQuestion(randomSubtest, selectedGrade));
    }
    setInfiniteQuestions(prev => [...prev, ...newBatch]);
  };

  // Filter curated questions or use procedural infinite questions
  const filteredQuestions = useMemo(() => {
    if (selectedTest === 'infinite') {
      if (selectedBattery === 'all') return infiniteQuestions;
      return infiniteQuestions.filter(q => q.batteryId === selectedBattery);
    }

    // Curated questions for All Bank, Test 1, Test 2, Test 3
    const testQuestions = QUESTIONS.filter(q => {
      const matchGrade = q.grade === selectedGrade || 
        (selectedGrade === 'k' && q.grade === '1') || 
        (parseInt(selectedGrade) >= 4 && q.grade === '3');
      const matchTest = selectedTest === 'all_bank' || !q.testId || q.testId === selectedTest;
      const matchBattery = selectedBattery === 'all' || q.batteryId === selectedBattery;
      return matchGrade && matchTest && matchBattery;
    });

    // Fallback: If a specific test/battery has fewer than 5 questions, supplement with procedural questions!
    if (testQuestions.length < 5) {
      const supplemental = [];
      const needed = 8 - testQuestions.length;
      for (let i = 0; i < needed; i++) {
        supplemental.push(generateProceduralQuestion(null, selectedGrade));
      }
      return [...testQuestions, ...supplemental];
    }

    return testQuestions;
  }, [selectedGrade, selectedTest, selectedBattery, infiniteQuestions]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer countdown for Timed Exam mode
  useEffect(() => {
    if (testMode !== 'timed' || showScoreReport) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowScoreReport(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testMode, showScoreReport]);

  // Handle grade change
  const handleSelectGrade = (gradeId) => {
    setSelectedGrade(gradeId);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setShowScoreReport(false);
    setInfiniteQuestions([]);
  };

  // Handle test change (Test 1, Test 2, Test 3, Infinite)
  const handleSelectTest = (testId) => {
    setSelectedTest(testId);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setShowScoreReport(false);
    if (testId === 'infinite') {
      setInfiniteQuestions([]);
      generateMoreInfiniteQuestions(10);
    }
  };

  // Handle battery change
  const handleSelectBattery = (batteryId) => {
    setSelectedBattery(batteryId);
    setCurrentIndex(0);
    setShowScoreReport(false);
  };

  // Handle answer submission
  const handleAnswerSubmit = (optionIndex) => {
    if (!currentQuestion) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));

    setSubmittedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    // In timed test mode, auto advance after short delay
    if (testMode === 'timed') {
      setTimeout(() => {
        if (currentIndex < filteredQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setShowScoreReport(true);
        }
      }, 500);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (selectedTest === 'infinite') {
      // Generate more procedural questions on the fly in infinite mode!
      generateMoreInfiniteQuestions(5);
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowScoreReport(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setSubmittedAnswers({});
    setCurrentIndex(0);
    setShowScoreReport(false);
    setTimeLeft(15 * 60);
    if (selectedTest === 'infinite') {
      setInfiniteQuestions([]);
      generateMoreInfiniteQuestions(10);
    }
  };

  const handleReviewQuestion = (idx) => {
    setCurrentIndex(idx);
    setShowScoreReport(false);
  };

  // Score calculations
  const totalScore = useMemo(() => {
    let count = 0;
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) count++;
    });
    return count;
  }, [filteredQuestions, userAnswers]);

  const answeredCount = Object.keys(userAnswers).length;

  const batteryScores = useMemo(() => {
    const scores = {
      verbal: { correct: 0, total: 0 },
      quantitative: { correct: 0, total: 0 },
      nonverbal: { correct: 0, total: 0 }
    };
    filteredQuestions.forEach(q => {
      if (scores[q.batteryId]) {
        scores[q.batteryId].total++;
        if (userAnswers[q.id] === q.correctAnswer) {
          scores[q.batteryId].correct++;
        }
      }
    });
    return scores;
  }, [filteredQuestions, userAnswers]);

  const currentGradeObj = GRADE_LEVELS.find(g => g.id === selectedGrade) || GRADE_LEVELS[2];
  const currentTestObj = PRACTICE_TESTS.find(t => t.id === selectedTest) || PRACTICE_TESTS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-sky-200">
      {/* Top Header Navigation */}
      <Header
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        selectedTest={selectedTest}
        onSelectTest={handleSelectTest}
        selectedBattery={selectedBattery}
        onSelectBattery={handleSelectBattery}
        testMode={testMode}
        onToggleTestMode={(m) => {
          setTestMode(m);
          handleRestart();
        }}
        autoReadAudio={autoReadAudio}
        onToggleAutoRead={() => setAutoReadAudio(!autoReadAudio)}
        timeLeft={timeLeft}
        totalScore={totalScore}
        answeredCount={answeredCount}
        totalQuestions={filteredQuestions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {showScoreReport ? (
          <ScoreReport
            score={totalScore}
            total={filteredQuestions.length}
            batteryScores={batteryScores}
            gradeName={currentGradeObj.name}
            levelName={`${currentGradeObj.level} - ${currentTestObj.name}`}
            userAnswers={userAnswers}
            questions={filteredQuestions}
            onRestart={handleRestart}
            onReviewQuestion={handleReviewQuestion}
          />
        ) : currentQuestion ? (
          <div className="space-y-4">
            {/* Active Question Card */}
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={filteredQuestions.length}
              onAnswerSubmit={handleAnswerSubmit}
              isPracticeMode={testMode === 'practice'}
              selectedAnswer={userAnswers[currentQuestion.id]}
              isAnswerSubmitted={Boolean(submittedAnswers[currentQuestion.id])}
              onShowExplanation={() => setShowExplanation(true)}
              autoReadAudio={autoReadAudio}
            />

            {/* Bottom Question Navigation Controls */}
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 px-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-heading font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Center Quick Jump Pills */}
              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-1 px-2 max-w-md">
                {filteredQuestions.slice(0, 20).map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCorrect = userAnswers[q.id] === q.correctAnswer;

                  return (
                    <button
                      key={q.id || idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-full text-xs font-bold font-heading flex items-center justify-center transition flex-shrink-0 ${
                        isCurrent
                          ? 'ring-2 ring-sky-500 bg-sky-500 text-white shadow'
                          : isAnswered
                          ? testMode === 'practice'
                            ? isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
                {filteredQuestions.length > 20 && (
                  <span className="text-xs text-slate-400 font-bold px-1">+more</span>
                )}
              </div>

              {currentIndex < filteredQuestions.length - 1 || selectedTest === 'infinite' ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition transform active:scale-95"
                >
                  <span>{selectedTest === 'infinite' && currentIndex === filteredQuestions.length - 1 ? 'Generate Next ⚡' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowScoreReport(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition transform active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  <span>Finish & View Score</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-600 font-bold mb-4">No questions found for this combination.</p>
            <button
              onClick={() => {
                setSelectedGrade('2');
                setSelectedTest('test_1');
                setSelectedBattery('all');
              }}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl font-heading font-bold"
            >
              Reset to Grade 2 (Practice Test 1)
            </button>
          </div>
        )}
      </main>

      {/* Explanation Modal */}
      {showExplanation && currentQuestion && (
        <ExplanationModal
          isOpen={showExplanation}
          onClose={() => setShowExplanation(false)}
          question={currentQuestion}
          selectedAnswer={userAnswers[currentQuestion.id]}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400 font-medium">
        <p>
          CogAT® (Cognitive Abilities Test) is a registered trademark of Riverside Insights. 
          CogAT Prep Academy is an independent educational tool created to provide free, accessible practice for all families.
        </p>
      </footer>
    </div>
  );
}
