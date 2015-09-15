var Model = require("Model");
var Guid = require("Guid");

describe("Remove List Items", function() {
   it("Remove One Item", function() {
      // Arrange
      var model = new Model();
      var guid = Guid.create();

      // Act
      model.addItem( guid, "item 1" );
      model.removeItem( guid );

      // Assert
      var items = model.getItems();
      expect( items.length ).toEqual( 0 );
   });

   it("Remove Two of Three Items", function() {
      // Arrange
      var model = new Model();
      var guid1 = Guid.create();
      var guid2 = Guid.create();
      var guid3 = Guid.create();

      // Act
      model.addItem(guid1, "item 1");
      model.addItem(guid2, "item 2");
      model.addItem(guid3, "item 3");
      model.removeItem( guid1 );
      model.removeItem( guid3 );

      // Assert
      var items = model.getItems();
      expect( items ).toEqual([{
         guid: guid2,
         name: "item 2"
      }]);
   });

   it("Calls EventListener", function() {
      // Arrange
      var model = new Model();
      var guid = Guid.create();

      var callbackFlag = false;

      var callback = function() {
         callbackFlag = true;
      }
      model.addItemRemovedListener( callback );

      // Act
      model.addItem(guid, "item 3");
      model.removeItem( guid );

      // Assert
      expect(callbackFlag).toBeTruthy();
   });
});
