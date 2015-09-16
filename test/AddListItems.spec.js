var TodoListModel = require("model/TodoListModel");
var Guid = require("common/Guid");

// Use Case 1.0
describe("UC 1.0: Add List Items", function() {

   // Test Case 1.0.1
   it("TC 1.0.1: Add One List Item", function() {
      // Arrange
      var model = new TodoListModel();
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

   // Test Case 1.0.2
   it("TC 1.0.2: Add Two List Items", function() {
      // Arrange
      var model = new TodoListModel();
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

   // Test Case 1.0.3
   it("TC 1.0.3: System throws SHOW_MESSAGE Event", function() {
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

      // Assert
      expect(errorMessage)
         .toEqual("Item Added");
   });

   // Test Case 1.0.4
   it("TC 1.0.4: System throws ITEM_ADDED event", function() {
      // Arrange
      var model = new TodoListModel();
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

   // Test Case 1.0.5
   it("TC 1.0.5: Verify that ITEM_ADDED event has the proper format", function() {
      // Arrange
      var model = new TodoListModel();
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
