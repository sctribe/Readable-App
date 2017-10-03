import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { capitalize } from '../helpers'
import { getPost } from '../actions/posts';
import PostContent from './postsListComponent';
import Posts from './postsComponent';

//component that grabs correct post and does a reroute to the homepage when the user deletes the post from the post specific page

class PostPage extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      getPost: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { actions, match } = this.props;

    actions.getPost(match.params.postId);
  }

  deletePostReroute = () => {
    this.props.history.push('/');
  };

  render() {
    const { posts, match } = this.props;
    const post = posts.find(item => item.id === match.params.postId);

    if (!post) {
      return null;
    }

    return (
      <div>
          <Grid>
            <h1>{capitalize(post.title)}</h1>
            <PostContent post={post} isSingle onDelete={this.deletePostReroute} />
          </Grid>
        <Posts parentId={post.id} />
      </div>
    );
  }
}

function mapStateToProps({ postsReducer }) {
  let posts = postsReducer
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
