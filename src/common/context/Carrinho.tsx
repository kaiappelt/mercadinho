import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { usePagamentoContext } from './Pagamento';
import { UsuarioContext } from './Usuario';

type CarrinhoContextProps = {
  children: ReactNode;
};

type CarrinhoContextType = {
  carrinho: any[];
  setCarrinho: (newState: any) => void;
  quantidadeCarrinho: number;
  setQuantidadeCarrinho: (newState: number) => void;
  valorTotal: number;
  setValorTotal: (newState: number) => void;
  
};

// export const UsuarioContext = createContext(0);
// UsuarioContext.displayName = 'Usuário';

export const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

export default function CarrinhoProvider({ children }: CarrinhoContextProps) {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeCarrinho,
        setQuantidadeCarrinho,
        valorTotal,
        setValorTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext() {
  const {
    carrinho,
    setCarrinho,
    quantidadeCarrinho,
    setQuantidadeCarrinho,
    valorTotal,
    setValorTotal
  } = useContext(CarrinhoContext);

  const {
    saldo,
    setSaldo
  } = useContext(UsuarioContext);

  const { formaPagamento } = usePagamentoContext();

  const mudarQuantidade = (id: any, quantidade: number) => carrinho.map((item: { id: any; quantidade: any; }) => {
    if (item.id === id) item.quantidade += quantidade;
    return item;
  });

  function adicionarProduto(novoProduto: { id: any; quantidade: number; }) {
    const temOProduto = carrinho.some((item: { id: any; }) => item.id === novoProduto.id);
    let novoCarrinho = [...carrinho];
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      novoCarrinho.push(novoProduto);
      return setCarrinho(novoCarrinho);
    } 
    novoCarrinho = mudarQuantidade(novoProduto.id, 1);
    setCarrinho(novoCarrinho);
  }

  function removerProduto(id: any) {
    const produto = carrinho.find((item: { id: any; }) => item.id === id);
    const ultimo = produto.quantidade === 1;
    let novoCarrinho;
    if (ultimo) {
      novoCarrinho = carrinho.filter((item: { id: any; }) => item.id !== id);
      return setCarrinho(novoCarrinho);
    } 
    novoCarrinho = mudarQuantidade(id, -1);
    setCarrinho(novoCarrinho);
  }

  function comprar() {
    setCarrinho([]);
    setSaldo(saldo - valorTotal);
  }

  useEffect(() => {
    const { novaQuantidade, novoTotal } = carrinho.reduce((contador: { novaQuantidade: any; novoTotal: number; }, novoItem: { quantidade: number; valor: number; }) => ({
      novaQuantidade: contador.novaQuantidade + novoItem.quantidade,
      novoTotal: contador.novoTotal + (novoItem.valor * novoItem.quantidade)
    }), { novaQuantidade: 0, novoTotal: 0 });
    setQuantidadeCarrinho(novaQuantidade);
    setValorTotal(novoTotal * formaPagamento);
  },[carrinho, formaPagamento, setQuantidadeCarrinho, setValorTotal]);

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    quantidadeCarrinho,
    valorTotal,
    comprar
  };
}