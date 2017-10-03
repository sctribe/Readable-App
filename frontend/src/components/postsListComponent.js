import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/posts';
import { deleteComment } from '../actions/comments';
import PostFeatures from './postDetailsComponent';
import PostModal from './addPostModal';
import '../styles.css';

//component that gathers all data from api server and other components to fill posts/comments view

class PostContent extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      title: PropTypes.string,
      category: PropTypes.string,
      parentId: PropTypes.string,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      deletePost: PropTypes.func.isRequired,
      deleteComment: PropTypes.func.isRequired,
    }).isRequired,
    isSingle: PropTypes.bool,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    onDelete: null,
    isSingle: false
  };

  state = {
    isEditing: false,
  };

  //open and close post editing modal
  openModal = () => {
    this.setState({ isEditing: true });
  };

  closeModal = () => {
    this.setState({ isEditing: false });
  };

  deletePostClick = () => {
    const { actions, post, onDelete } = this.props;

    if (
      window.confirm(
        `Please confirm you want to delete this ${post.parentId
          ? 'comment'
          : 'post'}?`,
      )
    ) {
      if (post.parentId) {
        actions.deleteComment(post.id);
      } else {
        actions.deletePost(post.id);
      }

      onDelete && onDelete();
    }
  };

  postControlButtons() {
    return (
      <ButtonToolbar
        className='postControlButtons'>
        <Button bsStyle="link" onClick={this.openModal}>
          Edit
        </Button>
        <Button bsStyle="link" onClick={this.deletePostClick}>
          Delete
        </Button>
      </ButtonToolbar>
    );
  }

  getContent(categoryPath) {
    const { post } = this.props;
    const { isEditing } = this.state;

    return (
      <span className="postComment">
        {post.parentId && <span className="postCommentContent">{post.body}</span>}
        <PostFeatures post={post} categoryPath={categoryPath} />
        <PostModal
          isOpen={isEditing}
          onClose={this.closeModal}
          isEdit
          post={post}
        />
      </span>
    );
  }


  render() {
    const { post, categories, isSingle } = this.props;
    const category = categories.find(item => item.name === post.category);
    const categoryPath = category ? category.path : '';

    if (isSingle) {
      return (
        <div>
          <p>{post.body}</p>
          {this.postControlButtons()}
          {this.getContent(categoryPath)}
        </div>
      );
    }

    return (
      <ListGroupItem
        header={
          post.parentId ? (
            this.postControlButtons()
          ) : (
            <div>
              <Link to={`/${categoryPath}/${post.id}`}>
                <span >
                  <h3 className="postTitleLink">{post.title}</h3>
                </span>
              </Link>
              {this.postControlButtons()}
            </div>
          )
        }>
        {this.getContent(categoryPath)}
      </ListGroupItem>
    );
  }
}

function mapStateToProps({ categoriesReducer }) {
  let categories = categoriesReducer
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deletePost, deleteComment }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);
