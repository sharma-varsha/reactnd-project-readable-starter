import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPosts,votePost } from './actions';
import {Link} from 'react-router-dom';
import Nav from './components/navigation';

/* Main page */

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  DisplayVote = (postsid, voteScore) => {
    return (
      <div className='vote-for-post'>
        <Link onClick={() => this.props.votePost(postsid, "upVote")} to="#">
        <span role="img" aria-label="upVote">&#x1f44d;</span></Link>
        Votes: {voteScore}
        <Link onClick={() => this.props.votePost(postsid, "downVote")} to="#">
        <span role="img" aria-label="downVote">&#x1f44e;</span></Link>
      </div>
    )
  }
  renderPosts() {
    const {posts } = this.props;
    return _.map(posts,post => {
      if (post.deleted === false){
      return (
        <li key={post.id} className="list-group-item">
          <div className='homepage_post-title'>
          <Link to={`/posts/${post.id}`} >
           {post.title}
           </Link>
          </div>
          <div className="homepage_post-data">
         <p>category: {post.category}&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>submitted on: {moment(post.timestamp).format('MMM Do YY, HH:mm')}&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>comments: &nbsp;{post.commentCount}</p>
          {this.DisplayVote(post.id, post.voteScore)}
          </div>
          <div className='homepage_post-edit'>
          <Link to={`/posts/edit/${post.id}`}>
           Edit the post
          </Link>
        </div>
        </li>
      );
    }
    });
    
  }

  render() {
    return(
      <div className="react-redux_app-info">
      <h3 className="app-title">Content and Comment Web App</h3>
        <Nav/>
      <ul className="list-group">
       {this.renderPosts()}
       </ul>
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {
    posts
  }
}

export default connect(mapStateToProps, {fetchPosts,votePost} )(App);