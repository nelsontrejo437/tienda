import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Productos from "./components/Productos";
import Perfil from "./components/Perfil";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      <Router>
        <div>
          <nav>
            {isAuth && (
              <ul>
                <li>
                  <a href="/productos">Tienda</a>
                </li>
                <li>
                  <a href="/perfil">Perfil</a>
                </li>
              </ul>
            )}
          </nav>

          <Routes>
            {/* Rutas publicas */}
            <Route
              path="/"
              element={
                isAuth ? (
                  <Navigate to="/productos" />
                ) : (
                  <Login setIsAuth={setIsAuth} />
                )
              }
            />
            <Route
              path="/register"
              element={isAuth ? <Navigate to="/productos" /> : <Register />}
            />

            {/*Rutas privadas*/}
            <Route
              path="/productos"
              element={isAuth ? <Productos /> : <Navigate to="/" />}
            />
            <Route
              path="/perfil"
              element={isAuth ? <Perfil /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
