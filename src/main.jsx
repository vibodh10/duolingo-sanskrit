import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { COURSE, PLACEMENT, DEVANAGARI_KEYS } from './course';

const DEFAULT_PROGRESS = { xp:0, hearts:5, streak:0, lastDate:null, completed:[], unlockedUnit:1, placementTaken:false };

function loadProgress(){
  try { return { ...DEFAULT_PROGRESS, ...(JSON.parse(localStorage.getItem('sanskrit-progress-v2')) || {}) }; }
  catch { return DEFAULT_PROGRESS; }
}
function normalize(v=''){ return v.trim().replace(/[।.]+$/g,'').replace(/\s+/g,' ').replace(/ं/g,'म्'); }
function speak(text){
  if(!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text); u.lang='hi-IN'; u.rate=.72; speechSynthesis.cancel(); speechSynthesis.speak(u);
}
function sameAnswer(value, ex){ return [ex.answer, ...(ex.alternatives||[])].map(normalize).includes(normalize(value)); }
function tokenText(tokens=[]){ return tokens.map(x=>x.t).join(' '); }

function WordToken({token}){
  const [open,setOpen]=useState(false);
  return <span className="word-wrap"><button className="word-token" onClick={()=>setOpen(!open)}>{token.t}</button>{open&&<span className="word-pop">{token.m}</span>}</span>;
}

function Keyboard({onKey,onBackspace,onSpace}){
  const [open,setOpen]=useState(true);
  return <div className="keyboard-box">
    <button className="keyboard-toggle" onClick={()=>setOpen(!open)}>{open?'Hide':'Show'} Sanskrit keyboard</button>
    {open&&<><div className="keyboard">{DEVANAGARI_KEYS.map((k,i)=><button key={k+i} onClick={()=>onKey(k)}>{k}</button>)}</div>
    <div className="keyboard-actions"><button onClick={onSpace}>Space</button><button onClick={onBackspace}>⌫</button></div></>}
  </div>;
}

function Exercise({exercise,value,setValue,checked,onCheck,onContinue,correct,hearts}){
  const [selected,setSelected]=useState('');
  const [built,setBuilt]=useState([]);
  const [meaningOpen,setMeaningOpen]=useState(false);
  const [listening,setListening]=useState(false);
  const [speechNote,setSpeechNote]=useState('');

  useEffect(()=>{ setSelected(''); setBuilt([]); setMeaningOpen(false); setSpeechNote(''); setListening(false); },[exercise]);

  const submitted = exercise.type==='blocks' ? built.join(' ') : exercise.type==='choice'||exercise.type==='listen' ? selected : value;

  function check(){
    if(exercise.type==='blocks') onCheck(normalize(built.join(' '))===normalize(exercise.answer.join(' ')));
    else if(exercise.type==='choice'||exercise.type==='listen') onCheck(selected===exercise.answer);
    else if(exercise.type==='type') onCheck(sameAnswer(value,exercise));
  }
  function startSpeech(){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ setSpeechNote('Speech recognition is not available in this browser. Chrome or Edge works best.'); return; }
    const r = new SR(); r.lang='hi-IN'; r.interimResults=false; r.maxAlternatives=3; setListening(true); setSpeechNote('Listening…');
    r.onresult=e=>{
      const heard=[...e.results[0]].map(x=>x.transcript);
      const ok=heard.some(x=>sameAnswer(x,exercise));
      setValue(heard[0]||''); setListening(false); setSpeechNote(`Heard: ${heard[0]||'—'}`); onCheck(ok);
    };
    r.onerror=()=>{ setListening(false); setSpeechNote('I could not clearly hear that. Try again.'); };
    r.onend=()=>setListening(false); r.start();
  }

  if(exercise.type==='teach') return <section className="exercise-card teach-card">
    <div className="kicker">NEW WORD</div><h1>{exercise.prompt}</h1>
    <button className="big-word" onClick={()=>setMeaningOpen(!meaningOpen)}>{exercise.word}</button>
    <div className="translit">{exercise.translit}</div>
    {meaningOpen&&<div className="meaning-card"><strong>{exercise.meaning}</strong><p>{exercise.note}</p></div>}
    {!meaningOpen&&<p className="tap-hint">Tap the blue word to reveal its meaning.</p>}
    <button className="primary-btn inline" disabled={!meaningOpen} onClick={()=>onContinue(true)}>Got it</button>
  </section>;

  return <>
    <section className="exercise-card">
      <div className="kicker">PRACTICE</div><h1>{exercise.prompt}</h1>
      {exercise.tokens&&<div className="sentence-line">{exercise.tokens.map((t,i)=><WordToken token={t} key={i}/>)}</div>}
      {exercise.type==='listen'&&<button className="speaker" onClick={()=>speak(exercise.speech)}>🔊 Play audio</button>}
      {exercise.type==='choice'||exercise.type==='listen' ? <div className="answers">{exercise.options.map(o=><button key={o} className={`answer ${selected===o?'selected':''}`} disabled={checked} onClick={()=>setSelected(o)}>{o}</button>)}</div>:null}
      {exercise.type==='blocks'&&<div className="blocks-area"><div className="built-line">{built.length?built.map((b,i)=><button key={i} className="block chosen" disabled={checked} onClick={()=>!checked&&setBuilt(x=>x.filter((_,j)=>j!==i))}>{b}</button>):<span>Build the sentence here</span>}</div><div className="word-bank">{exercise.blocks.map((b,i)=><button key={b+i} className="block" disabled={checked||built.includes(b)} onClick={()=>setBuilt(x=>[...x,b])}>{b}</button>)}</div></div>}
      {exercise.type==='type'&&<div className="type-area"><input value={value} disabled={checked} onChange={e=>setValue(e.target.value)} placeholder="Write in Sanskrit"/><div className="hint">{exercise.hint}</div><Keyboard onKey={k=>setValue(v=>v+k)} onSpace={()=>setValue(v=>v+' ')} onBackspace={()=>setValue(v=>v.slice(0,-1))}/></div>}
      {exercise.type==='speak'&&<div className="speak-area"><button className={`mic-btn ${listening?'listening':''}`} disabled={checked||listening} onClick={startSpeech}>🎙 {listening?'Listening…':'Speak now'}</button><button className="listen-small" onClick={()=>speak(exercise.speech)}>Hear model</button>{speechNote&&<p className="speech-note">{speechNote}</p>}</div>}
    </section>
    <footer className={`feedback ${checked?(correct?'right':'wrong'):''}`}>
      {checked?<div><strong>{correct?'Correct!':'Not quite'}</strong><span>{correct?'Nice work.':`Answer: ${Array.isArray(exercise.answer)?exercise.answer.join(' '):exercise.answer}`}</span></div>:<div/>}
      {exercise.type==='speak' ? (checked&&<button className="primary-btn" onClick={()=>onContinue(correct)}>Continue</button>) : <button className="primary-btn" disabled={!checked&&!submitted} onClick={checked?()=>onContinue(correct):check}>{checked?'Continue':'Check'}</button>}
    </footer>
  </>;
}

function Placement({onDone,onExit}){
  const [i,setI]=useState(0), [answers,setAnswers]=useState([]), [sel,setSel]=useState('');
  const q=PLACEMENT[i];
  function next(){ if(!sel)return; const nextA=[...answers,sel===q.answer]; if(i<PLACEMENT.length-1){setAnswers(nextA);setI(i+1);setSel('');return;}
    let mastered=0; for(let u=1;u<=5;u++){ const idx=PLACEMENT.map((x,j)=>x.unit===u?j:-1).filter(j=>j>=0); if(idx.every(j=>nextA[j])) mastered=u; else break; }
    onDone(mastered);
  }
  return <main className="placement-screen"><header className="placement-top"><button onClick={onExit}>×</button><div className="progress-track"><div style={{width:`${((i+1)/PLACEMENT.length)*100}%`}}/></div><span>{i+1}/{PLACEMENT.length}</span></header><section className="placement-card"><div className="kicker">PLACEMENT TEST · UNIT {q.unit}</div><h1>{q.prompt}</h1><div className="answers">{q.options.map(o=><button className={`answer ${sel===o?'selected':''}`} key={o} onClick={()=>setSel(o)}>{o}</button>)}</div><p className="placement-note">Units are skipped only when you demonstrate mastery of every earlier section. Guessing later questions will not create gaps.</p><button className="primary-btn" disabled={!sel} onClick={next}>{i===PLACEMENT.length-1?'See placement':'Continue'}</button></section></main>;
}

function App(){
  const [progress,setProgress]=useState(loadProgress);
  const [mode,setMode]=useState('path');
  const [skillId,setSkillId]=useState(null);
  const [exerciseIndex,setExerciseIndex]=useState(0);
  const [value,setValue]=useState('');
  const [checked,setChecked]=useState(false);
  const [correct,setCorrect]=useState(false);

  useEffect(()=>localStorage.setItem('sanskrit-progress-v2',JSON.stringify(progress)),[progress]);
  const allSkills=useMemo(()=>COURSE.flatMap(u=>u.skills.map(s=>({...s,unit:u.id,unitTitle:u.title}))),[]);
  const activeSkill=allSkills.find(s=>s.id===skillId); const exercise=activeSkill?.exercises[exerciseIndex];
  const firstIncomplete=allSkills.find(s=>!progress.completed.includes(s.id)&&s.unit<=progress.unlockedUnit)?.id;

  function beginSkill(id){ setSkillId(id);setExerciseIndex(0);setValue('');setChecked(false);setMode('lesson'); }
  function checkResult(ok){ setCorrect(ok);setChecked(true);setProgress(p=>({...p,xp:p.xp+(ok?10:0),hearts:ok?p.hearts:Math.max(0,p.hearts-1)})); }
  function continueExercise(){
    if(exerciseIndex<activeSkill.exercises.length-1){setExerciseIndex(x=>x+1);setValue('');setChecked(false);return;}
    const today=new Date().toISOString().slice(0,10), yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    setProgress(p=>{const completed=p.completed.includes(activeSkill.id)?p.completed:[...p.completed,activeSkill.id]; const unit=COURSE.find(u=>u.id===activeSkill.unit); const unitDone=unit.skills.every(s=>completed.includes(s.id)); return {...p,completed,xp:p.xp+20,lastDate:today,streak:p.lastDate===today?p.streak:p.lastDate===yesterday?p.streak+1:1,unlockedUnit:unitDone?Math.min(5,Math.max(p.unlockedUnit,activeSkill.unit+1)):p.unlockedUnit};});
    setMode('path');setSkillId(null);
  }
  function placementDone(mastered){ const unlocked=Math.min(5,mastered+1); const completed=COURSE.filter(u=>u.id<=mastered).flatMap(u=>u.skills.map(s=>s.id)); setProgress(p=>({...p,placementTaken:true,unlockedUnit:Math.max(p.unlockedUnit,unlocked),completed:[...new Set([...p.completed,...completed])]}));setMode('path'); }

  if(mode==='placement') return <Placement onDone={placementDone} onExit={()=>setMode('path')}/>;
  if(mode==='lesson'&&activeSkill&&exercise) return <main className="lesson-screen"><header className="lesson-topbar"><button className="icon-btn" onClick={()=>setMode('path')}>×</button><div className="progress-track"><div style={{width:`${((exerciseIndex+(checked?1:0))/activeSkill.exercises.length)*100}%`}}/></div><div className="heart-count">♥ {progress.hearts}</div></header><Exercise exercise={exercise} value={value} setValue={setValue} checked={checked} onCheck={checkResult} onContinue={continueExercise} correct={correct} hearts={progress.hearts}/></main>;

  return <main className="app-shell">
    <aside className="sidebar"><div className="brand">संस्कृत</div><nav><a className="active">⌂ Learn</a><a>★ Practice</a><a>▥ Words</a></nav><button className="placement-link" onClick={()=>setMode('placement')}>{progress.placementTaken?'Retake placement test':'Take placement test'}</button></aside>
    <section className="course"><div className="hero"><div><span>YOUR SANSKRIT COURSE</span><h1>Learn Sanskrit properly, step by step</h1><p>New words are taught before they are tested. Tap blue Sanskrit words for meanings, build sentences with blocks, practise listening and speaking, and use the built in Devanagari keyboard.</p></div><div className="hero-symbol">ॐ</div></div>
      {COURSE.map(unit=><section className={`unit ${unit.id>progress.unlockedUnit?'unit-locked':''}`} key={unit.id}><div className="unit-head"><div><span>UNIT {unit.id}</span><h2>{unit.title.replace(/^Unit \d+ · /,'')}</h2><p>{unit.subtitle}</p></div>{unit.id>progress.unlockedUnit&&<div className="lock-pill">🔒 Complete earlier unit or pass placement</div>}</div><div className="skill-path">{unit.skills.map((skill,idx)=>{const done=progress.completed.includes(skill.id); const previous=idx===0?true:progress.completed.includes(unit.skills[idx-1].id); const open=unit.id<=progress.unlockedUnit&&previous; return <div className="skill-row" key={skill.id}><button className={`lesson-node ${done?'done':''} ${!open?'locked':''}`} disabled={!open} onClick={()=>beginSkill(skill.id)}>{done?'✓':open?(skill.id===firstIncomplete?'★':'●'):'🔒'}</button><div><strong>{skill.title}</strong><span>{skill.description}</span></div></div>})}</div></section>)}
    </section>
    <aside className="stats-panel"><div className="stats-row"><div>🔥 <strong>{progress.streak}</strong></div><div>◆ <strong>{progress.xp}</strong> XP</div><div>♥ <strong>{progress.hearts}</strong></div></div><div className="card"><h3>Course progress</h3><p>{progress.completed.length} of {allSkills.length} skills completed</p><div className="mini-track"><div style={{width:`${progress.completed.length/allSkills.length*100}%`}}/></div></div><div className="card"><h3>Placement</h3><p>The test has two real questions from each unit. You only skip a unit when both questions are correct and every earlier unit is also mastered.</p><button className="secondary-btn" onClick={()=>setMode('placement')}>{progress.placementTaken?'Retake test':'Start placement test'}</button></div><div className="card"><h3>Input</h3><p>No external Devanagari keyboard is required. Typing exercises include a full on screen Sanskrit keyboard, while most early production exercises use word blocks.</p></div></aside>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);