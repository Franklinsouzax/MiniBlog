import { db } from '../../firebase/config';

import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut } from 'firebase/auth';
    
import { useState, useEffect } from 'react';

export const useAuthenticator = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    //cleanup
    //esvaziamento de memoria

    const [cancelled, setCancelled] = useState(false); 
    const auth = getAuth();

function checkIfIsCancelled() { 
    if (cancelled) {
        return;
    }
}

//register (Hook de registro)
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(user, {
                displayName: data.displayName
            });

            return user

        } catch (error) {
            console.error(error.message);
            setError( typeof error.message);

            let systemErrorMessage;
            
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha deve conter pelo menos 6 caracteres";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
            }
                setError(systemErrorMessage)
        }

        setLoading(false);
    }
    //Logout -sign out (Hook de Saida)

        const logout =() =>{
            checkIfIsCancelled();
            signOut(auth)

        }

        //login
        const login = async(data) => {
            checkIfIsCancelled();
        
            setLoading(true);
            setError(false);
        
            try {
                await signInWithEmailAndPassword(auth, data.email, data.password);
                setLoading(false);
                    
            } catch (error) {

                let systemErrorMessage;
                 
                if (error.message.includes("user-not-found")) {
                    systemErrorMessage = "Usuário não encontrado!"

                } else if (error.message.includes("wrong-password")) {
                    systemErrorMessage = "Senha incorreta"

                } else {
                    systemErrorMessage ="Usuario ou senha não encontrado"
                }
                    setError(systemErrorMessage)
            }         
            setLoading(false);
        };
        
    useEffect (()=>{
        return()=>setCancelled(true)
    },[])

    
    return {
        login,
        auth,
        createUser,
        error,
        loading,
        logout,
    };


};
