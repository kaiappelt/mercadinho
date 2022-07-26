import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarrinhoProvider from './common/context/Carrinho';
import { PagamentoProvider } from './common/context/Pagamento';
import UsuarioProvider from './common/context/Usuario';
import Carrinho from './pages/Carrinho';
import Feira from './pages/Feira';
import Login from './pages/Login';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <PagamentoProvider>
             <UsuarioProvider> 
              <Route path='/'>
                <Login />
              </Route>
               <CarrinhoProvider> 
                <Route path="/feira">
                  <Feira />
                </Route>
                <Route path="/carrinho">
                  <Carrinho />
                </Route>
              </CarrinhoProvider>
            </UsuarioProvider>
          </PagamentoProvider> 
      </Routes>
    </BrowserRouter>
  )
};