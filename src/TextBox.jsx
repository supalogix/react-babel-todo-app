import React from 'react';

var Guid = require("./Guid");

class TextBox extends React.Component {
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

   getGuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
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

export default TextBox;
