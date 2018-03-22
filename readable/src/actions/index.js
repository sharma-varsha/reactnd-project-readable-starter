
import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
//Post Actions

export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
export const VOTE_POST = 'VOTE_POST';

//Comments Actions 
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const FETCH_ALL_COMMENTS = 'FETCH_ALL_COMMENTS';
export const FETCH_COMMENT_DETAILS = 'FETCH_COMMENT_DETAILS';


//API END POINT 

const ROOT_URL = 'http://localhost:5001'

/* learnt async use with promise and thunk by taking a course in udemy*/ 


const headers = {
  'Accept' : 'application.json',
  'Authorization': 'udacity-react-redux',
}

export function fetchCategories() {
    const request = axios.get(`${ROOT_URL}/categories`, {headers});
    return {
      type: FETCH_CATEGORIES,
      payload: request
    }
  }

  export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts`,{headers});
    return {
      type: FETCH_POSTS,
      payload:request
  }

  /* Commenting this out as the api now supprts giving the commentCount */
  
    /*return dispatch => {
      request.then(({data}) => {
        dispatch ({
          type: FETCH_POSTS,
          payload: data,
        })
        data.map(post => {
          dispatch(fetchComments(post.id))
        })
      })
  }*/

  }

  export function deletePost(postsid, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${postsid}`, {headers})
    .then(()=> callback());
    return {
        type: DELETE_POST,
        payload:postsid
    }
  }

  export function fetchPostDetails(postsid) {
    const request = axios.get(`${ROOT_URL}/posts/${postsid}`, {headers});
  
    return {
      type: FETCH_POST_DETAILS,
      payload: request
    }
  }


  export function fetchComments(postsid) {
    const request = axios.get(`${ROOT_URL}/posts/${postsid}/comments`, {headers});
  
    return dispatch => {
      request.then(({ data }) => {
        dispatch({
          type: FETCH_ALL_COMMENTS,
          payload: {
            data,
            postsid
          }
        })
        }
      )
    }
  }

  export function createComment(postsid, fieldValues, callback) {
    const request = axios.post(`${ROOT_URL}/comments`, fieldValues, {headers});
  
    return dispatch => {
      request.then(({data}) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: {
            postsid,
            data
          }
        })
      }).then(() => callback())
    }
  }

  export function fetchCommentDetails(postsid, commentsid) {
    const request = axios.get(`${ROOT_URL}/comments/${commentsid}`, {headers});
  
    return dispatch => {
      request.then((data) => {
        dispatch({
          type: FETCH_COMMENT_DETAILS,
          payload: {
            postsid,
            data
          }
        })
      })
    }
  }

  export function editComment(postsid, commentsid, fieldValues, callback) {
    const request = axios.put(`${ROOT_URL}/comments/${commentsid}`, fieldValues, {headers});
    fieldValues['timestamp'] = Date.now();
    return dispatch => {
      request.then(({data}) => {
        dispatch({
          type: EDIT_COMMENT,
          payload: {
            postsid,
            data
          }
        })
      }).then(() => callback())
    }
  }

  export function votePost(postsid, option) {
    const request = axios.post(`${ROOT_URL}/posts/${postsid}`, {option}, {headers});
  
    return {
      type: VOTE_POST,
      payload: request,
    }
  }

  export function createPost(formdata, callback) {
    const request = axios.post(`${ROOT_URL}/posts`, formdata, {headers});
    return dispatch => {
      request.then(({data}) => {
        dispatch({
          type: CREATE_POST,
          payload: data
        })
      }).then(() => callback())
    }
  }

  

  export function editPost(postsid, fieldValues, callback) {
    const request = axios.put(`${ROOT_URL}/posts/${postsid}`, fieldValues, {headers});
  
    return dispatch => {
      request.then(({data}) => {
        dispatch({
          type: EDIT_POST,
          payload:data,
        })
      }).then(() => callback())
    }
  }