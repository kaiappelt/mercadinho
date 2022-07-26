import { Nav } from './styles';
// import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import {Badge} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCarrinhoContext } from '../../../common/context/Carrinho';

export default function NavBar() {
  const { quantidadeCarrinho } = useCarrinhoContext();
  const navigate = useNavigate();
 
  return (
    <Nav>
      {/* <Logo /> */}
      <IconButton
        onClick={() => navigate('/carrinho')}
        disabled={quantidadeCarrinho === 0}
      >
        <Badge
          badgeContent={quantidadeCarrinho}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  );
}