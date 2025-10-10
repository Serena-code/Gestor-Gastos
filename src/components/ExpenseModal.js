import React, { useState, useEffect } from 'react';

export default function ExpenseModal({ isOpen, onClose, onSave }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Egreso'); // 'Ingreso' | 'Egreso'
  const [convertTo, setConvertTo] = useState(''); // '' | 'USD' | 'EUR'
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setDescription('');
      setAmount('');
      setDate('');
  setCategory('');
      setType('Egreso');
      setConvertTo('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return setError('Descripción requerida');
    const num = parseFloat(amount);
    if (Number.isNaN(num) || num <= 0) return setError('Monto debe ser mayor que 0');
    // map conversion rates: ARS per unit of foreign currency
    const convRates = { USD: 1425, EUR: 2000 };
    const expense = {
      id: Date.now(),
      description: description.trim(),
      amount: Math.round(num * 100) / 100,
      date: date || new Date().toISOString().slice(0, 10),
      category: category || 'Sin categoría',
      type: type || 'Egreso',
      convertTo: convertTo || null,
      convertRate: convertTo ? convRates[convertTo] : null,
    };
    onSave(expense);
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Nuevo gasto</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Tipo
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </label>

          <label>
            Descripción
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Compra supermercado"
            />
          </label>

          <label>
            Monto
            <div className="amount-with-convert">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                type="number"
                step="0.01"
              />
              <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)} className="convert-select">
                <option value="">--</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            {convertTo && (
              <div className="convert-preview">
                {(() => {
                  const rates = { USD: 1425, EUR: 2000 };
                  const r = rates[convertTo] || 1;
                  const num = parseFloat(amount) || 0;
                  const conv = (num / r) || 0;
                  return `≈ ${conv.toFixed(2)} ${convertTo}`;
                })()}
              </div>
            )}
          </label>

          <label>
            Fecha
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </label>

          <label>
            Categoría
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">-- seleccionar --</option>
              <option value="Venta">Venta</option>
              <option value="Compra">Compra</option>
              <option value="Regalo">Regalo</option>
              <option value="Servicio">Servicio</option>
              <option value="Otros">Otros</option>
            </select>
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
