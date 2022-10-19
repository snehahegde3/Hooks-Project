import React, { useState, useEffect } from 'react';

//AuthContext itself isnt a component
//but it contains a component

//we need to provide this
//and consume it or listen to it

//providing is to wrap in jsx all the elements that are able to tap into that context
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

//custome ContextProvider for better management functions
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedin');

    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedin', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedin');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
