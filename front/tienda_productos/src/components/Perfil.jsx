import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <h1>Perfil del usuario</h1>
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </>
  );
}

export default Perfil;
