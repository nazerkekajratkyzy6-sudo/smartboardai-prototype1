import React, { useState, useEffect } from 'react';
import socket from './socketClient';
import FormulaPanel from './components/FormulaPanel.jsx';
import GamesPanel from './components/GamesPanel.jsx';
import AiPanel from './components/AiPanel.jsx';

export default function SmartBoard(){  
  const [elements, setElements] = useState([]);
  const [showAI, setShowAI] = useState(false);

  useEffect(()=>{
    socket.on('board:update', (data)=>{
      if(data && data.elements) setElements(data.elements);
    });
    return ()=> socket.off('board:update');
  },[]);

  const addElement = (el) => {
    const next = [...elements, el];
    setElements(next);
    socket.emit('board:update', { elements: next });
  };

  return (
    <div style={{height:'100vh', display:'flex', flexDirection:'column', fontFamily:'Arial, sans-serif'}}>
      <header style={{padding:12, background:'#fff', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>SmartBoard.Ai — by Nazereke Kairatkyzy</strong>
        <div>
          <button onClick={()=>setShowAI(s=>!s)} style={{marginRight:8}}>{showAI? 'Close AI':'Open AI'}</button>
        </div>
      </header>
      <div style={{display:'flex', flex:1}}>
        <aside style={{width:80, background:'#f7fafc', padding:12}}>
          <div style={{marginBottom:8}}>✏️</div>
          <div style={{marginBottom:8}}>🖼️</div>
          <div style={{marginBottom:8}}>🎮</div>
          <div style={{marginBottom:8}}>⭐</div>
        </aside>
        <main style={{flex:1, padding:20, position:'relative'}}>
          <div style={{width:'100%', height:'100%', background:'#fff', borderRadius:12, border:'1px solid #e6eef7', padding:12, overflow:'auto'}}>
            {elements.length===0 && <div style={{color:'#93a3b8'}}>🖊 Здесь будет доска — добавьте элемент через AI или игры</div>}
            {elements.map(el=> (
              <div key={el.id} style={{background:'#e6f7ff', padding:8, borderRadius:8, margin:8}}>{el.text}</div>
            ))}
          </div>
        </main>
        <aside style={{width:320, background:'#fff', borderLeft:'1px solid #eee', padding:12}}>
          <h4>Ученики / Баллы</h4>
          <div style={{background:'#f8fafc', padding:8, borderRadius:8}}>Айдана — ⭐ 5</div>
          <div style={{marginTop:12}}><GamesPanel onAdd={addElement} /></div>
        </aside>
      </div>
      {showAI && <AiPanel onInsert={addElement} onClose={()=>setShowAI(false)} />}
      <FormulaPanel onInsert={addElement} />
    </div>
  );
}
