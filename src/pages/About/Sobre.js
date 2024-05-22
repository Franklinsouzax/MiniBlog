import styles from '../About/Sobre.module.css'
import CreatePost from '../CreatePost/CreatePost'
import { Link } from 'react-router-dom'
const Sobre = () => {
  return (
    <div className={styles.about} >
      <h2>Mini<span>Blog</span></h2>
      <p>
        Este projeto ensina o React no front-End e o firebase no Back-end.
      </p>
      <Link to='/CreatePost' className='btn'>
        Criar Post
      </Link>
    </div>
  )
}

export default Sobre
