import styles from'../CreatePost/CreatePost.module.css'

import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useInsertDocument } from '../../Hooks/UseAtenticator/useInsertDocuments'
import {useAuthValue } from '../../context/AuthContext'
import { addDoc } from 'firebase/firestore'
  

const CreatePost = () => {

  const [title, setTitle ]= useState("");
  const [image, setImage] =  useState("");
  const [body, setBody] = useState("");
  const [tags,setTags] = useState("");
  const [formError,setFormError] =useState("");

  const {user} = useAuthValue()
  
  const {insertDocument,response} = useInsertDocument("posts");

  // função de envio 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    //validade image URL
    
    //criar  o array de tags

    //checar todos os envios 

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    });
    console.log(addDoc)

    
    //redirect to home page
    console.log("formlário enviado")

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar postagens </h2>
      <p>escreva oque quiser e compartilhe o seu conhecimento !</p>
      <form onSubmit={handleSubmit}>
      <label>
        <span>Título</span>
      <input
      type="text"
      name="title"
      required
      placeholder='Pense em um bom titulo, ok?'
      onChange={(e)=> setTitle(e.target.value)}
      value={title}
      />

      </label>
      <label>
        <span>URl da imagem</span>
      <input
      type="text"
      name="image"
      required
      placeholder='Insira uma imagem que represente o seu Post.'
      onChange={(e)=> setImage(e.target.value)}
      value={image}
      />
      </label>
      <label>
        <textarea 
        name="body" 
        required
        placeholder='Insira o seu conteudo aqui!'
        onChange={(e)=> setBody(e.target.value)}
        value={body}
        />

         <input
      type="text"
      name="tags"
      required
      placeholder='Coloque as suas tags seperadas por vírgula.'
      onChange={(e)=> setTags(e.target.value)}
      value={tags}
      />

      </label>
      {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;