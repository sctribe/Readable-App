import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//component to create the home button which links to the app's homepage. visible on all app screens

const HomeButton= () => (
	<Navbar>
		<Navbar.Header>
	      <Navbar.Brand>
	        <Link className="homeButton" to="/">
	          Home
	        </Link>
	      </Navbar.Brand>
	    </Navbar.Header>
    </Navbar>
);

export default HomeButton;