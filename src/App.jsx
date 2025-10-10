import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ModalMovimiento from './modalmovimiento';
import TablaMovimientos from './TablaMovimientos';

// Datos iniciales de ejemplo
const initialMovimientos = [
    { id: 1, fecha: '2025-01-15', descripcion: 'Sueldo enero', tipo: 'Ingreso', monto: 85000.00 },
    { id: 2, fecha: '2025-01-16', descripcion: 'Alquiler', tipo: 'Egreso', monto: 45000.00 },
];

export default function App() {
    const [movimientos, setMovimientos] = useState(initialMovimientos);
    const [showModal, setShowModal] = useState(false);
    
    // Función que se pasa al Modal para añadir el nuevo movimiento
    const agregarMovimiento = (nuevoMovimiento) => {
        // Simula la asignación de un ID, que en un backend sería automático
        const newId = movimientos.length > 0 ? Math.max(...movimientos.map(m => m.id)) + 1 : 1;
        
        const movimientoConId = { 
            ...nuevoMovimiento, 
            id: newId,
            monto: parseFloat(nuevoMovimiento.monto) // Asegurar que el monto sea un número
        };
        
        setMovimientos(prev => [...prev, movimientoConId]);
        setShowModal(false); // Cierra el modal al guardar
    };

    return (
        <Container className="mt-4">
            <h1>Registro de Movimientos</h1>
            
            <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
                ➕ Nuevo Movimiento
            </Button>
            
            <TablaMovimientos movimientos={movimientos} />
            
            <ModalMovimiento 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onSave={agregarMovimiento} 
            />
        </Container>
    );
}