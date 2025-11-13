import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAIResponse } from './services/aiService'; ✅ правильный путь

export default function SmartBoardAI() {
  const [elements, setElements] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🧠 Функция запроса к ИИ
  const handleGenerate = async (text) => {
    if (!text) return;

    setLoading(true);
    try {
      const aiResponse = await askAI(text); // ждём ответ от ИИ
      const newEl = {
        id: uuidv4(),
        text: `💡 ${aiResponse}`,
        x: '40%',
        y: `${Math.random() * 50 + 10}%`,
      };
      setElements((prev) => [...prev, newEl]);
    } catch (err) {
      const errorEl = {
        id: uuidv4(),
        text: '⚠️ Ошибка при получении ответа от ИИ.',
        x: '40%',
        y: '20%',
      };
      setElements((prev) => [...prev, errorEl]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SmartBoard.Ai — by Nazereke Kairatkyzy</h2>
      <button onClick={() => setShowAI(!showAI)}>
        {showAI ? 'Закрыть AI' : 'Открыть AI'}
      </button>

      {showAI && (
        <div style={{ marginTop: 10 }}>
          <input id="ai-input" placeholder="Напиши запрос..." style={{ width: '70%' }} />
          <button
            onClick={() => {
              const value = document.getElementById('ai-input').value;
              handleGenerate(value);
            }}
            disabled={loading}
          >
            {loading ? 'Генерация...' : 'Спросить у ИИ'}
          </button>
        </div>
      )}

      <div style={{ border: '1px solid #ccc', height: 400, marginTop: 20, position: 'relative' }}>
        {elements.map((el) => (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: el.x,
              top: el.y,
              background: '#e6f7ff',
              padding: 10,
              borderRadius: 8,
            }}
          >
            {el.text}
          </div>
        ))}
      </div>
    </div>
  );
}
