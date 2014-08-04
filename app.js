// Use to move files by using a steam, ideal for small files or moving to remote
// locations.  Moving on Windows/Linux/Darwin using script is faster.

var fs = require('graceful-fs'), // use because too many files to use native fs.
	file = require('file'), // use to traverse folder tree.
	folders = []; // Temp hold folders that are found.
	fileExten = ["js"]; // Hold file extentions TODO: compare what should be copied.

// StartPath holds the full path where the script should begin searching
// for files (or folders), a start point for recursion.

var startPath = "H:/testStart";
var newContainer = "H:/testFinish/"; // TODO: accept remote locations

// Read a single directory, find all items (files/folders), add to array.
function readDirectory(startPath) { 
	fs.readdir(startPath, function (err, data) {
		if (err) throw err;
		for (var i=0;i < data.length; i++) {
			// Print the current item, as well as display "true" if is a directory.
			console.log(i+1 + " : " + data[i] + " : "+ fs.lstatSync(startPath+"/"+data[i]).isDirectory());
			// Find folder then push it onto the array.
			if (fs.lstatSync(startPath+"/"+data[i]).isDirectory()) {
				folders.push(startPath+"/"+data[i]);
			}			
		}
		console.log("Folder has: " + folders.length + " item(s) in it.");
	});
};

// Show the stats of a given single path.
function showStats(path) {
  fs.stat(path, function (err, stats) {
    if (err) throw err;
    	console.dir(stats);
  });
};

// Accept a single filename and return the file's extention if it exists. 
function showExtention(filename) {
	var extn = filename.split(".");
		// check for zero length or non existant extentions
		if( extn.length === 1 || ( extn[0] === "" && extn.length === 2 ) ) {
    	return "";
		}
		return extn.pop();
}

// Navigate down file tree, calling callback for each directory.
file.walk(startPath, function(err, dirPath, dirs, files){
	// Process "files" array when contains file(s).
	if (files !="") {
		for (var i=0; i < files.length; i++){
			var filename = files[i].replace(/^.*[\\\/]/, '')

			// TODO: check for existing file name match in newContainer and 
			// rename new file to avoid overwrite.

			// TODO: Only copy files that match fileExten array (async)
			// fileExten.indexOf(showExtention(filename)) is -1 if not in array.

			var source = fs.createReadStream(files[i]);
			var dest = fs.createWriteStream(newContainer+filename);

			source.pipe(dest);
			source.on('end', function() {
				console.log("Written.");
			});
			source.on('error', function(err) {
				console.log("Error in stream:" + err);	
			});

		}
	}

});
