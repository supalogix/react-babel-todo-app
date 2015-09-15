import React from "react";

class ListItem extends React.Component {
   constructor(props) {
      super(props);

      this.model = props.model;

      this.props = {
         name: props.name,
         guid: props.guid
      }
   }

   /**
    *
    */
   deleteItem(e) {
      var guid = this.props.guid;

      this.model.removeItem( guid ); 

      console.log("delete item");
      console.log(this.props.name);
      console.log(this.props.guid);
   }

   render() {
      return (
         <tr>
            <td>{this.props.name}</td>
            <td>
               <a 
                  href="#"
                  onClick={this.deleteItem.bind(this)}
                  >
                  delete
               </a>
            </td>
         </tr>
      );
   }
}

export default ListItem;
