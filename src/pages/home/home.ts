import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import moment from 'moment';

import { File } from '@ionic-native/file';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public file: File, 
    public toastController: ToastController) { }

  writeToFile() {
    var that = this;
    let beginTimer = moment().valueOf();
    window.resolveLocalFileSystemURL(this.file.externalRootDirectory + 'Download/', function (dirEntry) {
      that.createFile(dirEntry, "testIonic.txt", beginTimer);
    }, function(){ 
      console.log('Ocorreu um erro') ;
    });
  }

  createFile(dirEntry, fileName, beginTimer) {
    var that = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
      that.writeFile(fileEntry, beginTimer);
    }, function(){ 
      console.log('Ocorreu um erro');
    });
  }

  writeFile(fileEntry, beginTimer) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function() {
        console.log("Successful file write...");
        //readFile(fileEntry);
      };
      fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
      };
      let content = '';
      for(let i = 1; i <= 1000; i++) {
        content = content + 'Line ' + i + '\n';
      }
      fileWriter.write(content);
    });
    let endTimer = moment().valueOf();
    const toast = this.toastController.create({
      message: 'Finished in ' + (endTimer - beginTimer) + 'ms',
      duration: 200000
    });
    toast.present();
  }
}
