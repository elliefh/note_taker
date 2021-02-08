const { notStrictEqual } = require("assert");
var express = require("express");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req,res) {
   // Use the fs module to read the file
   // Parse the file contents with JSON.parse() to the real data
   // Send the parsed data back to the client with res.json()
});

app.post("/api/notes", function(req, res) {
    // Access the POSTed data in 'req.body'
    // Use the fs module to read the file
    // Parse the file contents with JSON.parse() to the real data
    // Push 'req.body' to the array list
    // JSON.stringify() the array list back into a JSON string
    // Save content back to the 'db.json' with the 'fs' module
});

app.delete("/api/notes:id", function(req, res) {
    // Access :id from 'req.params.id'
    // Use the fs module to read the file
    // Parse the file contents with JSON.parse() to the real data
    // Option A: Find matching index using Array.findIndex()
    // Option B: Remove target element using Array.splice()
    // Option C: Use the Array.filter() method to filter out the matching element
    myArray = myArray.filter( element => element.id !== req.params.id);

    // Return any time of success message
});

app.get("/notes", function(req,res) {
    // Return notes.html contents
    res.sendFile(public/notes.html)
});

app.get("*", function(req,res) {
    // Return index.html contents
    res.sendFile(public/index.html)
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
