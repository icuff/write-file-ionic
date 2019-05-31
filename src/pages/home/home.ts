import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public file: File) {}

  writeToFile() {
    var that = this;

    window.resolveLocalFileSystemURL(this.file.externalRootDirectory, function (dirEntry) {
      that.createFile(dirEntry, "fileToAppend.txt");
    }, function(){ 
      console.log('Ocorreu um erro') ;
    });
  }

  createFile(dirEntry, fileName) {
    var that = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
      that.writeFile(fileEntry);
    }, function(){ 
      console.log('Ocorreu um erro');
    });
  }

  writeFile(fileEntry) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function() {
        console.log("Successful file write...");
        //readFile(fileEntry);
      };
      fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
      };

      fileWriter.write('dataObj3');
    });
  }
}
