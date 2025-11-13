import React, { useState } from "react";
import { askAI } from "./services/aiService";

export default function SmartBoard() {
  const [activeTab, setActiveTab] = useState("board");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState("formula");

  const handleAskAI = async () => {
    if (!prompt.trim()) return alert("Введите тему или задачу!");
    setLoading(true);

    let fullPrompt = "";
    if (selectedTaskType === "formula") {
      fullPrompt = `Создай 3 формулы по теме "${prompt}" с пояснениями в формате LaTeX.`;
    } else if (selectedTaskType === "steps") {
      fullPrompt = `Реши задачу шаг за шагом: ${prompt}. Объясни каждый шаг просто, как для ученика.`;
    } else if (selectedTaskType === "interactive") {
      fullPrompt = `Создай интерактивное задание по теме "${prompt}" — например, ребус, тест или мини-игру.`;
    }

    try {
      const aiAnswer = await askAI(fullPrompt);
      setResponse(aiAnswer || "Ошибка при получении ответа.");
    } catch (error) {
      setResponse("Ошибка соединения с ИИ.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Цветовая схема карточек
  const getCardStyle = () => {
    if (selectedTaskType === "formula")
      return { borderLeft: "6px solid #2ecc71", background: "#eafaf1" };
    if (selectedTaskType === "steps")
      return { borderLeft: "6px solid #3498db", background: "#e8f4fc" };
    return { borderLeft: "6px solid #f1c40f", background: "#fffbe6" };
  };

  return (
    <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ marginBottom: 20 }}>
        🧠 SmartBoard.AI — <span style={{ color: "#007bff" }}>помощник учителя</span>
      </h2>

      {/* Вкладки */}
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          onClick={() => setActiveTab("board")}
          style={{
            background: activeTab === "board" ? "#007bff" : "#f0f0f0",
            color: activeTab === "board" ? "#fff" : "#000",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          📋 Доска
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          style={{
            background: activeTab === "ai" ? "#007bff" : "#f0f0f0",
            color: activeTab === "ai" ? "#fff" : "#000",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          🤖 AI Помощник
        </button>
      </div>

      {/* --- ДОСКА --- */}
      {activeTab === "board" && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: 20,
            borderRadius: 10,
            background: "#fdfdfd",
          }}
        >
          <h3>📋 Интерактивная доска</h3>
          <p>Добавляйте сюда элементы, формулы или задачи, сгенерированные ИИ.</p>
          <p>💡 Перейдите во вкладку “AI Помощник”, чтобы создать новый контент.</p>
        </div>
      )}

      {/* --- AI ПОМОЩНИК --- */}
      {activeTab === "ai" && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: 20,
            borderRadius: 10,
            background: "#f8f9fa",
          }}
        >
          <h3>🤖 AI Помощник</h3>

          {/* Ввод темы */}
          <input
            type="text"
            value={prompt}
            placeholder="Введите тему или задачу..."
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #aaa",
              marginBottom: 10,
            }}
          />

          {/* Выбор типа задания */}
          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="radio"
                value="formula"
                checked={selectedTaskType === "formula"}
                onChange={(e) => setSelectedTaskType(e.target.value)}
              />
              🧮 Формулы
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                value="steps"
                checked={selectedTaskType === "steps"}
                onChange={(e) => setSelectedTaskType(e.target.value)}
              />
              📘 Пошаговое решение
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                value="interactive"
                checked={selectedTaskType === "interactive"}
                onChange={(e) => setSelectedTaskType(e.target.value)}
              />
              🎯 Интерактивное задание
            </label>
          </div>

          <button
            onClick={handleAskAI}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              background: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Сгенерировать ✨
          </button>

          {/* Ответ */}
          <div style={{ marginTop: 20, transition: "0.3s" }}>
            {loading ? (
              <p>⏳ Генерация...</p>
            ) : (
              response && (
                <div
                  style={{
                    ...getCardStyle(),
                    padding: 15,
                    borderRadius: 10,
                    whiteSpace: "pre-wrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    animation: "fadeIn 0.5s ease-in",
                  }}
                >
                  {selectedTaskType === "formula" && "🧮 Формулы:"}
                  {selectedTaskType === "steps" && "📘 Решение:"}
                  {selectedTaskType === "interactive" && "🎯 Интерактив:"}
                  <div style={{ marginTop: 8 }}>{response}</div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
