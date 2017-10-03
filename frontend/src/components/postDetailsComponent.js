import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { capitalize } from '../helpers'
import { votePost } from '../actions/posts';
import { voteComment } from '../actions/comments';
import '../styles.css';

//component that fills in the post features including author,score, and date

const stringifyVoteScore = voteScore => {
  if (voteScore > 0) {
    return `+${voteScore}`;
  }

  return voteScore;
};

const getDate = time => {
  const date = new Date(time);
  return date.toLocaleString();
};

class PostFeatures extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      comments: PropTypes.array,
      parentId: PropTypes.string,
    }).isRequired,
    actions: PropTypes.shape({
      votePost: PropTypes.func.isRequired,
      voteComment: PropTypes.func.isRequired,
    }).isRequired,
    categoryPath: PropTypes.string.isRequired,
  };

  handleVote(option) {
    const { post, actions } = this.props;

    if (post.parentId) {
      actions.voteComment({ id: post.id, option });
    } else {
      actions.votePost({ id: post.id, option });
    }
  }

  render() {
    const { post, categoryPath } = this.props;

    return (
      <div>
        <div className="postAuthor">By: {post.author}</div>
        <div className="postFooter">
          <div className="postFooterButtons">
            <div className="btn-group">
              <Button
                className="postScore"
                bsSize="small"
                disabled>
                {stringifyVoteScore(post.voteScore)}
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.handleVote('upVote')}>
                <Glyphicon glyph="arrow-up" />
              </Button>
              <Button bsSize="small" onClick={() => this.handleVote('downVote')}>
                <Glyphicon glyph="arrow-down" />
              </Button>
            </div>
            {!post.parentId && (
              <Link to={`/${categoryPath}/${post.id}`}>
                <Button bsSize="small">
                  <Glyphicon glyph="comment" /> {post.comments.length}
                </Button>
              </Link>
            )}
          </div>
          <div className="postFooterDate">
            {getDate(post.timestamp)}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ votePost, voteComment }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(PostFeatures);
