import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, ControlLabel,} from 'react-bootstrap';
import { capitalize } from '../helpers'
import { addPost, editPostContent } from '../actions/posts';
import { getCommentForEdit, addNewComment, editComment } from '../actions/comments';

//creates modals required to create post or comment
const defaultPost = {
  id: '',
  author: '',
  title: '',
  category: '',
  body: '',
  parentId: '',
};

class PostModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixedCategory: PropTypes.string,
    actions: PropTypes.shape({
      addPost: PropTypes.func.isRequired,
      editPostContent: PropTypes.func.isRequired,
      getCommentForEdit: PropTypes.func.isRequired,
      addNewComment: PropTypes.func.isRequired,
      editComment: PropTypes.func.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      body: PropTypes.string,
      parentId: PropTypes.string,
    }),
    isEdit: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    fixedCategory: '',
    post: { ...defaultPost },
    isEdit: false,
  };

  state = { ...defaultPost };

  componentWillReceiveProps(nextProps) {
    const { fixedCategory, categories, post, actions } = nextProps;

    if (
      post.parentId &&
      nextProps.isOpen &&
      !this.props.isOpen &&
      nextProps.isEdit
    ) {
      actions.getCommentForEdit(post.id);
      return;
    }

    this.setState({
      category: fixedCategory || (categories.length && categories[0].name),
    });

    if (post.id) {
      this.setState({ ...post });
    } else {
      this.setState({ id: Math.random().toString(), parentId: post.parentId });
    }
  }

  closeModal = () => {
    this.setState({ ...defaultPost });
    this.props.onClose();
  };

  submit() {
    const { isEdit, actions, post } = this.props;

    if (isEdit) {
      if (post.parentId) {
        actions.editComment(this.state);
      } else {
        actions.editPostContent(this.state);
      }
    } else if (post.parentId) {
      actions.addNewComment(this.state);
    } else {
      actions.addPost(this.state);
    }
  }

  formChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, categories, fixedCategory, isEdit } = this.props;
    const { author, title, category, body, parentId } = this.state;
    const type = parentId ? 'Comment' : 'Post';

    return (
      <Modal show={isOpen} onHide={this.closeModal} restoreFocus={false}>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.submit();
            this.closeModal();
          }}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEdit ? 'Edit' : 'Add New'} {type}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isEdit && (
              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={`Author's Name`}
                  name="author"
                  value={author}
                  onChange={this.formChange}
                />
              </FormGroup>
            )}
            {!parentId && (
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={`Title`}
                  name="title"
                  value={title}
                  onChange={this.formChange}
                />
              </FormGroup>
            )}
            {!fixedCategory &&
            !isEdit &&
            !parentId && (
              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="category"
                  value={category}
                  onChange={this.formChange}>
                  {categories.map(item => (
                    <option value={item.name} key={item.name}>
                      {capitalize(item.name)}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
            )}
            <FormGroup>
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder={`Compose Your Thoughts`}
                name="body"
                value={body}
                onChange={this.formChange}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button bsStyle="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({ categoriesReducer }) {
  let categories = categoriesReducer;
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { addPost, editPostContent, getCommentForEdit, addNewComment, editComment },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
