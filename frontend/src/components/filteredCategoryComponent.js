import React from 'react';
import PropTypes from 'prop-types';
import Posts from './postsComponent';

//component that filters posts based on category when user visits the page of a specific category

const CategoryFiltered = props => <Posts category={props.match.params.category} />;

CategoryFiltered.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default CategoryFiltered;
