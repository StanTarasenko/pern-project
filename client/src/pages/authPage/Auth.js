// Modules
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Card, Button } from 'react-bootstrap';

// Utils
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/constants';
import { login, registration } from '../../http/userApi';
import { setIsAuth, setUser } from '../../features/userSlice';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const signIn = async () => {
    try {
      if (pathname === LOGIN_ROUTE) {
        const response = await login(email, password);
        dispatch(setIsAuth(true));
        dispatch(setUser(response));
        navigate(SHOP_ROUTE);
      }
      if (pathname === REGISTRATION_ROUTE) {
        await registration(email, password);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div style={{ 
        padding: "40px 20px", 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center" 
      }}
    >
      <Container className='d-flex justify-content-center'>
        <Card style={{ 
            width: "600px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
          }}>
          <h3 className='mt-4'>
            {pathname === LOGIN_ROUTE ? 'Login In' : 'Registration'}
          </h3>
          <Form className='d-flex flex-column p-4' style={{ width: '100%' }}>
            <Form.Control 
              className='mt-3' 
              placeholder='Type email...'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control 
              className='mt-3' 
              placeholder='Type password...'
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }} className='mt-4'>
              <div style={{ display: "flex", alignItems: "center" }}>
                Have no account?
                <Button 
                  onClick={() => navigate(REGISTRATION_ROUTE)} 
                  style={{ marginLeft: "8px", border: "none", background: "none", color: "dodgerblue" }}
                >
                  Registration
                </Button>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button variant="outline-success" style={{ width: '100%' }} onClick={() => signIn()}>
                  Enter
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Auth;
