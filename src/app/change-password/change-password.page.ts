import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ErrorModel } from '../model/error.model';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from '../model/constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

 // error messages from constants
 emailError = INVALID_EMAIL_MESSAGE;
 fieldRequired = FIELD_REQUIRED;

 forgotPasswordForm: FormGroup;
  isActiveToggleTextPassword: boolean;
  isActiveToggleTextnewPassword: boolean;
  changepassword: FormGroup;
  password: string;

 constructor(
   private formBuilder: FormBuilder,
   private utils: UtilitiesService,
   private navController: NavController,
   private apiService: ApiService,
   private storage: StorageService,
   private deviceStorage: Storage,
 ) {
 }

 ngOnInit() {
   this.password= localStorage.getItem('password');
  this.changepassword = this.formBuilder.group({
    newpassword: new FormControl('', [Validators.required, Validators.minLength(6)] ),
    oldpassword: new FormControl('',Validators.minLength(6)),
    confirmpassword: new FormControl('',Validators.minLength(6))
  })
 }

 public toggleTextPassword() {
  this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
}
 public toggleTextnewPassword() {
  this.isActiveToggleTextnewPassword = (this.isActiveToggleTextnewPassword == true) ? false : true;
}

getType() {
  return this.isActiveToggleTextPassword ? 'text' : 'password';
}
getnewType() {
  return this.isActiveToggleTextnewPassword ? 'text' : 'password';
}


 resetPassword() {
  
   let data={
    newpassword:this.changepassword.controls.newpassword.value,
    confirmpassword:this.changepassword.controls.confirmpassword.value,
    oldpassword:this.password
   }
   console.log(data,">>>>>>>>>>>>>>>>.");
   

   if (this.changepassword.status === 'VALID') {
      console.log(this.changepassword.value);
      debugger;
     this.utils.showLoading('Resetting password').then(() => {
       this.apiService.changepassword(data).subscribe((response:any) => {
         console.log(response);
         let postdata={
          isdefaultpassword:false
         }
         this.utils.hideLoading().then(() => {
           this.utils.showSuccessModal('User password changed successfully!').then((modal) => {
            //  this.apiService.updateresetpassword(response.user.id,postdata).subscribe(res=>{
             
            //   console.log(res,"ressss");
              
            //  },err=>{
            //       console.log(err,"errr");
                  
            //  })
             modal.present();
             modal.onWillDismiss().then((dismissed) => {
              // this.goBack();
              this.storage.logout();
              this.deviceStorage.clear();
              this.navController.navigateBack('login');
             });
           }, (responseError) => {
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
           });
          
         });
       }, (responseError) => {
         const error: ErrorModel = responseError.error;
         this.utils.hideLoading().then(() => {
           this.utils.errorSnackBar(error.message[0].messages[0].message);
         });
       });
     });
   } else {
     this.utils.errorSnackBar('Invalid Password entered.');
   }
 }

 goBack() {
   this.navController.pop();
 }


}
