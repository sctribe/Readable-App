import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from './actions/categories';
import HomeButton from './components/navBarComponent';
import Homepage from './components/homepageComponent';
import CategoryFiltered from './components/filteredCategoryComponent';
import PostPage from './components/postSelectedComponent';

class App extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchCategories: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchCategories();
  }

  render() {
    return (
      <div>
        <HomeButton />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/:category" component={CategoryFiltered} />
        <Route exact path="/:category/:postId" component={PostPage} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchCategories }, dispatch),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
