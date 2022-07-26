import { createContext, ReactNode, useContext, useState } from 'react';

type PagamentoContextprops = {
  children: ReactNode;
};

type PagamentoContexttype = {
  tiposPagamento: string;
  setTiposPagamento: (newState:string) => void;
      formaPagamento: number;
      setFormaPagamento: (newState: number) => void; 
      // nome: string;
      // juros: number;
      // id: number;
};

// export const UsuarioContext = createContext(0);
// UsuarioContext.displayName = 'Usuário';

export const PagamentoContext = createContext<PagamentoContexttype>({} as PagamentoContexttype);


// export const PagamentoContext = createContext(0);
// PagamentoContext.displayName = 'Pagamento';

export const PagamentoProvider = ({ children }: PagamentoContextprops) => {
  // const tiposPagamento = [{
  //   nome: 'Boleto',
  //   juros: 1,
  //   id: 1
  // }, {
  //   nome: 'Cartão de Crédito',
  //   juros: 1.3,
  //   id: 2
  // }, {
  //   nome: 'PIX',
  //   juros: 1,
  //   id: 3
  // }, {
  //   nome: 'Crediário',
  //   juros: 1.5,
  //   id: 4
  // }];
  
  const [tiposPagamento, setTiposPagamento] = useState('');
  const [formaPagamento, setFormaPagamento] = useState(0);
  return (
    <PagamentoContext.Provider value={{
      tiposPagamento,
      setTiposPagamento,
      formaPagamento,
      setFormaPagamento
    }}>
      {children}
    </PagamentoContext.Provider>
  );
};

export const usePagamentoContext = () => {
  const {
    tiposPagamento,
    formaPagamento,
    // setFormaPagamento
  } = useContext(PagamentoContext);

  // function mudarFormaPagamento(id: any) {
  //   const pagamentoAtual = tiposPagamento.fi((pagamento: { id: any; }) => pagamento.id === id);

  //   setFormaPagamento(pagamentoAtual);
  // }

  return {
    tiposPagamento,
    formaPagamento,
    // mudarFormaPagamento
  };
};