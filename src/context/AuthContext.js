import React, { useContext, createContext } from 'react';

// Criando o contexto
const AuthContext = createContext();

// Exportando o provedor de autenticação
export function AuthProvider({ children, value }) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para acessar o contexto de autenticação
export function useAuthValue() {
    return useContext(AuthContext);
}

// Exportando o contexto para uso em outros componentes
export default AuthContext;
