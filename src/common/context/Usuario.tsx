import { createContext, ReactNode, useState } from 'react';

type UserContextProps = {
  children: ReactNode;
};

type UserContextType = {
  nome: string;
  setNome: (newState: string) => void;
  saldo: number;
  setSaldo: (newState: number) => void;
  
};

// export const UsuarioContext = createContext(0);
// UsuarioContext.displayName = 'Usuário';

export const UsuarioContext = createContext<UserContextType>({} as UserContextType);


export default function UsuarioProvider({ children }: UserContextProps) {
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState(0);
  return (
    <UsuarioContext.Provider
      value={{
        nome,
        setNome,
        saldo,
        setSaldo
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}