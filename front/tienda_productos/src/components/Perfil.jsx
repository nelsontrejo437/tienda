import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/perfil.css";

function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/perfil", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <p>Cargando datos del perfil...</p>;
  }

  return (
    <>
      <div className="perfil-container">
        <h1>Perfil del usuario</h1>
        <div className="tarjetas">
          <div className="card">
            <img
              src={user.imagen || "https://via.placeholder.com/150"}
              alt="Usuario"
              className="card-img"
            />
            <h2>Nombre: {user.name}</h2>
            <p>Usuario: {user.username}</p>
          </div>

          <div className="card">
            <h2>Informacion</h2>
            <p>
              <strong>Nombre: </strong>
              {user.name}
            </p>
            <p>
              <strong>Username: </strong>
              {user.username}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
