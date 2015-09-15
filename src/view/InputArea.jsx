import React from 'react';

var Guid = require("common/Guid");

class InputArea extends React.Component {
   constructor(props) {
      super(props);

      this.model = props.model;

      this.setInitialState();
      this.addEventListeners();
   }

   setInitialState() {
      this.state = {
         value: ""
      }
   }

   addEventListeners() {
      this.model.addItemAddedListener( 
         this.itemAddedListener.bind(this)
      );
   }

   itemAddedListener() {
      this.setState({
         value: ""
      });
   }

   addItem() {
      var itemName = this.state.value; 
      this.model.addItem( 
         Guid.create(),
         itemName );
   }

   onClick() {
      this.addItem();
   }

   onChange(newValue) {
      this.setState({
         value: newValue
      });
   }

   onKeyPress(e) {
      if( e.charCode === 13 ) 
         this.addItem();
   }

   render() {
      var valueLink = {
         value: this.state.value,
         requestChange: this.onChange.bind(this)
      };

      return (
         <div>
            <input 
               valueLink={valueLink}
               onKeyPress={this.onKeyPress.bind(this)}
               type="text" 
               />
            <button 
               onClick={this.onClick.bind(this)}
               >
               Submit
            </button>
         </div>
      );
   }
}

export default InputArea;
