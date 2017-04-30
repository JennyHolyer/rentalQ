import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { RentalHistoryAddPage } from './rental-history-add';
import { RentalHistoryEditPage } from './rental-history-edit';
import { ActionSheetController } from 'ionic-angular';

/*
  Generated class for the RentalHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rental-history',
  templateUrl: 'rental-history.html'
})
export class RentalHistoryPage {

  rentalHistory: any[] = [];
  user = {};
  address = {};
  loggedUser:string = '';

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

     backand.user.getUserDetails(false)
    .then(res => {
      this.user = res.data
      this.loggedUser = res.data.userId

      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.user = res.data
          this.rentalHistory = res.data.rentalhistory
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
    console.log('ionViewDidLoad RentalHistoryPage');
  }

  addRentalHistory() {
  let modal = this.modalCtrl.create(RentalHistoryAddPage);
  modal.present();
}

// Address Edit or Delete
editRentalHistory(id) {
console.log("Address Button Clicked")
let actionSheet = this.actionSheetCtrl.create({
  title: '',
  buttons: [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        console.log('Delete');
        this.backand.object.remove("Address", id, {
          "deep" : false })
          .then(res => {
            alert('Successfully Deleted!');
            // console.log(res, "<==== OBJECT REMOVED *******************");
        })
        .catch(err => {
          console.log(err);
      }); // End of address object delete
      }
    },{
      text: 'Edit',
      handler: () => {
        console.log('Edit Clicked');
        this.addressModal(id)
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
addressModal(id) {
  this.backand.object.getOne("rentalHistory", id, {
    "deep" : false })
    .then(res => {
      this.address = res.data
      let modal = this.modalCtrl.create(RentalHistoryEditPage, this.address); // <== HAVE TO PASS OBJECT & NOT AN ID!
      modal.present();
  })
  .catch(err => {
    console.log(err);
  }); // End of user object fetch

} // End of emergencyModal()

// editAddress(id) {
// console.log("Address Edit Button Clicked")
// let actionSheet = this.actionSheetCtrl.create({
//   title: '',
//   buttons: [
//     {
//       text: 'Delete',
//       role: 'destructive',
//       handler: () => {
//         console.log('Delete');
//         this.backand.object.remove("rentalHistory", id, {
//           "deep" : false })
//           .then(res => {
//             alert('Address Successfully Deleted!');
//             // console.log(res, "<==== OBJECT REMOVED *******************");
//         })
//         .catch(err => {
//           console.log(err);
//         }); // End of emergency object delete
//       }
//     },{
//       text: 'Edit',
//       handler: () => {
//         console.log('Edit Clicked');
//         // this.addressEditModal(id)
//         // console.log(id, "<======= THIS IS ID")
//       }
//     },{
//       text: 'Cancel',
//       role: 'cancel',
//       handler: () => {
//         console.log('Cancel clicked');
//       }
//     }
//   ]
// });
// actionSheet.present();
// }


// addressEditModal(id) {
//   this.backand.object.getOne("emergency", id, {
//     "deep" : false })
//     .then(res => {
//       this.emergencyObject = res.data
//       let modal = this.modalCtrl.create(EmergencyPage, this.emergencyObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
//       modal.present();
//   })
//   .catch(err => {
//     console.log(err);
//   }); // End of user object fetch
//
// } // End of emergencyModal()






}
