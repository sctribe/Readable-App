import React from 'react';
import { Grid } from 'react-bootstrap';
import Categories from './categoriesComponent';
import Posts from './postsComponent';

//component which holds the title of the app and creates posts and comments section
const Homepage = () => (
  <div>
      <Grid>
        <h1 className="appTitle">
        	<center>
        	Readable App
        	</center>
        </h1>
      </Grid>
    <Categories />
    <Posts />
  </div>
);

export default Homepage;
