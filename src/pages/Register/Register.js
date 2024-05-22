import { useAuthenticator } from '../../Hooks/UseAtenticator/useAutenticator'
import Styles from '../Register/Register.module.css'

import {useState, useEffect } from 'react'

const Register = () => {
    const [ displayName, setDisplayName ] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] =useState("")
          

    const {createUser, error: authError, loading} = useAuthenticator();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      const user = {
          displayName,
          email,
          password 
      };
  
      if (password !== confirmPassword) {
          setError("As senhas precisam ser iguais");
          return;
      }
  
      const res = await createUser(user);
      console.log(res);
  };
  
        useEffect(() => {
          if (authError) {
              setError(authError);
          }
      }, [authError]);

  return (
    <div className={Styles.register}>
      <h2>Cadastre-se para postar</h2>
      <p>Crie o seu usuário para Criar suas Histórias</p>
      <form  onSubmit={handleSubmit} > 
        <label>
          <span>Nome:</span>
          <input type="text"
          name='displayName'
          required
          placeholder='Nome do Usuário'
          value={displayName}
          onChange={(e)=>setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirme a sua senha:</span>
          <input type="password"
          name='confirmPassword'
          required
          placeholder='Confirme a sua senha'
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </label>
        { !loading && <button className='btn'>Cadastrar</button>}
        { loading && <button className='btn' disabled>aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register
