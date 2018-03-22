import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import{bindActionCreators} from 'redux';
import {fetchComments} from '../actions';

class Comments extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.match.params.postsid)
      }

    render() {
        const { comments } = this.props;
        if(!comments) {
          return <div> Please Wait !... comments are loading</div>
        }
    
        return(
               _.map(comments,comment => {
                   return(
                       <div className='comment' key={comment.id}>
                    <h4>{comment.body}</h4>
                    <div className='comment-edits'>
                    <Link to={`/posts/${this.props.match.params.postsid}/comments/edit/${comment.id}`} >Edit comment
                    </Link>
                  </div>
                    <div className='divider'>
                    <hr />
                  </div>  
                  </div> 
                   )
            })
        );

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchComments}, dispatch)
  }
function mapStateToProps({comments},ownProps) {
   // console.log("ownProps",ownProps);
    return {
        comments:comments[ownProps.match.params.postsid]
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comments));
