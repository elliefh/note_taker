// Dependencies
// =============================================================
const { notStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");
const path = require("path");
const shortid = require('shortid');
const { Z_ERRNO } = require("zlib");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// API Routes
// =============================================================
app.get("/api/notes", function(req,res) {
   // Read the db.json file via fs module
   fs.readFile("./db/db.json", "utf8", function(err, data) {
       if (err) throw err;
       // Parse the file contents with JSON.parse() to the real data
       let dbNotes = JSON.parse(data);
       // Return and send the parsed data back to the client with res.json()
       return res.json(dbNotes);
   });
});

app.post("/api/notes", function(req, res) {
    // Access the POSTed data in 'req.body'
    let newNote = { 
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    };
    console.log(newNote);
    // Read the db.json file via fs module
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        // Parse the file contents with JSON.parse() to the real data
        let dbNotes = JSON.parse(data);
        // Push 'req.body' to the array list
        dbNotes.push(newNote);
        // Save content back to the 'db.json' with the 'fs' module
        // JSON.stringify() the array list back into a JSON string
        fs.writeFile("./db/db.json", JSON.stringify(dbNotes), function(err) {
            if (err) throw err;
            res.json(dbNotes);
        });
    });    
});

app.delete("/api/notes/:id", function(req, res) {
    // Access :id from 'req.params.id'
    // Read the db.json file via fs module
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        // Parse the file contents with JSON.parse() to the real data
        let dbNotes = JSON.parse(data);
        // Use the Array.filter() method to filter out the matching element
        dbNotes = dbNotes.filter( element => element.id !== req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(dbNotes), function(err) {
            if (err) throw err;
            // Return any time of success message
            res.sendStatus(200);
        });
    });
    
});

// HTML Routes
// =============================================================
app.get("/notes", function(req, res) {
    // Return notes.html contents
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
    // Return index.html contents
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
