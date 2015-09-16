var TodoListModel = require("model/TodoListModel");
var Guid = require("common/Guid");

// Use Case 2.0
describe("UC 2.0: Remove List Items", function() {

   // Test Case 2.0.1
   it("TC 2.0.1: Remove One Item", function() {
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

   // Test Case 2.0.2
   it("TC 2.0.2: Remove Two of Three Items", function() {
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

   // Test Case 2.0.3
   it("TC 2.0.3: System Throws SHOW_MESSAGE Event", function() {
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

   // Test Case 2.0.4
   it("TC 2.0.4: System Throws ITEM_REMOVED Event", function() {
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
