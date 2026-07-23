import { useState } from "react";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const [hello, setHello] = useState("");
  const [joke, setJoke] = useState("");
  const [date, setDate] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  async function getHello() {
    const response = await fetch(`${API_URL}/hello`);
    const data = await response.json();
    setHello(data.message);
  }

  async function getJoke() {
    const response = await fetch(`${API_URL}/joke`);
    const data = await response.json();
    setJoke(data.joke);
  }

  async function getFact() {
    if (!date) return;
    setLoading(true);
    const response = await fetch(`${API_URL}/fact?date=${date}`);
    const data = await response.json();
    setFact(data.fact);
    setLoading(false);
  }

  return (
    <div className="app">
      <h1>Факт дня</h1>
      <p className="subtitle">Шуточный генератор исторических событий</p>

      <div className="card">
        <h2>Приветствие</h2>
        <button onClick={getHello}>Поздороваться с сервером</button>
        {hello && <p className="result">{hello}</p>}
      </div>

      <div className="card">
        <h2>Случайная шутка</h2>
        <button onClick={getJoke}>Рассказать шутку</button>
        {joke && <p className="result">{joke}</p>}
      </div>

      <div className="card">
        <h2>Узнать факт</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={getFact} disabled={!date || loading}>
          {loading ? "Загрузка..." : "Получить факт"}
        </button>
        {fact && <p className="result">{fact}</p>}
      </div>
    </div>
  );
}

export default App;
