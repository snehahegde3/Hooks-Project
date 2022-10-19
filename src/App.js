import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
//authcontext as mentioned is itself not a component, but AuthContext.Provider is
import AuthContext from './store/auth-context';
//Whatever child AuthContext hold and their child can all access the context or tap into it or listen to it

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   const storedUserLoggedInInfo = localStorage.getItem('isLoggedin');

  //   if (storedUserLoggedInInfo === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedin', '1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('isLoggedin');
  // };
  //here, the isLoggedIn is being sent to MainHeader
  //but it is never being used in the MainHeader itself
  //MainHeader further sends it down to Navigation where it is being used
  //this can become cumbersome when we have many components to push it down through
  //also lifting up from a lower component becomes hard
  //hence we use: useContext

  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login onLogin={authCtx.onLogin} />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.onLogout} />}
      </main>
    </React.Fragment>
  );
}

export default App;
