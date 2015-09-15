import React from 'react';
import InputArea from './view/InputArea';
import TodoList from './view/List';

var TodoListModel = require("./model/TodoListModel");
var model = new TodoListModel();

React.render(
   <div>
      <InputArea model={model} />
      <TodoList model={model}/>
   </div>,
   document.body
);

