import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, ListGroup} from 'react-bootstrap';
import { capitalize } from '../helpers'


//cateogry component which takes each category name and makes it a link to the proper category page.
const Categories = props => (

    <Grid>
      <h2 className="sectionTitle">Categories</h2>
      <ListGroup className="align-items-center">
        {props.categories.map(category => (
          <Link to={`/${category.path}`} key={category.name}>
            <ol className="categoryName">{capitalize(category.name)}</ol>
          </Link>
        ))}
      </ListGroup>
    </Grid>

);

function mapStateToProps({ categoriesReducer }) {
  let categories = categoriesReducer;
  return { categories };
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default connect(mapStateToProps)(Categories);


