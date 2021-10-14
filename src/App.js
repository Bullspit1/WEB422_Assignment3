import './App.css';

import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import NotFound from './NotFound';

function App() {

  //searchString / setSearchString with the default value: ""
  const [searchString, setSearchString] = useState("");

  let history = useHistory();

function handleSubmit(e){
  e.preventDefault(); //prevent default action
  history.push(`/Restaurants?borough=${searchString}`); //navigates to the route
  setSearchString(""); //reset searchString to ""
}

  return (
  <>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>New York Restaurants</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/Restaurants">
          <Nav.Link>Full List</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/About">
          <Nav.Link>About</Nav.Link>
        </LinkContainer>
      </Nav>
      <Form onSubmit={handleSubmit} inline>
        <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} 
        onChange={(e) => setSearchString(e.target.value)} />
        <Button type="submit" variant="outline-success">Search</Button>
      </Form>
      </Navbar.Collapse>
    </Navbar>
    <br />
    
    <Container>
      <Row>
        <Col>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Restaurants"/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/Restaurants">
              <Restaurants />
            </Route>
            <Route exact path="/Restaurant/:id">
              <Restaurant />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;
