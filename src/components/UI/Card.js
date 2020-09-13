/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-11 10:42:33 
 * @Last Modified by:   Indrajit Bhattacharya 
 * @Last Modified time: 2020-09-11 10:42:33 
 */
import React from 'react';

import './Card.css';

const Card = props => {
  return <div className="card">{props.children}</div>;
};

export default Card;
