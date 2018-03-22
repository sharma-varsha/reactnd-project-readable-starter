import _ from 'lodash';

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import {fetchPosts, votePost, deletePost} from '../actions';

class Category extends Component {
  componentDidMount() { 
    this.props.fetchPosts();
  }

  DisplayVote = (postsid, voteScore) => {
    return (
      <div className='post-vote'>
        <Link onClick={() => this.props.votePost(postsid, "upVote")} to="#">
        <span role="img" aria-label="upVote">&#x1f44d;</span></Link>
        voteScore: {voteScore}
        <Link onClick={() => this.props.votePost(postsid, "downVote")} to="#">
        <span role="img" aria-label="downVote">&#x1f44e;</span></Link>
      </div>
    )
  }

  renderPosts = () => {
    if (!this.props.posts) {
      return <div className='404-not-found'>
                  <h1>Sorry no post found.</h1>
                  <Link to={`/`}>Back to home page</Link>
              </div>
    }
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <div className='post-title'>
            <Link to={`/posts/${post.id}`} >
              {post.title}
            </Link>
          </div>
          <div className='homepage_post-data'>
            <p>comments: {_.size(this.props.comments[post.id])}</p>
            <p>submitted on: {moment(post.timestamp).format('MMM Do YY, HH:mm')}</p>
            {this.DisplayVote(post.id, post.voteScore)}
            </div>
          <div className='homepage_post-edit'>
            <Link to={`/posts/edit/${post.id}`}>
              Edit this post
            </Link>
            <button className="btn btn-danger btn-sm section_category-btn" onClick={() => this.props.deletePost(post.id, () => this.props.history.push('/'))}>Delete
          </button>
          </div>
        </li>
      );
    });
  }
  
  render() {
    return (
      
      <div className='section_category_page'>
      <h2 className='section_category_name'>Post for {this.props.match.params.cats}&nbsp;Category</h2>
      <div className="back-to-home">
      <Link to={`/`}>Back to home page</Link>
    </div>
      <div className="section_category_post">
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  return {
    posts: _.omitBy(posts, (post) => post.category !== ownProps.match.params.cats),
    comments
  }
}

export default connect(mapStateToProps, { fetchPosts, votePost, deletePost })(Category);