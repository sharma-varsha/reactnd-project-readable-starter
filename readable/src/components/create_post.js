
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';


import { createPost,editPost,fetchPostDetails} from '../actions';

class NewPost extends Component {
  componentDidMount() {
    if (this.props.match.params.postsid) {
      console.log('match found');
      this.props.fetchPostDetails(this.props.match.params.postsid);
    }
  }

  renderField = (field) => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        {field.type === 'select' ? (
          <field.type 
            type='text' 
            disabled={field.onEditDisabled} 
            {...field.input}
          >
            
          <option disabled></option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </field.type>
        ) : (
          <field.type 
            type='text'
            className="form-control"
            disabled={field.onEditDisabled}
            {...field.input}
          />
        )}
      </div>
    )
  }

  onSubmit = (values) => {
    const {postsid } = this.props.match.params;
    if (postsid) {
      return this.props.editPost(postsid, values, () => this.props.history.push(`/posts/${postsid}`));
    } else {
      values['id'] = Math.random().toString(36).substr(-8);
      values['timestamp'] = Date.now();
      return this.props.createPost(values, () => this.props.history.push(`/posts/${values.id}`));
      
    }
  }

  render() {
    const { handleSubmit } = this.props
    const disabled = this.props.match.params.postsid ? true : false
    return(
        <div className='react-redux_app-form'>
          <h2>Create/Edit Post</h2>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Post-Title: "
              name="title"
              type="input"
              component={this.renderField}

            />
            <Field
              label="User: "
              name="author"
              type="input"
              component={this.renderField}
              onEditDisabled={disabled}
            />
            <Field
              label="Post Content: " 
              name="body"
              type="textarea"
              component={this.renderField}
            />
            <Field
              label="Select a category"
              name="category"
              type="select"
              component={this.renderField}
              onEditDisabled={disabled}
            />
              <button className="btn btn-primary" type="submit">Submit</button>
             <Link to='/'>Cancel</Link>
          </form>
        </div>
    );
  }
}

/* From Redux form Docs 
https://redux-form.com/7.1.2/examples/initializefromstate/
*/ 

function mapStateToProps({ posts }, ownProps) {
  const { postsid } = ownProps.match.params;
  if(postsid) {
    return{
      initialValues: posts[postsid]
    }
  }
  return {}
  
}


NewPost = reduxForm({
  form: 'NewPost',
})(NewPost);

export default connect(mapStateToProps, { createPost,editPost,fetchPostDetails})(NewPost);


