import React from 'react';
import { Table } from 'react-bootstrap';

export default function TablaMovimientos({ movimientos }) {

    const calcularBalance = () => {
        return movimientos.reduce((total, mov) => {
            const monto = parseFloat(mov.monto);
            return mov.tipo === 'Ingreso' ? total + monto : total - monto;
        }, 0);
    };
    
    // Función auxiliar para colorear el texto según el tipo
    const getMontoStyle = (tipo) => {
        return { 
            color: tipo === 'Ingreso' ? 'green' : 'red', 
            fontWeight: 'bold'
        };
    };

    return (
        <>
            <h4>Detalle de Transacciones</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No hay movimientos registrados.</td>
                        </tr>
                    ) : (
                        movimientos.map(mov => (
                            <tr key={mov.id}>
                                <td>{mov.id}</td>
                                <td>{mov.fecha}</td>
                                <td>{mov.descripcion}</td>
                                <td>{mov.tipo}</td>
                                <td style={getMontoStyle(mov.tipo)}>
                                    {mov.tipo === 'Egreso' && '- '}
                                    ${parseFloat(mov.monto).toFixed(2)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="text-end">
                            <strong>Balance Total:</strong>
                        </td>
                        <td style={{ fontWeight: 'bold', color: calcularBalance() >= 0 ? 'blue' : 'red' }}>
                            ${calcularBalance().toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </>
    );
}