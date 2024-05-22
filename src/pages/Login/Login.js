import Styles from "../Login/Login.module.css"
import { useAuthenticator } from "../../Hooks/UseAtenticator/useAutenticator"
import {useState, useEffect } from 'react'
const Login = () => {
 
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] =useState("")
        

  const {login, error: authError, loading} = useAuthenticator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
  
        email,
        password // Corrigido para 'password' em minúsculas
    };

 

    const res= await login(user);
    console.log(res);
};

      useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

  return (
    <div className={Styles.login}>
       <h2>Cadastre-se para postar</h2>
      <p>Crie o seu usuário para Criar suas Histórias</p>
      <form  onSubmit={handleSubmit} > 
         
        <label>
          <span>E-mail:</span>
          <input type="text"
          name='email'
          required
          placeholder='E-mail do Usuário'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
           name="password"
          type="password"
          required
          placeholder='Digite a sua senha'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        { !loading && <button className='btn'>Cadastrar</button>}
        { loading && <button className='btn' disabled>aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login
