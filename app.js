console.log("starting app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");
const argv = yargs.argv;

var command = argv._[0];

console.log("Command: ", command);
console.log("Yargs:", argv);

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (_.isUndefined(note)) {
    console.log("Error: Note is a duplicate.");
  } else {
    console.log("=== Note created ===");
    notes.logNote(note);
  }
} else if (command === "list") {
  notes.getAll();
} else if (command === "read") {
  var returnedNote = notes.getNote(argv.title);
  if (_.isUndefined(returnedNote)) {
    console.log("Note not found");
  } else {
    console.log("=== Note Found ===");
    notes.logNote(note);
  }
} else if (command === "remove") {
  var noteRemoved = notes.delNote(argv.title);
  var message = noteRemoved ? "Note was removed." : "No note found.";
  console.log(message);
} else {
  console.log("command not recgonized.");
}
