import React, { useState, useEffect } from 'react';

export default function CurrencyModal({ isOpen, onClose, onSave, initial }) {
  const [code, setCode] = useState(initial?.code || 'USD');
  const [rate, setRate] = useState(initial?.rate ?? 1);

  useEffect(() => {
    if (isOpen) {
      setCode(initial?.code || 'USD');
      setRate(initial?.rate ?? 1);
    }
  }, [isOpen, initial]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const r = parseFloat(rate);
    if (Number.isNaN(r) || r <= 0) return; // ignore invalid
    onSave({ code, rate: Math.round(r * 100000) / 100000 });
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Seleccionar moneda</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Moneda destino
            <select value={code} onChange={(e) => setCode(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ARS">ARS</option>
              <option value="GBP">GBP</option>
            </select>
          </label>

          <label>
            Tipo de cambio (1 unidad origen = ? unidad destino)
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" step="0.0001" />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
