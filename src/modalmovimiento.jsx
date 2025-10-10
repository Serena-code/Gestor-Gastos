import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState} from 'react';

const initialFormData = {
    fecha: newDate().toISOString().slice(0, 10),
    categoria: '',
    descripcion: '',
    monto: ''
};

export default function ModalMovimiento({ isOpen, onClose, onSave }) {  
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fecha, categoria, descripcion, monto } = formData;    
        if (!formData.descripcion || !formData.monto || parseFloat(formData.monto) <= 0) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
        
        onSave(formData);
        setFormData(initialFormData);
    }


 return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Cargar Nuevo Movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    
                    {/* Campo de Fecha */}
                    <Form.Group className="mb-3" controlId="formFecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="fecha" 
                            value={formData.fecha} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    
                    {/* Campo Descripción */}
                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="descripcion" 
                            value={formData.descripcion} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    
                    {/* Campo Tipo (Ingreso/Egreso) */}
                    <Form.Group className="mb-3" controlId="formTipo">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select 
                            name="tipo" 
                            value={formData.tipo} 
                            onChange={handleChange}
                        >
                            <option value="Ingreso">Ingreso</option>
                            <option value="Egreso">Egreso</option>
                        </Form.Select>
                    </Form.Group>
                    
                    {/* Campo Monto */}
                    <Form.Group className="mb-3" controlId="formMonto">
                        <Form.Label>Monto ($)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="monto" 
                            value={formData.monto} 
                            onChange={handleChange} 
                            min="0.01"
                            step="0.01"
                            required 
                        />
                    </Form.Group>
                    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar Movimiento
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};