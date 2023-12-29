// Modules
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Card, Button } from 'react-bootstrap';

// Utils
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';

const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
            <Form.Control className='mt-3' placeholder='Type email...'/>
            <Form.Control className='mt-3' placeholder='Type password...'/>
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
                <Button variant="outline-success" style={{ width: '100%' }}>
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
