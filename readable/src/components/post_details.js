import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  Comments from './comments';
import {fetchCategories, fetchPostDetails,deletePost,votePost} from '../actions';

class PostDetails extends Component {
  componentDidMount() {
    const { postsid } = this.props.match.params
    this.props.fetchPostDetails(postsid);
  }

  DisplayVote = (postsid, voteScore) => {
    return (
      <div>
        <Link onClick={() => this.props.votePost(postsid, "upVote")} to="#">
        <span role="img" aria-label="upVote">&#x1f44d;</span></Link>
        voteScore: {voteScore}
        <Link onClick={() => this.props.votePost(postsid, "downVote")} to="#">
        <span role="img" aria-label="downVote">&#x1f44e;</span></Link>        
      </div>
    )
  }

  onDeleteClick() {
    const {postsid} = this.props.match.params;
    this.props.deletePost(postsid,()=>{
        this.props.history.push('/');
    });

}
  render() {
    
    const { post } = this.props;
    if (!post) {
      return <div className='404-not-found'>
                  <h1>Sorry no post found.</h1>
                  <Link to={`/`}>Back to home page</Link>
              </div>
    }
    const { title, author, timestamp, body, id } = this.props.post;
    return (
      <div className='section-post-details'>
      <div className="back-to-home">
      <Link to={`/`}>Back to home page</Link>
    </div>  
      <div className='section-post-details-layout'>
          
          <div className='section-post-details-info'>
            <h2 className="section-post-title">{title}</h2>
            <span className="section-post-author">author: {author}</span>
            <p className="section-post-timestamp">
              submitted on:&nbsp;{moment(timestamp).format('MMM Do YY, HH:mm')}
            </p>
            {this.DisplayVote(post.id, post.voteScore)}
            <div className='section-post-content'>
            <p>{body}</p>
          </div> 
            <div className='section-post-edit'>
            <Link to={`/posts/edit/${post.id}`}>Edit the post</Link>
            </div>
            <div className="section-post-add-comment">  
            <Link to={`/posts/${id}/comments/new`}>Add a comment</Link>
            </div>
              <button className="btn btn-sm btn-danger"  onClick={this.onDeleteClick.bind(this)}>DeletePost</button>

          </div>
          <hr/>
            <div className="section-post-comments">
          <Comments/>
            </div>
        </div>
    
      </div>


    )
  }
}

function mapStateToProps({ posts,comments }, ownProps) {
  return {
    post: posts[ownProps.match.params.postsid],
    comments
  }
}
export default connect(mapStateToProps, {fetchCategories, votePost,fetchPostDetails,deletePost })(PostDetails);