var Model = require("Model");
var Guid = require("Guid");

describe("Add ListItem", function() {
   it("Add One List Item", function() {
      // Arrange
      var model = new Model();
      var guid = Guid.create();

      // Act
      model.addItem( guid, "item 1" );

      // Assert
      var items = model.getItems();
      expect(items).toEqual([
         {
            guid: guid,
            name: "item 1"
         }
      ]);
   });

   it("Add Two List Items", function() {
      // Arrange
      var model = new Model();
      var guid1 = Guid.create();
      var guid2 = Guid.create();

      // Act
      model.addItem( guid1, "item 1" );
      model.addItem( guid2, "item 2" );

      // Assert
      var items = model.getItems();
      expect(items).toEqual([
         {
            guid: guid1,
            name: "item 1"
         },
         {
            guid: guid2,
            name: "item 2"
         }
      ]);
   });

   it("Calls EventListener", function() {
      // Arrange
      var model = new Model();
      var guid1 = Guid.create();

      var callbackFlag = false;
      var callback = function() {
         callbackFlag = true;
      };

      model.addItemAddedListener( callback );

      // Act
      model.addItem( guid1, "item 1" );


      // Assert
      expect(callbackFlag).toBeTruthy();
   });

   it("EventListener contains event data", function() {
      // Arrange
      var model = new Model();
      var guid1 = Guid.create();

      var callbackFlag = false;
      var callbackGuid = "";
      var callbackName = "";

      var callback = function(e) {
         callbackFlag = true;
         callbackGuid = e.guid;
         callbackName = e.name;
      };

      model.addItemAddedListener( callback );

      // Act
      model.addItem( guid1, "item 1" );

      // Assert
      expect(callbackFlag).toBeTruthy();
      expect(callbackGuid).toEqual(guid1);
      expect(callbackName).toEqual("item 1");
   });

});

/**

Add List Item
Remove List Item

*/
