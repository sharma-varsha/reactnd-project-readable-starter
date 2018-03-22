import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducer from './reducers';
import PostDetails from './components/post_details';
import CreatePost from './components/create_post';
import Category from './components/category';
import CreateComment from './components/create_comment';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise,thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducer)}>
    <BrowserRouter>
      <div>
      <Switch>
      <Route exact path='/posts/new' component={CreatePost} />
      <Route exact path='/posts/edit/:postsid' component={CreatePost} />
      <Route exact path='/posts/:postsid' component= {PostDetails} />
      <Route exact path='/posts/:postsid/comments/new' component={CreateComment} />
      <Route exact path='/posts/:postsid/comments/edit/:commentsid' component={CreateComment} />
      <Route exact path='/category/:cats' component= {Category} />
      <Route exact path='/' component= {App} />
      </Switch>
      </div> 
    </BrowserRouter>
     
    </Provider>
    , document.getElementById('root'));
  registerServiceWorker();
  