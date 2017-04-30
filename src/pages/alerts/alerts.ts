import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { TabsPage } from '../tabs/tabs'; // So we have access to the loggedUser data e.g. ID


@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})

export class AlertsPage {

  user = {};
  alerts = [];
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
      console.log(res.data, "<==== 4. ALERTS GET USER DETAILS");
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

    //  this.loggedUser = this.navParams.get('loggedUser');
    // console.log(this.loggedUser, "<==== ALERTS USER ID FOR LOGGED IN USER");

    this.alerts = [
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      },
      {
        'image': 'https://ionicframework.com/dist/preview-app/www/assets/img/gozer.png',
        'title': 'Application Received',
        'description': 'Something cool happened but now you don\'t know how you will do...',
      }
    ]

  }

}
