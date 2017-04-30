import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular'
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService


/*
  Generated class for the Documents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html'
})
export class DocumentsPage {

  user = {};
  loggedUser:string = '';

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService) {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 600
      });
      loader.present();
     // End of loader

    backand.user.getUserDetails(false)
   .then(res => {
     this.user = res.data
     this.loggedUser = res.data.userId
     console.log(res.data, "<==== 6. DOCUMENTS GET USER DETAILS");
   })
   .catch(err => {
     console.log(err);
   }); // End of user object fetch


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

}
