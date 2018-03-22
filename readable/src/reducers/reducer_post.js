import _ from 'lodash';


import { FETCH_POSTS,CREATE_POST ,FETCH_POST_DETAILS,DELETE_POST,EDIT_POST,VOTE_POST} from '../actions';

export default function(state={}, action) {

  switch (action.type) {

      case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

      case FETCH_POST_DETAILS:
      return {[action.payload.data.id]:action.payload.data};

      case DELETE_POST:
      return _.omit(state,action.payload);

      case EDIT_POST:
      return {...state, [action.payload.id]: action.payload};

      case CREATE_POST:
      return {...state, [action.payload.id]: action.payload };

      case VOTE_POST:
      return {...state, [action.payload.data.id]:action.payload.data};
    default: return state;
  }

} 

