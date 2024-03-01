import React, { useState, MouseEvent, FormEvent, ChangeEvent } from "react";
import { Navbar, Container, Nav, Form, Button, NavLink, NavbarCollapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faClapperboard } from "@fortawesome/free-solid-svg-icons";
import CategoryList from "./Categories/CategoriesList";
import { Link } from "react-router-dom";
import Message from "./common/message";

const NavigationMenu = () => {
  
  const [ShowCategoryList, setShowCategoryList] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const categoryClickHandler = (event: MouseEvent) => {
    sessionStorage.setItem('lastVisitedUrl', window.location.href);
    setShowCategoryList(true);  
  };

  const hideCategoryList = () => {
    setShowCategoryList(false);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    if 
    (
      encodedQuery !== 'movies-coming' &&
      encodedQuery !== 'movies-in-theaters' &&
      encodedQuery !== 'top-rated-india' &&
      encodedQuery !== 'top-rated-movies'
    ) {
      setShowMessage(true)
      return (<></>)
    }
    window.location.href = `/categories/${encodedQuery}`
  };

  const searchButtonClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    if 
    (
      encodedQuery !== 'movies-coming' &&
      encodedQuery !== 'movies-in-theaters' &&
      encodedQuery !== 'top-rated-india' &&
      encodedQuery !== 'top-rated-movies'
    ) {
      setShowMessage(true)
      return (<></>)
    }
    window.location.href = `/categories/${encodedQuery}`
  } 

  const handleCloseMessage = () => {
    setShowMessage(false);
  }; 

  return (
    <Navbar bg="dark" expand="lg" as={NavLink} sticky="top">
    <Container>
      <Navbar.Brand as={Link} 
        to="/" 
        style={{color:'Red', 
        fontSize:'2em', 
        marginRight: '100px', 
        fontFamily: "Protest Revolution, sans-serif"}}
      >
        <FontAwesomeIcon
            icon={faClapperboard}
            className="me-2"
        />
        MoviesOnTheTip
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'rgba(250, 10, 10, 0.8)' }}/>
      <NavbarCollapse>
        <Nav className="me-auto">

          <Nav.Link 
            as={Link} 
            to='/home' 
            className="navlink"
            style={{color:'white', fontSize: '1.4em', marginRight: '50px'}}
          >
            Home
          </Nav.Link>

          <Nav.Link 
            as={Link} 
            to="/categories" 
            className="navlink"
            style={{color:'white', fontSize: '1.4em', marginRight: '50px'}} 
            onClick={categoryClickHandler}
          >
            Categories
          </Nav.Link>
          {
            ShowCategoryList &&
            (
              <div>
                <CategoryList hideCategoryList={hideCategoryList}/>
              </div>
            )
          }

          <Nav.Link 
            as={Link} 
            to={"/categories/favourite"} 
            className="navlink"
            style={{color:'white', fontSize: '1.4em', marginRight: '12%'}}
          >
            Favorite
          </Nav.Link>
        </Nav>

        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search category..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="me-1"
            aria-label="Search"
            style={{height:'40px', marginTop: '5px', width:'200px'}}
          />
          <Button 
            variant="danger" 
            style={{height:'40px', marginTop: '5px'}} 
            onClick={searchButtonClickHandler}
          >
            Search
          </Button>
          {
            showMessage && (
                <Message 
                message={"Searched item Not found!"} 
                handleClose={handleCloseMessage} 
            />
            )
          }
        </Form>

      </NavbarCollapse>
    </Container>
    </Navbar>
)
}

export default NavigationMenu