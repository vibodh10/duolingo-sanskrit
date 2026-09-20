import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const LESSONS = [
  {
    id: 1,
    title: 'Devanagari Basics',
    subtitle: 'Vowels and first words',
    questions: [
      { type: 'choice', prompt: 'Which letter is “a”?', options: ['अ', 'आ', 'इ', 'उ'], answer: 'अ', explain: 'अ is the short vowel “a”.' },
      { type: 'choice', prompt: 'What does नमस्ते mean?', options: ['Goodbye', 'Hello', 'Food', 'Water'], answer: 'Hello', explain: 'नमस्ते is a common respectful greeting.' },
      { type: 'type', prompt: 'Type the Sanskrit word for “water”.', answer: 'जलम्', alternatives: ['जलं'], hint: 'jal-am' },
      { type: 'choice', prompt: 'Which is the long “aa” vowel?', options: ['अ', 'आ', 'ए', 'ओ'], answer: 'आ', explain: 'आ is the long vowel ā.' }
    ]
  },
  {
    id: 2,
    title: 'People and Things',
    subtitle: 'Simple nouns and sentences',
    questions: [
      { type: 'choice', prompt: 'बालकः means…', options: ['boy', 'girl', 'teacher', 'book'], answer: 'boy', explain: 'बालकः = boy.' },
      { type: 'choice', prompt: 'बालिका means…', options: ['boy', 'girl', 'water', 'house'], answer: 'girl', explain: 'बालिका = girl.' },
      { type: 'type', prompt: 'Type: “This is a book.”', answer: 'एतत् पुस्तकम्', alternatives: ['एतत् पुस्तकम्।'], hint: 'etat pustakam' },
      { type: 'choice', prompt: 'पुस्तकम् means…', options: ['book', 'pen', 'school', 'teacher'], answer: 'book', explain: 'पुस्तकम् = book.' }
    ]
  },
  {
    id: 3,
    title: 'Actions',
    subtitle: 'Common verbs',
    questions: [
      { type: 'choice', prompt: 'पठति means…', options: ['reads', 'eats', 'goes', 'speaks'], answer: 'reads', explain: 'पठति = he/she reads.' },
      { type: 'choice', prompt: 'गच्छति means…', options: ['comes', 'goes', 'writes', 'drinks'], answer: 'goes', explain: 'गच्छति = he/she goes.' },
      { type: 'type', prompt: 'Complete: बालकः ___ । (The boy reads.)', answer: 'पठति', alternatives: ['पठति।'], hint: 'paṭhati' },
      { type: 'choice', prompt: 'Which sentence means “The girl goes”?', options: ['बालिका गच्छति।', 'बालिका पठति।', 'बालकः गच्छति।', 'एतत् पुस्तकम्।'], answer: 'बालिका गच्छति।', explain: 'बालिका = girl; गच्छति = goes.' }
    ]
  },
  {
    id: 4,
    title: 'Cases: Subject',
    subtitle: 'Nominative forms',
    questions: [
      { type: 'choice', prompt: 'In बालकः पठति, बालकः is the…', options: ['subject', 'object', 'verb', 'adjective'], answer: 'subject', explain: 'The nominative case marks the subject.' },
      { type: 'choice', prompt: 'Which masculine nominative singular ending appears here?', options: ['ः', 'म्', 'या', 'स्य'], answer: 'ः', explain: 'Many masculine -a stems end in -ः in nominative singular.' },
      { type: 'type', prompt: 'Type the nominative form of बालक (boy).', answer: 'बालकः', alternatives: [], hint: 'bālakaḥ' }
    ]
  },
  {
    id: 5,
    title: 'Cases: Object',
    subtitle: 'Accusative forms',
    questions: [
      { type: 'choice', prompt: 'The accusative case commonly marks the…', options: ['direct object', 'subject', 'speaker', 'tense'], answer: 'direct object', explain: 'The accusative commonly marks the direct object.' },
      { type: 'choice', prompt: 'बालकः फलम् खादति means…', options: ['The boy eats fruit', 'The fruit eats the boy', 'The boy reads', 'The girl eats fruit'], answer: 'The boy eats fruit', explain: 'बालकः = boy, फलम् = fruit, खादति = eats.' },
      { type: 'type', prompt: 'Type the Sanskrit word used here for “fruit”.', answer: 'फलम्', alternatives: ['फलं'], hint: 'phalam' }
    ]
  },
  {
    id: 6,
    title: 'Everyday Sanskrit',
    subtitle: 'Useful phrases',
    questions: [
      { type: 'choice', prompt: 'कथम् असि? means…', options: ['How are you?', 'What is your name?', 'Where are you going?', 'Good night'], answer: 'How are you?', explain: 'कथम् = how; असि = you are.' },
      { type: 'choice', prompt: 'अहम् means…', options: ['I', 'you', 'he', 'they'], answer: 'I', explain: 'अहम् = I.' },
      { type: 'type', prompt: 'Type “I am well.”', answer: 'अहम् कुशली अस्मि', alternatives: ['अहं कुशली अस्मि', 'अहम् कुशली अस्मि।'], hint: 'aham kuśalī asmi' }
    ]
  }
];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('sanskrit-path-progress')) || { xp: 0, hearts: 5, completed: [], streak: 0, lastDate: null };
  } catch {
    return { xp: 0, hearts: 5, completed: [], streak: 0, lastDate: null };
  }
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.75;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function normalize(value) {
  return value.trim().replace(/[।.]+$/g, '').replace(/\s+/g, ' ');
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    localStorage.setItem('sanskrit-path-progress', JSON.stringify(progress));
  }, [progress]);

  const activeLesson = useMemo(() => LESSONS.find(l => l.id === activeLessonId), [activeLessonId]);
  const question = activeLesson?.questions[questionIndex];

  const isUnlocked = (lesson) => lesson.id === 1 || progress.completed.includes(lesson.id - 1) || progress.completed.includes(lesson.id);

  function beginLesson(id) {
    if (progress.hearts <= 0) return;
    setActiveLessonId(id);
    setQuestionIndex(0);
    setTyped('');
    setSelected('');
    setChecked(false);
  }

  function checkAnswer() {
    if (!question || checked) return;
    const submitted = question.type === 'type' ? typed : selected;
    if (!submitted) return;

    const accepted = [question.answer, ...(question.alternatives || [])].map(normalize);
    const ok = accepted.includes(normalize(submitted));
    setCorrect(ok);
    setChecked(true);

    if (ok) {
      setProgress(p => ({ ...p, xp: p.xp + 10 }));
    } else {
      setProgress(p => ({ ...p, hearts: Math.max(0, p.hearts - 1) }));
    }
  }

  function continueLesson() {
    if (!activeLesson) return;
    if (questionIndex < activeLesson.questions.length - 1) {
      setQuestionIndex(i => i + 1);
      setTyped('');
      setSelected('');
      setChecked(false);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setProgress(p => {
      const already = p.completed.includes(activeLesson.id);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let streak = p.streak;
      if (p.lastDate !== today) streak = p.lastDate === yesterday ? p.streak + 1 : 1;
      return {
        ...p,
        xp: p.xp + (already ? 10 : 20),
        completed: already ? p.completed : [...p.completed, activeLesson.id],
        streak,
        lastDate: today
      };
    });
    setActiveLessonId(null);
  }

  function refillHearts() {
    setProgress(p => ({ ...p, hearts: 5 }));
  }

  if (activeLesson && question) {
    const lessonProgress = ((questionIndex + (checked ? 1 : 0)) / activeLesson.questions.length) * 100;
    return (
      <main className="lesson-screen">
        <header className="lesson-topbar">
          <button className="icon-btn" onClick={() => setActiveLessonId(null)} aria-label="Close lesson">×</button>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${lessonProgress}%` }} /></div>
          <div className="heart-count">♥ {progress.hearts}</div>
        </header>

        <section className="question-card">
          <div className="lesson-kicker">{activeLesson.title}</div>
          <h1>{question.prompt}</h1>
          <button className="listen-btn" onClick={() => speak(question.answer)}>🔊 Hear Sanskrit</button>

          {question.type === 'choice' ? (
            <div className="answers">
              {question.options.map(option => (
                <button
                  key={option}
                  className={`answer ${selected === option ? 'selected' : ''}`}
                  onClick={() => !checked && setSelected(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="typing-wrap">
              {question.hint && <div className="hint">Hint: {question.hint}</div>}
              <input
                autoFocus
                value={typed}
                disabled={checked}
                onChange={e => setTyped(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkAnswer()}
                placeholder="Type your answer in Sanskrit"
              />
            </div>
          )}
        </section>

        <footer className={`feedback-bar ${checked ? (correct ? 'right' : 'wrong') : ''}`}>
          {checked ? (
            <div className="feedback-copy">
              <strong>{correct ? 'Correct!' : 'Not quite'}</strong>
              <span>{correct ? (question.explain || 'Great work.') : `Answer: ${question.answer}`}</span>
            </div>
          ) : <div />}
          <button className="primary-btn" onClick={checked ? continueLesson : checkAnswer} disabled={!checked && !(selected || typed.trim())}>
            {checked ? 'Continue' : 'Check'}
          </button>
        </footer>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">संस्कृत</div>
        <nav>
          <a className="active">⌂ Learn</a>
          <a>★ Practice</a>
          <a>▥ Words</a>
        </nav>
        <div className="side-note">A private Sanskrit course built around short, repeatable lessons.</div>
      </aside>

      <section className="course">
        <div className="unit-banner">
          <div>
            <span>YOUR SANSKRIT PATH</span>
            <h1>Learn Sanskrit step by step</h1>
            <p>Start with the script, then build vocabulary, grammar and reading confidence.</p>
          </div>
          <div className="unit-symbol">ॐ</div>
        </div>

        <div className="path">
          {LESSONS.map((lesson, index) => {
            const unlocked = isUnlocked(lesson);
            const done = progress.completed.includes(lesson.id);
            return (
              <div className={`path-row offset-${index % 3}`} key={lesson.id}>
                <button
                  className={`lesson-node ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}`}
                  disabled={!unlocked}
                  onClick={() => beginLesson(lesson.id)}
                >
                  {done ? '✓' : !unlocked ? '🔒' : index === 0 ? '★' : '●'}
                </button>
                <div className="lesson-label">
                  <strong>{lesson.title}</strong>
                  <span>{lesson.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="stats-panel">
        <div className="stats-row">
          <div>🔥 <strong>{progress.streak}</strong></div>
          <div>◆ <strong>{progress.xp}</strong> XP</div>
          <div>♥ <strong>{progress.hearts}</strong></div>
        </div>
        <div className="card">
          <h3>Daily progress</h3>
          <p>{progress.completed.length} of {LESSONS.length} lessons completed</p>
          <div className="mini-track"><div style={{ width: `${(progress.completed.length / LESSONS.length) * 100}%` }} /></div>
        </div>
        <div className="card">
          <h3>Hearts</h3>
          <p>Wrong answers cost one heart. Refill any time while this private version is in development.</p>
          <button className="secondary-btn" onClick={refillHearts}>Refill hearts</button>
        </div>
        <div className="card word-card">
          <h3>Today’s words</h3>
          <p><b>नमस्ते</b> — hello</p>
          <p><b>जलम्</b> — water</p>
          <p><b>पठति</b> — reads</p>
        </div>
      </aside>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
