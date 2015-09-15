// index.jsx

import React from 'react';
import TextBox from './TextBox';
import TodoList from './List';

var Model = require("./Model");
var model = new Model();

React.render(
   <div>
      <TextBox model={model} />
      <TodoList model={model}/>
   </div>,
   document.body
);

