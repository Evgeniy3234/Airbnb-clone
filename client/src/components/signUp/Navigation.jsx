import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ logOutCallback }) => (
  <ul>
    <li><Link to='/protected'>Protected</Link></li>
    <li><Link to='/content'>Content</Link></li>
    <li><button onClick={logOutCallback}>Log Out</button></li>
  </ul>
)

export default Navigation;