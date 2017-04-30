import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EmergencyEditPage } from './emergency-edit';
import { EmergencyAddPage } from './emergency-add';
import { PersonalInformationEditPage } from './personal-information-edit';
/*/
  Generated class for the MyAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

  emergency = [];
  user = {};
  emergencyObject = {};
  personalInformationObject = {};
  loggedUser:string = '';
  age:number = null;

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
      console.log(res.data)
      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.user = res.data
          console.log(res.data.maritalStatus)
          // Emergency Array for specified user!
          this.emergency = res.data.emergency

          // Start calculateAge Function
          function calculateAge (birthYear){
            var age = 2017 - birthYear
            return age;
          }

          let dob = res.data.dateOfBirth;
          let birthYear = dob.slice(0, 4)
          this.age = calculateAge(birthYear);
          console.log(this.age)
          // End calculateAge Function
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch
  } // END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  // Personal Information Edit or Delete
  editPersonalInformation(id) {
  console.log(id, "Personal Information Button Clicked")
  let actionSheet = this.actionSheetCtrl.create({
    title: '',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
          this.backand.object.remove("users", id, {
            "deep" : false })
            .then(res => {
              alert('Successfully Deleted!');
              // console.log(res, "<==== OBJECT REMOVED *******************");
          })
          .catch(err => {
            console.log(err);
          }); // End of emergency object delete
        }
      },{
        text: 'Edit',
        handler: () => {
          console.log('Edit Clicked');
          this.personalInformationModal(id)
        //   console.log(id, "<======= THIS IS ID")
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

  personalInformationModal(id) {
    this.backand.object.getOne("users", id, {
      "deep" : false })
      .then(res => {
        this.personalInformationObject = res.data
        console.log(res.data, "res data")
        let modal = this.modalCtrl.create(PersonalInformationEditPage, this.personalInformationObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
        modal.present();
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

  }

  // Emergency Edit or Delete
  editEmergency(id) {
  console.log("Emergency Button Clicked")
  let actionSheet = this.actionSheetCtrl.create({
    title: '',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
          this.backand.object.remove("emergency", id, {
            "deep" : false })
            .then(res => {
              alert('Successfully Deleted!');
              // console.log(res, "<==== OBJECT REMOVED *******************");
          })
          .catch(err => {
            console.log(err);
          }); // End of emergency object delete
        }
      },{
        text: 'Edit',
        handler: () => {
          console.log('Edit Clicked');
          this.emergencyModal(id)
          // console.log(id, "<======= THIS IS ID")
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


emergencyModal(id) {
  this.backand.object.getOne("emergency", id, {
    "deep" : false })
    .then(res => {
      this.emergencyObject = res.data
      let modal = this.modalCtrl.create(EmergencyEditPage, this.emergencyObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
      modal.present();
  })
  .catch(err => {
    console.log(err);
  }); // End of user object fetch

} // End of emergencyModal()

  addEmergencyContact() {
    let modal = this.modalCtrl.create(EmergencyAddPage);
    modal.present();
  }


// Personal Information Edit or Delete
editCredentials() {
console.log("Credentials Button Clicked")
let actionSheet = this.actionSheetCtrl.create({
  title: '',
  buttons: [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {

        console.log('Delete');
      }
    },{
      text: 'Edit',
      handler: () => {
        console.log('Edit Clicked');
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


}
