import './App.css';
import React, { useState, useEffect } from 'react';
import ExpenseModal from './components/ExpenseModal';
import CurrencyModal from './components/CurrencyModal';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState({ code: 'USD', rate: 1 });
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('expenses');
      if (raw) setItems(JSON.parse(raw));
      const cur = localStorage.getItem('currency');
      if (cur) setCurrency(JSON.parse(cur));
    } catch (e) {
      // ignore
    }
  }, []);

  // normalize items on load and compute initial balance
  useEffect(() => {
    setItems((current) => {
      const normalized = current.map((it) => ({
        id: it.id,
        description: it.description || '',
        amount: typeof it.amount === 'number' ? it.amount : parseFloat(it.amount) || 0,
        date: it.date || new Date().toISOString().slice(0, 10),
        category: Array.isArray(it.category) ? (it.category[0] || 'Sin categoría') : (it.category || 'Sin categoría'),
        type: it.type || 'Egreso',
        displayCurrency: it.displayCurrency || null,
        convertTo: it.convertTo || null,
        convertRate: it.convertRate || null,
      }));
      return normalized;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(items));
    // recompute balance
    const b = (items || []).reduce((acc, it) => {
      const amount = typeof it.amount === 'number' ? it.amount : parseFloat(it.amount) || 0;
      return acc + (it.type === 'Ingreso' ? amount : -amount);
    }, 0);
    setBalance(Math.round(b * 100) / 100);
  }, [items]);

  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  function handleSave(expense) {
    setItems((s) => [expense, ...s]);
  }

  function handleDelete(id) {
    setItems((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="App app-container">
      <header className="app-header">
        <h1>Gestor de Gastos</h1>
        <div className="header-actions">
          <button title="Seleccionar moneda" className="btn btn-secondary currency-btn" onClick={() => setCurrencyOpen(true)}>
            {currency.code}
          </button>
          <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            <span className="btn-icon">+</span>
            Nuevo gasto
          </button>
        </div>
      </header>

      <div>
        <div className="balance-label">Balance</div>
        <div className="balance-large">{(balance>=0? '': '-')}{Math.abs(balance).toFixed(2)}</div>
      </div>
      <main className="app-main">
  <ExpenseTable items={items} onDelete={handleDelete} currency={currency} />
      </main>

      <ExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} />
      <CurrencyModal isOpen={currencyOpen} onClose={() => setCurrencyOpen(false)} onSave={setCurrency} initial={currency} />
    </div>
  );
}

export default App;
