import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories } from '../actions'

class Nav extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategories = () => {
    return _.map(this.props.categories, category => {
      return (
        <li key={category.name}>
          <Link to={`/category/${category.name}`} >
            {category.name}
          </Link>
        </li>
      );
    });
  }

  render() {
    return(
      <ul className='homepage_nav-section'>
          <li key='homepage_nav-home'>
          <Link to='/'>Home</Link>
          </li>
          {this.renderCategories()}
         <li key='submit-a-new-post'>
         <Link to='/posts/new'> New post</Link>
          </li>
      </ul>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps, { fetchCategories })(Nav)