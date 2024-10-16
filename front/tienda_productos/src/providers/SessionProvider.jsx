import { useState, createContext } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [islogged, setIsLogged] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLogged(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
  };

  return (
    <>
      <SessionContext.Provider value={{ user, islogged, login, logout }}>
        {children}
      </SessionContext.Provider>
    </>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.node,
};

export { SessionProvider, SessionContext };
