import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { validarRun, validarCorreo } from '../../utils/validaciones';
import { addUser } from '../../Services/firestoreService';
import { useHistory } from "react-router-dom";

const UserForm = () => {
  console.log("UserForm montado");
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    clave: '',
    fecha: '',
  });
  const [msg, setMsg] = useState('');
  const history = useHistory();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit disparado");
    const { run, nombre, apellidos, correo, clave, fecha } = form;

    // Validaciones
    if (!validarRun(run))
      return setMsg(
        'Run inválido. Debe tener 7 u 8 dígitos y un dígito verificador (0-9 o K).'
      );
    if (!nombre) return setMsg('El nombre es obligatorio.');
    if (!apellidos) return setMsg('Los apellidos son obligatorios.');
    if (!validarCorreo(correo))
      return setMsg('Correo inválido. Debe ser un correo de Duoc UC o Gmail.');

    try {
      // Guardar en Firestore con nombres de campos correctos
      await addUser({
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        contrasena: clave,
        fecha_nacimiento: fecha,
      });

      setMsg('Usuario registrado con éxito.');
      console.log('Usuario registrado:', form);

      setTimeout(() => {
        history.push(
          correo === 'admin@duocuc.cl'
            ? `/perfil-admin?nombre=${nombre}`
            : `/perfil-cliente?nombre=${nombre}`
        );
      }, 1000);
    } catch (error) {
      setMsg('Error al registrar usuario.');
      console.error('Error registrando usuario:', error);
    }
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
        id="apellidos"
        label="Apellidos"
        value={form.apellidos}
        onChange={handleChange}
        name="apellidos"
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