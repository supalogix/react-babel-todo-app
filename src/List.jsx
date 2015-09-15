import React from "react";
import ListItem from "./ListItem";

class TodoList extends React.Component {
   constructor(props) {
      super(props);

      this.model = props.model;

      this.setInitialState();
      this.addEventListeners();
   }

   setInitialState() {
      this.state = {
         list: []
      };
   }

   addEventListeners() {
      this.model.addItemAddedListener(
         this.itemAddedListener.bind(this)
      );
      this.model.addItemRemovedListener(
         this.itemRemovedListener.bind(this)
      );
   }

   itemAddedListener( e ) {

      var items = this.model.getItems();

      var newState = {
         list: items
      }

      this.setState( newState );
   }

   itemRemovedListener( e ) {
      var items = this.model.getItems();

      var newState = {
         list: items
      }

      this.setState( newState );
   }

   render() {
      var rows = [];
      var model = this.model;

      this.state.list.forEach(function(item) {
         rows.push(
            <ListItem 
               name={item.name} 
               guid={item.guid} 
               model={model} 
               /> 
         );
      });

      return (
         <div>
            <table>
               <tbody>
                  {rows}
               </tbody>
            </table>
         </div>
      );
   }
}

export default TodoList;
