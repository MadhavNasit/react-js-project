import React from 'react';
import './App.css';
import addproject from './components/projects/addproject';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom';
import projects from './components/projects/projects';
import updateproject from './components/projects/updateproject';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from './components/user/login';
import forgotpassword from './components/user/forgotpassword';
import registeruser from './components/user/registeruser';
import PrivateRoute from './security/PrivateRoute';
import gridexample from './components/projects/gridexample';
import { removeUserSession } from './security/auth';
import { Card, CardBody, CardGroup, Col, Container, Form, Row} from 'reactstrap';

function App(props) {

  const LoginContainer = () => (
    <div className="app flex-row align-items-center mt-5">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <CardGroup>
              <Card className="p-2 user-card">
                <CardBody>
                  <Form>
                    <div className="d-flex mb-3 nav-user">
                      <NavLink to="/login" className="flex-fill" activeClassName="active">LogIn</NavLink>
                      <NavLink to="/register" className="flex-fill" activeClassName="active">Register</NavLink>
                    </div>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route path="/login" component={login} />
                    <Route path='/register' component={registeruser} />
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )

  const UserService = () => (
    <div className="mt-5">
      <Route path='/forgotpassword' component={forgotpassword} />
    </div>

  )

  const DefaultContainer = () => (
    <div>
      <nav className="navbar navbar-expand-lg navheader navbar-dark bg-dark justify-content-between">
        <div><Link to={'/projects'} className="navbar-brand">React Project</Link></div>
        <div>
          <div className="collapse navbar-collapse" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={'/projects'} className="nav-link" activeClassName="active">CRUD Example</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/gridexample'} className="nav-link" activeClassName="active">Grid Example</NavLink>
              </li>
              <li className="nav-item ml-4">
                <span className="nav-link">Welcome, {sessionStorage.getItem('userName')}</span>
              </li>
              <li className="nav-item my-auto">
                <Link to={'/login'} onClick={() => { removeUserSession() }} className="btn btn-danger btn-sm">LogOut</Link>
              </li>
            </ul>
          </div>
        </div>

      </nav>
      <div className="container mt-5">
        <PrivateRoute exact path='/addproject' component={addproject} />
        <PrivateRoute path='/updateproject/:id' component={updateproject} />
        <PrivateRoute path='/projects' component={projects} />
        <PrivateRoute path='/gridexample' component={gridexample} />
      </div>
    </div>
  )
  return (
    // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
      <div>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/(login)" component={LoginContainer} />
          <Route exact path="/(register)" component={LoginContainer} />
          <Route exact path="/(forgotpassword)" component={UserService} />
          <Route component={DefaultContainer} />
        </Switch>
      </div>
    </Router>
    // </AuthContext.Provider>

  );
}

export default App;
