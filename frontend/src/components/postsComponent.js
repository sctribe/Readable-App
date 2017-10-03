import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, ListGroup, ButtonToolbar, DropdownButton, MenuItem, Button, } from 'react-bootstrap';
import { posts } from '../actions/posts';
import PostModal from './addPostModal';
import PostItem from './postsListComponent';
import * as sortOptions from '../sortFunctions';
import '../styles.css';

//component creates posts section as gives sort filtering and capability to add new post

class Posts extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      posts: PropTypes.func.isRequired,
    }).isRequired,
    category: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    parentId: PropTypes.string,
  };

  static defaultProps = {
    category: '',
    parentId: null,
  };

  state = {
    sortBy: sortOptions.sortDefault(),
    isModalOpen: false,
  };

  //open and closes add post modal
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  componentDidMount() {
    const { category, actions, parentId } = this.props;

    if (!parentId) {
      actions.posts(category);
    }
  }


  render() {
    const { posts, category, parentId } = this.props;
    const { sortBy, isModalOpen } = this.state;
    const items = parentId
      ? posts.find(item => item.id === parentId).comments
      : posts;
    const filteredItems = items.filter(
      item => !category || item.category === category,
    );
    const sortedItems = filteredItems.sort(
      sortOptions.compareFunction(sortBy),
    );

    return (
      <div>
        <Grid>
          <div className="posts">
            <h2 className="sectionTitle">{parentId ? 'Comments' : 'Posts'}</h2>
            <ButtonToolbar className="sortDropDown">
              <DropdownButton
                title={ <span> Sort: <strong>{sortOptions.sortBy(sortBy)}</strong></span>}
                onSelect={(eventKey, event) => {
                  this.setState({ sortBy: eventKey });
                }}
                id={`${parentId ? 'comments' : 'posts'}-sort`}>
                {sortOptions.getOptions().map(([key, value]) => (
                  <MenuItem eventKey={key} active={key === sortBy} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </DropdownButton>
              <Button bsStyle="primary" onClick={this.openModal}>
                Add
              </Button>
            </ButtonToolbar>
          </div>
          <ListGroup>
            {sortedItems.map(item => (
              <PostItem post={item} isComment key={item.id} />
            ))}
          </ListGroup>
        </Grid>
        <PostModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          fixedCategory={category}
          post={{ parentId }}
        />
      </div>
    );
  }
}

function mapStateToProps({ postsReducer, categories }) {
  let posts = postsReducer
  return { posts, categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ posts }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
