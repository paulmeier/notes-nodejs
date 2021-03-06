const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const titleOptions = {
  describe: "Title of a note",
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: "A note body",
  demand: true,
  alias: 'b'
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

var command = argv._[0];

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("=== Note created ===");
    notes.logNote(note);
  } else {
    console.log("Error: Note is a duplicate.");
  }
} else if (command === "list") {
  var noteList = notes.getAll();
  console.log(`Printing ${noteList.length} note(s).`);
  noteList.forEach((note) => {
    notes.logNote(note);
  });
} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("=== Note Found ===");
    notes.logNote(note);
  } else {
    console.log("Note not found!");
  }
} else if (command === "remove") {
  var noteRemoved = notes.delNote(argv.title);
  var message = noteRemoved ? "Note was removed." : "No note found.";
  console.log(message);
} else {
  console.log("command not recgonized.");
}
