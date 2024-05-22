import React from 'react';
import {BrowserRouter,Routes,Route,Navigate,Link} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { db } from './firebase/config';

//pages
import Home from './pages/Home/Home';
import Sobre from './pages/About/Sobre';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';


//hooks
import {useState,useEffect} from 'react';
import { useAuthenticator } from './Hooks/UseAtenticator/useAutenticator';

//context
import { AuthProvider, } from './context/AuthContext'

//componentes
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';





function App() {

  const [user,setUser] = useState(undefined)
  const {auth} = useAuthenticator();
  const {logout} = useAuthenticator(); 

  const loadingUser = user === undefined;

  useEffect (() =>{
  
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })

  },[auth])

  if(loadingUser) {
      return <p>Carregando...</p>
  }


  return (
   
    <div className="App">
  <AuthProvider value={{user}}>
  <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/Sobre' element={<Sobre />} />
  <Route path='/Login' element={!user ? <Login /> : <Navigate to='/' />} />
  <Route path='/Register' element={!user ? <Register /> : <Navigate to='/' />}/>
  <Route path='/CreatePost' element={user ? <CreatePost /> : <Navigate to='/' />} />
  <Route path='/Dashboard' element={user ? <Dashboard /> : <Navigate to='/' />} />
      </Routes>

      </div>
      </BrowserRouter>
      <Footer/>
  </AuthProvider>
      

    </div>
  );
}

export default App;
