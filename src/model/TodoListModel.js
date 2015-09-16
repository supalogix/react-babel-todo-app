"use strict";

var events = require("events");

function TodoListModel( emitter ) {
   this.emitter = new events.EventEmitter();
   this.items = [];
}

TodoListModel.prototype.addItem = function( guid, name ) {
   if( isInvalidGuid(guid) ) {
      var errorMessage = {
         "message": "System error #100. Please contact the site administrator"
      };
      this.emitter.emit( "SHOW_MESSAGE", errorMessage );
      return;
   }

   if( isInvalidListItem(name) ) {
      var errorMessage = {
         "message": "Invalid List Item"
      };
      this.emitter.emit( "SHOW_MESSAGE", errorMessage );
      return;
   }

   var item = {
      "guid": guid,
      "name": name
   };
   var message = {
      "message": "Item Added"
   }
      
   this.items.push( item );
   this.emitter.emit( "ITEM_ADDED", item );
   this.emitter.emit( "SHOW_MESSAGE", message );
}

TodoListModel.prototype.removeItem = function( guid ) {
   var index = this.items
      .map(function(e) { return e.guid; })
      .indexOf(guid);

   var message = {
      "message": "Item Removed"
   };

   this.items.splice(index, 1);

   this.emitter.emit( "ITEM_REMOVED", guid );
   this.emitter.emit( "SHOW_MESSAGE", message );
}

TodoListModel.prototype.getItems = function() {
   return this.items;
}

TodoListModel.prototype.addItemAddedListener = function( callback ) {
   this.emitter.on("ITEM_ADDED", callback);
}

TodoListModel.prototype.addItemRemovedListener = function( callback ) {
   this.emitter.on("ITEM_REMOVED", callback);
}

TodoListModel.prototype.addShowMessageListener = function( callback ) {
   this.emitter.on("SHOW_MESSAGE", callback);
}

function isInvalidGuid( guid ) {
   return guid === "";
}

function isInvalidListItem( listItemName ) {
   return listItemName === "";
}

module.exports = TodoListModel;
