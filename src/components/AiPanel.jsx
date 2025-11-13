import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { solveMath } from '../services/aiService';

export default function AiPanel({ onInsert, onClose }){
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const generate = async () => {
    if(text.startsWith('solve:')){
      const expr = text.replace('solve:','').trim();
      const res = await solveMath(expr);
      setResult(res);
      onInsert({ id: uuidv4(), text: 'Решение: ' + expr });
    } else {
      onInsert({ id: uuidv4(), text });
    }
  };

  return (
    <div style={{position:'fixed', right:20, top:80, width:360, background:'#fff', border:'1px solid #e6eef7', borderRadius:12, padding:12}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <strong>ИИ-помощник</strong>
        <button onClick={onClose}>✖</button>
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Например: solve: x^2 - 4x + 3" style={{width:'100%', height:80, marginTop:8}} />
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <button onClick={generate}>Сгенерировать и вставить</button>
        <button onClick={()=>{ setText(''); setResult(null); }}>Очистить</button>
      </div>
      {result && <div style={{marginTop:8, background:'#f1f9ff', padding:8}}>
        <strong>Пошагово:</strong>
        <ol>{result.steps.map((s,i)=>(<li key={i}>{s}</li>))}</ol>
      </div>}
    </div>
  );
}
