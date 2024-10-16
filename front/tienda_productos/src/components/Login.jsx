import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ setIsAuth }) {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const envioDatos = (e) => {
    axios
      .post("http://localhost:8084/auth/login", {
        username,
        password,
      })
      .then((response) => {
        alert("Sesion iniciada");
        localStorage.setItem("token", response.data.token);
        console.log("token", response.data.token);
        setIsAuth(true);
        navigate("/productos");
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        alert("Error al enviar datos al servidor");
      });

    e.preventDefault();
    setUser("");
    setPassword("");
  };

  return (
    <>
      <h1>Inicio de Sesion</h1>
      <form action="" onSubmit={envioDatos}>
        <label htmlFor="">Usuario: </label>
        <input
          type="text"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={handleUser}
        />
        <label htmlFor="">Contraseña: </label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Iniciar Sesion</button>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </form>
    </>
  );
}

Login.PropTypes = {
  setIsAuth: PropTypes.func,
};

export default Login;
