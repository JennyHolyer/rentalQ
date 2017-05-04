import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'page-employments-edit',
  templateUrl: 'employments-edit.html'
})
export class EmploymentsEditPage {
  employment= {};
  user = {};
  loggedUser:string = '';
  employmentID = '';

  employmentInfo = {
      fullName: '',
      companyName: '',
      position: '',
      employmentType: '',
      salary: '',
      managerFullName: '',
      phoneNumber: '',
      startDate: '',
      endDate: ''
  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.employmentID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

        let loader = this.loadingCtrl.create({
          content: "Loading...",
          duration: 800
          });
          loader.present();
         // End of loader

         backand.user.getUserDetails(false)
        .then(res => {
          this.loggedUser = res.data.userId

          this.backand.object.getOne("incomeEmployment", this.employmentID, {
            "deep" : false })
            .then(res => {
              this.employment = res.data
              console.log(res, "employment data")
              this.employmentInfo.companyName = res.data.companyName
              this.employmentInfo.position = res.data.position
              this.employmentInfo.employmentType = res.data.employmentType
              this.employmentInfo.salary = res.data.salary
              this.employmentInfo.managerFullName = res.data.managerFullName
              this.employmentInfo.phoneNumber = res.data.phoneNumber
              this.employmentInfo.startDate = res.data.startDate
              this.employmentInfo.endDate = res.data.endDate
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
        console.log('ionViewDidLoad EmploymentEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {

         companyName: this.employmentInfo.companyName,
         position: this.employmentInfo.position,
         employmentType: this.employmentInfo.employmentType,
         salary: this.employmentInfo.salary,
         managerFullName: this.employmentInfo.managerFullName,
         phoneNumber: this.employmentInfo.phoneNumber,
         startDate: this.employmentInfo.startDate,
         endDate:this.employmentInfo.endDate,
         user: this.loggedUser



        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("incomeEmployment", id, data, options)
        .then(data => {
         alert('employmentInfo Successfully Updated');

         this.employmentInfo.companyName = this.employmentInfo.position = this.employmentInfo.employmentType = this.employmentInfo.salary = this.employmentInfo.managerFullName = this.employmentInfo.phoneNumber = this.employmentInfo.startDate = this.employmentInfo.endDate = '';

         this.dismiss();
       })
        .catch(error => {
         console.log(error, '<===== data from backend save handler')
     })
     }


     dismiss() {
      this.viewCtrl.dismiss();
    }
}
