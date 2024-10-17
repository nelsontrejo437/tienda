import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "../styles/Login.module.css";

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
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    axios
      .post("http://localhost:8090/auth/login", {
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
        if (error.reponse && error.reponse.status === 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Error al enviar datos al servidor");
        }
      });

    setUser("");
    setPassword("");
  };

  return (
    <>
      <div className={style.container}>
        <h1>Inicio de Sesion</h1>
        <form action="" className={style.form} onSubmit={envioDatos}>
          <label className={style.label} htmlFor="">
            Usuario:{" "}
          </label>
          <input
            className={style.input}
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={handleUser}
          />
          <label className={style.label} htmlFor="">
            Contraseña:{" "}
          </label>
          <input
            className={style.input}
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={handlePassword}
          />
          <button className={style.button} type="submit">
            Iniciar Sesion
          </button>
          <button
            className={style.button}
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}

Login.PropTypes = {
  setIsAuth: PropTypes.func,
};

export default Login;
