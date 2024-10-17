import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/Register.module.css";

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

    if (!username || !password || !nombre) {
      alert("Por favor, completa todos los campos");
      return;
    }

    axios
      .post("http://localhost:8090/auth/register", {
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
      <div className={style.container}>
        <h1>Registro</h1>
        <form action="" className={style.form} onSubmit={envioDatos}>
          <label className={style.label} htmlFor="">
            Nombre:{" "}
          </label>
          <input
            className={style.input}
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={handleNombre}
          />
          <label className={style.label} htmlFor="">
            Username:{" "}
          </label>
          <input
            className={style.input}
            type="text"
            placeholder="Ingresa tu username"
            value={username}
            onChange={handleUsername}
          />
          <label htmlFor="" className={style.label}>
            Contraseña:{" "}
          </label>
          <input
            className={style.input}
            type="password"
            placeholder="Ingresa una contraseña"
            value={password}
            onChange={handlePassword}
          />
          <button className={style.button} type="submit">
            Registrarse
          </button>
          <button
            className={`${style.button} ${style.secondaryButton}`}
            onClick={() => navigate("/")}
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
