import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const envioDatos = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/auth/register", {
        name: nombre,
        username: username,
        password: password,
      })
      .then((response) => {
        alert("Usuario registrado");
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Error al registrar el usuario");
      });
  };

  return (
    <>
      <h1>Registro</h1>
      <form action="" onSubmit={envioDatos}>
        <label htmlFor="">Nombre: </label>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={handleNombre}
        />
        <label htmlFor="">Username: </label>
        <input
          type="text"
          placeholder="Ingresa tu username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="">Contraseña: </label>
        <input
          type="password"
          placeholder="Ingresa una contraseña"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Registrarse</button>
        <button onClick={() => navigate("/")}>Iniciar Sesion</button>
      </form>
    </>
  );
}

export default Register;
