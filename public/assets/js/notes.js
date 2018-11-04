var $notesList = $("#notes-list");
var $noteTitle = $("#note-title");
var $noteText = $("#note-text");
var $submitBtn = $("#submit-btn");

// Gets all quotes from the database, renders the quotes list
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    var $listItems = [];

    // Loop through and build a list item for each note returned from the db
    for (var i = 0; i < data.length; i++) {
      var note = data[i];
      // console.log(note);
      
      var $li = $("<li class='list-group-item'>").data(note);
      var $row = $("<div class='row'>");
      var $col11 = $("<div class='col-11'>");
      var $titleP = $("<span class= 'font-weight-bold'>").text(note.title);      
      var $noteP = $("<p>").html('<br>"' + note.text + '"');    
      // var $clearFix = $("<div class='clearfix'>");
      var $delBtn = $("<i class='fa fa-trash text-danger delete-note'>");
      $delBtn.attr('data-id', note.id);
      $delBtn.on("click", function(event) {
        var id = parseInt($(this).attr("data-id"));
      
        // Send the DELETE request.
        $.ajax({
          url: "/api/notes/" + id, 
          method: "DELETE"
        });
        $(this).parents('li.list-group-item').remove();
      });

      $li.append(
        $row.append(
          $col11.append($titleP, $delBtn,$noteP),          
        )
      );
      $listItems.push($li);
    }

    $notesList.empty();
    $notesList.append($listItems);
  });
};

// Submits the note from the form to the db
var handleNoteSubmit = function(event) {
  event.preventDefault();

  var note = {
    title: $noteTitle.val().trim(),
    text: $noteText.val().trim()
  };

  if (!note.title || !note.text) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: note
  })
    .then(function() {
      getAndRenderNotes();
      $noteTitle.val("");
      $noteText.val("");
    });
};


getAndRenderNotes();

$submitBtn.on("click", handleNoteSubmit);

