// Modules
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants';
import { selectIsAuth, selectUser, setIsAuth, setUser } from '../features/userSlice';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavLink } from 'react-bootstrap';

const Layout = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const isUserEmpty = Object.keys(user).length === 0;

  const logOut = () => {
    dispatch(setIsAuth(false));
    dispatch(setUser({}));
    localStorage.setItem('token', '');
    navigate(LOGIN_ROUTE);
  }

  const moveToShop = () => {
    return navigate(SHOP_ROUTE);
  };

   return (
      <div style={{ 
          display: "flex",
          flexDirection: "column" 
        }}>
        <Navbar expand="lg" style={{ 
          position: "fixed", 
          width: "100%", 
          background: "darkcyan" 
          }}>
        <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav 
            className="me-auto" 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              width: "100%"
            }}
            >
           <NavLink 
            style={{ 
              color:"white",
              fontSize: "22px" 
            }} 
            onClick={moveToShop}>
              SHOP
            </NavLink>
              <Nav className="ml-auto" style={{color: 'black'}}>
                {isAuth && <Button
                  variant={"outline-light"}
                  onClick={() => navigate(ADMIN_ROUTE)}
                  style={{ marginRight: "15px" }}
                >
                  Admin panel
                  </Button> }
                {isUserEmpty
                  ? <Button 
                    variant={"outline-light"}
                    onClick={() => navigate(LOGIN_ROUTE)} 
                  >
                    Sign In
                  </Button>
                  : <Button
                      variant={"outline-light"}
                      onClick={() => logOut()}
                      className="ml-4"
                    >
                      Sign out
                    </Button>
                }
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
          <div>
              <Outlet />
          </div>
      </div>
   );
}

export default Layout;
