import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the Applications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-applications',
  templateUrl: 'applications.html'
})
export class ApplicationsPage {

  user = {};
  loggedUser:string = '';
  applications = [];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 600
      });
      loader.present();
     // End of loader

    backand.user.getUserDetails(false)
   .then(res => {
     this.loggedUser = res.data.userId
     this.backand.object.getOne("users", this.loggedUser, {
       "deep" : true })
       .then(res => {
         this.user = res.data
         this.applications = res.data.applicationinformation
     })
     .catch(err => {
       console.log(err);
     }); // End of user object fetch
     // Show user's applications in order of submission

   })
   .catch(err => {
     console.log(err);
   }); // End of user object fetch




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationsPage');
  }




}
