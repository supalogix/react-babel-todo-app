"use strict";

var events = require("events");

function Model( emitter ) {
   this.emitter = new events.EventEmitter();
   this.items = [];
}

Model.prototype.addItem = function( guid, name ) {
   var item = {
      "guid": guid,
      "name": name
   };

   this.items.push( item );
   this.emitter.emit( "ITEM_ADDED", item );
}

Model.prototype.removeItem = function( guid ) {
   var index = this.items
      .map(function(e) { return e.guid; })
      .indexOf(guid);

   this.items.splice(index, 1);

   this.emitter.emit( "ITEM_REMOVED", guid );
}

Model.prototype.getItems = function() {
   return this.items;
}

Model.prototype.addItemAddedListener = function( callback ) {
   this.emitter.on("ITEM_ADDED", callback);
}

Model.prototype.addItemRemovedListener = function( callback ) {
   this.emitter.on("ITEM_REMOVED", callback);
}

Model.prototype.generateGuid = function() {
   function s4() {
     return Math.floor((1 + Math.random()) * 0x10000)
       .toString(16)
       .substring(1);
   }

   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
     s4() + '-' + s4() + s4() + s4();
}

module.exports = Model;

