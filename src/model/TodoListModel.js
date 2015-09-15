"use strict";

var events = require("events");

function TodoListModel( emitter ) {
   this.emitter = new events.EventEmitter();
   this.items = [];
}

TodoListModel.prototype.addItem = function( guid, name ) {
   var item = {
      "guid": guid,
      "name": name
   };

   this.items.push( item );
   this.emitter.emit( "ITEM_ADDED", item );
}

TodoListModel.prototype.removeItem = function( guid ) {
   var index = this.items
      .map(function(e) { return e.guid; })
      .indexOf(guid);

   this.items.splice(index, 1);

   this.emitter.emit( "ITEM_REMOVED", guid );
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

module.exports = TodoListModel;

