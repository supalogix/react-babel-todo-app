var TodoListModel = require("model/TodoListModel");
var Guid = require("common/Guid");

describe("UC 1.1: Detect Invalid List Item", function() {
   it("Show an Error Message on Empty Input", function() {
      // Arrange
      var model = new TodoListModel();
      var guid = Guid.create();

      var errorMessage = "";
      var callback = function(e) {
         errorMessage = e.message; 
      };

      model.addShowMessageListener( callback );

      // Act
      model.addItem( guid, "" );

      // Assert
      expect(errorMessage)
         .toEqual("Invalid List Item");
   })

   it("Show an Error Message for an Invalid Guid", function() {
      // Arrange
      var model = new TodoListModel();
      var guid = "";

      var errorMessage = "";
      var callback = function(e) {
         errorMessage = e.message; 
      };

      model.addShowMessageListener( callback );

      // Act
      model.addItem( guid, "Item 1" );

      // Assert
      expect(errorMessage)
         .toEqual("System error #100. Please contact the site administrator");
   });

   it("Do not Add to List when the ListItem Is Invalid", function() {
      // Arrange
      var model = new TodoListModel();
      var guid = Guid.create();

      var errorMessage = "";
      var callback = function(e) {
         errorMessage = e.message; 
      };

      model.addShowMessageListener( callback );

      // Act
      model.addItem( guid, "" );

      // Assert
      var items = model.getItems();
      expect(items.length)
         .toEqual(0);
   });
});
