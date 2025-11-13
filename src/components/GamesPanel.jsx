import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function GamesPanel({ onAdd }){
  const addRebus = () => onAdd({ id: uuidv4(), text: 'Ребус: ⚡️🌞➕🌿 = Фотосинтез' });
  const addTruth = () => onAdd({ id: uuidv4(), text: 'Ложь/Истина: Фотосинтез ночью — ❌' });
  return (
    <div>
      <strong>Игры</strong>
      <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:8}}>
        <button onClick={addRebus}>Добавить ребус</button>
        <button onClick={addTruth}>Добавить Ложь/Истина</button>
      </div>
    </div>
  );
}
