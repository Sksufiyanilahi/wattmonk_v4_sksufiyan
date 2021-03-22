import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  profileEdit:FormGroup;
  constructor(private formBuilder: FormBuilder,private modalCtrl:ModalController) {

    this.profileEdit = this.formBuilder.group({
      firstname: new FormControl('sdvf'),
      lastName:  new FormControl('',[Validators.required]),
      email:  new FormControl('',[Validators.required]),
      country:  new FormControl('',[Validators.required]),
      phone:  new FormControl('',[Validators.required]),
      address:  new FormControl('',[Validators.required]),
    })
  }

  ngOnInit() {
    // console.log(this.nav.get('firstName'));

    console.log(this.profileEdit.value);


    this.profileEdit.patchValue({
      firstName: 'fveg'
    })
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }

  updateProfile(){
    console.log(this.profileEdit.value);
  }

}
