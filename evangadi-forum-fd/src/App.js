import { useContext, useEffect } from 'react';
import './App.css';
import { UserContext } from './component/context/UserContext';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './component/signUp/SignUp'
import Land from './component/landing/Landing'
import Header from './component/header/Header'


function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      const userRes = axios.get('http://localhost:4000/api/users', { headers: { 'x-auth-token': token } });
      
      setUserData({
        token: userRes.data.token,
        user: {
          id: userRes.data.id,
          display_name: userRes.data.display_name,
        }
      })
    }
  }

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem('auth-token', '')
  }

  useEffect(() => {
    checkLoggedIn();

  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path='/signup' element={<><Header/> <SignUp /></>} />
          <Route path='/login' element={<><Header/>  <Land/></>} />

          <Route path='/' element={<><Header logout={logout}/> <Land/></>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
