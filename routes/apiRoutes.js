var router = require("express").Router();
var connection = require("../db/connection");


router.get("/api/notes", function(req, res) {
  connection.query("SELECT * FROM notes;", function(err,notes) {
    if (err) throw err;
   
    res.json(notes);
    // console.log("notes : " + notes);
    // console.log(res);
  });
});
    
router.post("/api/notes", function(req, res) {
  connection.query("INSERT INTO notes SET ?", [req.body], function(err, notes) {
    if (err) throw err;

    res.json(notes);
  });
});

router.delete("/api/notes/:id", function(req, res) {
  connection.query("DELETE FROM notes WHERE id= ?", req.params.id, function(err, notes) {
    if (err) throw err;

    res.json(notes);
  });
});

module.exports = router;