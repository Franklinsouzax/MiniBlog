
import { NavLink } from 'react-router-dom'

import Styles from  "../Navbar/Navbar.module.css"
import { useAuthValue } from '../../context/AuthContext'
import { useAuthenticator } from '../../Hooks/UseAtenticator/useAutenticator';
const Navbar = () => {
    const {user} = useAuthValue();
    const { logout } = useAuthenticator();

  return (
    <div>
     <nav className={Styles.navbar}>
        <NavLink className={Styles.brand} to='/'>
          Mini<span>Blog</span>
        </NavLink>
        <ul className={Styles.links_list}>
          <li>
            <NavLink to='/' className={Styles.link}>
              Home
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to='/Login' className={Styles.link}>
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink to='/Register' className={Styles.link}>
                  Cadastre-se
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to='/CreatePost' className={Styles.link}>
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink to='/Dashboard' className={Styles.link}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={logout} className={Styles.link}>
                  Sair
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
