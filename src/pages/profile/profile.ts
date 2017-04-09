import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { SubmitApplicationPage } from '../profile/submit-application';
import { ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user = {};
  loggedUser:string = '';
  coapplicants: any[] = [];
  dependents: any[] = [];
  documents: any[] = [];
  emergency: any[] = []; // Grab index 0
  incomeemployment: any[] = [];
  incomeretired: any[] = [];
  incomeselfemployed: any[] = [];
  pets: any[] = [];
  rentalhistory: any[] = [];
  utilities: any[] = [];
  electricity: boolean = null;
  gas: boolean = null;
  cable: boolean = null;
  water: boolean = null;
  terms: boolean = null;
  age:number = null;
  // dateOfBirth = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
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
          console.log(res.data.dateOfBirth, "<===== THIS.DATEOFBIRTH")
          this.coapplicants = res.data.coapplicants
          this.dependents = res.data.dependents
          this.documents = res.data.documents
          this.emergency = res.data.emergency[0]
          this.incomeemployment = res.data.incomeemployment
          this.incomeselfemployed = res.data.incomeselfemployed
          this.incomeretired = res.data.incomeretired
          this.pets = res.data.pets
          this.rentalhistory = res.data.rentalhistory
          this.utilities = res.data.utilities
          this.electricity = res.data.utilities[0].electricity
          this.gas = res.data.utilities[0].gas
          this.cable = res.data.utilities[0].cable
          this.water = res.data.utilities[0].water
          this.terms = res.data.utilities[0].termsAgree


      // Start calculateAge Function
      function calculateAge (birthYear){
        var age = 2017 - birthYear
        return age;
      }

      let dob = res.data.dateOfBirth;
      let birthYear = dob.slice(0, 4)
      this.age = calculateAge(birthYear);
      // End calculateAge Function

      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch



  } // End of constructor

  presentActionSheet() {
    console.log("Actionsheet Button clicked")
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Submit a new application',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
        }
      },{
        text: 'Yes',
        handler: () => {
          console.log('Yes Clicked');
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}



  newApplicationModal() {
    let modal = this.modalCtrl.create(SubmitApplicationPage);
    modal.present();
  }

}
