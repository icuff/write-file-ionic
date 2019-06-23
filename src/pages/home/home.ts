import { Component } from '@angular/core';
import { NavController, ToastController, IonicApp } from 'ionic-angular';
import moment from 'moment';

import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public file: File, 
    public toastController: ToastController, public androidPermissions: AndroidPermissions) { }

  askPermission() {
    const permission = this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE;
    this.androidPermissions.checkPermission(permission).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(permission)
    );
    
    this.androidPermissions.requestPermission(permission);
  }

  writeToFile = async () => {
    var that = this;
    let path = this.file.externalRootDirectory + 'Download/';
    let contador = 0;
    let times = [];

    // for(let m = 0; m < 30; m++) {
      for(let n = 0; n < 30; n++) {
        let beginTimer = moment().valueOf();
        let fileName = "fileIonic" + contador + ".txt";

        await this.file.writeFile(path, fileName, "a".repeat(5000000), {replace: true});

        let endTimer = moment().valueOf();
        times.push(endTimer - beginTimer);
        contador++;
      }
    // }

    await this.file.writeFile(path, "aaTimeIonic.csv", "TIMES\n" + times.join("\n"), 
                              {replace: true});

    that.toastController.create({ message: 'Finished', duration: 200000 }).present();
  }
}
