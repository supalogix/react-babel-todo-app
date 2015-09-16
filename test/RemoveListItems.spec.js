var TodoListModel = require("model/TodoListModel");
var Guid = require("common/Guid");

describe("Remove List Items", function() {
   it("Remove One Item", function() {
      // Arrange
      var model = new TodoListModel();
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
      var model = new TodoListModel();
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

   it("System throws SHOW_MESSAGE Event", function() {
      // Arrange
      var model = new TodoListModel();
      var guid = Guid.create();

      var errorMessage = "";
      var callback = function(e) {
         errorMessage = e.message; 
      };

      model.addShowMessageListener( callback );

      // Act
      model.addItem( guid, "Item 1" );
      model.removeItem( guid );

      // Assert
      expect(errorMessage)
         .toEqual("Item Removed");
   });

   it("System throws ITEM_REMOVED event", function() {
      // Arrange
      var model = new TodoListModel();
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
