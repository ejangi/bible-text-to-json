const fs = require('fs');
const glob = require("glob")

glob("text/**/*.txt", {}, function (er, files) {

    console.log("Transforming " + files.length + " files...");

    files.forEach(function(filename) {
        let splits = filename.split("/");
        let testament = splits[1];
        let file = splits[splits.length-1];
        let dot_splits = file.split(".");
        let chapters = dot_splits[0].match(/([0-9]+)$/);
        let chapter = chapters[chapters.length-1];
        let book = dot_splits[0].replace(chapter, '').replace(/^\s/, '');
        let ext = "json";

        if (testament == "New Testament") {
            testament = "new";
        } else {
            testament = "old";
        }
        
        fs.readFile(filename, "utf8", function(err, data) {
            if (err) console.error(error);
            
            data.split("\n").forEach(function(line) {
                let verses = line.match(/^([0-9]+)/);
                let text = line.replace(/^([0-9]+)\s?/, '');
                let verse = 1;
                if (verses !== null && verses.length > 0) {
                    verse = verses[0];
                }

                let new_filename = "json/"+testament+'-'+book+'-'+chapter+'-'+verse+'.'+ext;

                new_data = {
                    "testament": testament,
                    "book": book,
                    "chapter": chapter,
                    "verse": verse,
                    "text": text
                }

                fs.writeFileSync(new_filename, JSON.stringify(new_data), 'utf8', function(error){
                    console.error(error);
                });
            });

        });

    });

})