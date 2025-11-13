import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { v4 as uuidv4 } from 'uuid';

export default function FormulaPanel({ onInsert }){
  const [expr, setExpr] = useState('');
  return (
    <div style={{position:'fixed', left:20, bottom:20, width:320, background:'#fff', border:'1px solid #eee', padding:12, borderRadius:8}}>
      <strong>Формула</strong>
      <input value={expr} onChange={e=>setExpr(e.target.value)} placeholder="Напиши LaTeX, напр. \frac{a}{b}" style={{width:'100%', marginTop:8}}/>
      <div style={{marginTop:8}}><BlockMath math={expr || ' '} /></div>
      <div style={{marginTop:8, display:'flex', gap:8}}>
        <button onClick={()=> onInsert({ id: uuidv4(), text: 'Формула: ' + (expr || '\\;') })}>Вставить</button>
      </div>
    </div>
  );
}
