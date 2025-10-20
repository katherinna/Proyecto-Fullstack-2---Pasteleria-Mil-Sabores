import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { validarRun, validarCorreo } from '../../utils/validaciones';
import { addUser } from '../../Services/firestoreService';
import { useNavigate } from 'react-router-dom'; // ← React Router v6

const UserForm = () => {
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    correo: '',
    clave: '',
    fecha: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // ← reemplaza useHistory

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { run, nombre, correo, clave, fecha } = form;

    if (!validarRun(run))
      return setMsg(
        'Run inválido. Debe tener 7 u 8 dígitos y un dígito verificador (0-9 o K).'
      );
    if (!nombre) return setMsg('El nombre es obligatorio.');
    if (!validarCorreo(correo))
      return setMsg('Correo inválido. Debe ser un correo de Duoc UC o Gmail.');
    //if(!)validar edad.

    await addUser(form);
    setMsg('Usuario registrado con éxito.');
    //Comprobar si funciona
    console.log('Usuario registrado:', form);

    setTimeout(() => {
      navigate(
        correo === 'admin@duocuc.cl'
          ? `/perfil-admin?nombre=${nombre}`
          : `/perfil-cliente?nombre=${nombre}`
      );
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="run"
        label="RUN"
        value={form.run}
        onChange={handleChange}
        name="run"
        required
      />
      <Input
        id="nombre"
        label="Nombre"
        value={form.nombre}
        onChange={handleChange}
        name="nombre"
        required
      />
      <Input
        id="correo"
        label="Correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        name="correo"
        required
      />
      <Input
        id="clave"
        label="Clave"
        type="password"
        value={form.clave}
        onChange={handleChange}
        name="clave"
        required
      />
      <Input
        id="fecha"
        label="Fecha de Nacimiento"
        type="date"
        value={form.fecha}
        onChange={handleChange}
        name="fecha"
        required
      />
      <Button type="submit">Registrar</Button>
      <p style={{ color: 'crimson' }}>{msg}</p>
    </form>
  );
};

export default UserForm;
