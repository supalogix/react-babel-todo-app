import React from 'react';

class MessageArea extends React.Component {
   constructor(props) {
      super(props);

      this.model = props.model;

      this.setInitialState();
      this.addEventListeners();
   }

   setInitialState() {
      this.state = {
         message: ""
      };
   }

   addEventListeners() {
      this.model.addShowMessageListener(
         this.showMessageListener.bind(this)
      );
   }

   showMessageListener( e ) {
      var self = this;

      var state = {
         message: e.message
      };

      this.setState( state );

      setTimeout(function() {
         self.setState({
            message: ""
         });
      }, 1000);
   }

   render() {
      return (
         <div>
            <p>{ this.state.message }</p>
         </div>
      );
   }
}

export default MessageArea;
