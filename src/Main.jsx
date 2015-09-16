import React from 'react';
import InputArea from './view/InputArea';
import TodoList from './view/List';
import MessageArea from './view/MessageArea';

var TodoListModel = require("./model/TodoListModel");
var model = new TodoListModel();

React.render(
   <div>
      <MessageArea model={model} />
      <InputArea model={model} />
      <TodoList model={model}/>
   </div>,
   document.body
);

