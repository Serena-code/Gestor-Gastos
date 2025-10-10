import React from 'react';

export default function ExpenseTable({ items, onDelete, currency }) {
  if (!items || items.length === 0) {
    return <div className="empty">No hay gastos registrados.</div>;
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Tipo</th>
          <th>Categoría(s)</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it.id}>
            <td>{it.description}</td>
            <td>{it.type || 'Egreso'}</td>
            <td>{Array.isArray(it.category) ? it.category.join(', ') : it.category}</td>
            <td>{it.date}</td>
            <td className={it.type === 'Ingreso' ? 'amount-positive' : 'amount-negative'}>
              <div className="amount-main">{(it.type === 'Ingreso' ? '' : '-')}{Math.abs(it.amount).toFixed(2)}</div>
              {it.convertTo && it.convertRate && (
                <div className="converted-label">≈ {(Math.abs(it.amount) / it.convertRate).toFixed(2)} {it.convertTo}</div>
              )}
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => onDelete(it.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
