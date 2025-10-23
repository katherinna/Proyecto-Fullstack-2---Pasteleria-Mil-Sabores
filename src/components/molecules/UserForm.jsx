import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { validarRun, validarCorreo } from '../../utils/validaciones';
import { addUser } from '../../Services/firestoreService';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    correo: '',
    clave: '',
    fecha: '',
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { run, nombre, correo, clave, fecha } = form;

    // Validaciones
    if (!validarRun(run)) {
      setMsg('Run inválido. Debe tener 7 u 8 dígitos y un dígito verificador (0-9 o K).');
      return;
    }
    if (!nombre) {
      setMsg('El nombre es obligatorio.');
      return;
    }
    if (!validarCorreo(correo)) {
      setMsg('Correo inválido. Debe ser un correo de Duoc UC o Gmail.');
      return;
    }

    try {
      setIsLoading(true);
      setMsg('');
      
      // Log data being sent
      console.log('Enviando datos:', form);
      
      const result = await addUser(form);
      
      if (result.id) {
        console.log('Usuario registrado exitosamente con ID:', result.id);
        setMsg('Usuario registrado con éxito.');
        
        // Esperar 1 segundo antes de redirigir
        setTimeout(() => {
          navigate(
            correo === 'admin@duocuc.cl'
              ? `/perfil-admin?nombre=${nombre}`
              : `/perfil-cliente?nombre=${nombre}`
          );
        }, 1000);
      } else {
        console.error('Error al registrar:', result);
        setMsg('Error al registrar usuario. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMsg('Error en el servidor. Por favor intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <Input
        id="run"
        label="RUN"
        value={form.run}
        onChange={handleChange}
        name="run"
        required
        disabled={isLoading}
      />
      <Input
        id="nombre"
        label="Nombre"
        value={form.nombre}
        onChange={handleChange}
        name="nombre"
        required
        disabled={isLoading}
      />
      <Input
        id="correo"
        label="Correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        name="correo"
        required
        disabled={isLoading}
      />
      <Input
        id="clave"
        label="Clave"
        type="password"
        value={form.clave}
        onChange={handleChange}
        name="clave"
        required
        disabled={isLoading}
      />
      <Input
        id="fecha"
        label="Fecha de Nacimiento"
        type="date"
        value={form.fecha}
        onChange={handleChange}
        name="fecha"
        required
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? 'Registrando...' : 'Registrar'}
      </Button>
      {msg && (
        <p className={msg.includes('éxito') ? 'success-message' : 'error-message'}>
          {msg}
        </p>
      )}
    </form>
  );
};

export default UserForm;