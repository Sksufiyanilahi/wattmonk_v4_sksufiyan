import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ROLES } from 'src/app/services/constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-sorting-filter',
    templateUrl: './sorting-filter.page.html',
    styleUrls: ['./sorting-filter.page.scss'],
})

export class SortingFilterPage implements OnInit {

    sortingform: FormGroup;
    clientList: Company[];
    requestType: string;

    //checked: boolean;
    value: string;
    clientId: any;
    id: number;
    clientValue: string;
    isFilterApplied: boolean;
    segmentValue: any;

    public orderbyfilterstatus = null;
    public isOrderFilterApplied: boolean = false;
    public ordertypefilterstatus = null;
    public statusfilter = null;
    checked = [];
    public sortingdata: string;
    public priority: boolean = false;
    public isClient: boolean = true;
    public isPeSuperadmin: boolean = false;
    userData: any;
    public sort: string;
    public rev: string;
    public revi: boolean = false;
    public prio:  string;
    constructor(public modalController: ModalController, private storageService: StorageService,
        private apiservice: ApiService,
        private nav: NavParams, private utils: UtilitiesService,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
        ) {
        this.requestType = this.nav.get('requesttype');
        this.id = this.nav.get('memberid');
        this.isFilterApplied = this.nav.get('isFilterApplied');
        this.sort = this.nav.get('sort');
        this.rev = this.nav.get('rev');
        this.prio = this.nav.get('prio');

        console.log('this.prio',this.prio);

        this.sortingform = this.formBuilder.group({

            ordertypefilterstatus: new FormControl(''),
            orderbyfilterstatus: new FormControl(''),
            statusfilter: new FormControl(''),
            priority: new FormControl(''),
        })

        this.userData = this.storageService.getUser();
        this.isClient = this.utils.isClient();
        if (this.userData.role.id == ROLES.PESuperAdmin || this.userData.role.id == ROLES.PeAdmin || this.userData.role.type == 'peengineer') {
            this.isPeSuperadmin = true;
        }
        console.log('this.isClient', this.isClient);
       
        if (this.sort === 'asc') {

            this.sortingform.get('orderbyfilterstatus').setValue('created_at');
            this.isOrderFilterApplied = true;

            this.ordertypefilterstatus=this.sort;
            this.sortingform.get('ordertypefilterstatus').setValue(this.sort);
            console.log(this.sort, 'revasc' ,this.isOrderFilterApplied);
            
        } else if (this.sort === 'desc') {

            this.sortingform.get('orderbyfilterstatus').setValue('created_at');

            this.isOrderFilterApplied = true;
            this.ordertypefilterstatus=this.sort;
            this.sortingform.get('ordertypefilterstatus').setValue(this.sort);
            console.log(this.sort, 'revdesc',this.isOrderFilterApplied);
        }else{

            this.isOrderFilterApplied = false;

        }



        if (this.prio === 'true') {

            
            this.sortingform.get('priority').setValue('true');

        } else {
           

        }

        if (this.rev === 'revision') {

            this.revi = true;
            console.log(this.revi, 'rev');
            this.sortingform.get('statusfilter').setValue(this.rev);

        } else {
            this.revi = false;

        }
    }

    ngOnInit() {


        if (this.isFilterApplied) {
            this.getFilterValue();
        }
        if (this.rev === 'revision') {

            this.revi = true;
            console.log(this.revi, 'rev');

        } else {
            this.revi = false;

        }
    }

    ionViewWillEnter() {
       // this.isOrderFilterApplied = false;
       if (this.sort === 'asc') {

        this.sortingform.get('orderbyfilterstatus').setValue('created_at');
        this.isOrderFilterApplied = true;

        this.ordertypefilterstatus=this.sort;
        this.sortingform.get('ordertypefilterstatus').setValue(this.sort);
        console.log(this.sort, 'revasc' ,this.isOrderFilterApplied);
        
    } else if (this.sort === 'desc') {

        this.sortingform.get('orderbyfilterstatus').setValue('created_at');

        this.isOrderFilterApplied = true;
        this.ordertypefilterstatus=this.sort;
        this.sortingform.get('ordertypefilterstatus').setValue(this.sort);
        console.log(this.sort, 'revdesc',this.isOrderFilterApplied);
    }else{

        this.isOrderFilterApplied = false;

    }
        this.cdr.detectChanges();
    }

    getFilterValue() {
        this.sortingform.patchValue({
            client: this.id,

        })
    }

    dismiss() {
        this.modalController.dismiss({
            'dismissed': true,
            value: '',
            ordertypefilterstatus: '',
            orderbyfilterstatus: '',
            statusfilter: '',
            priority: '',

        }, 'destructive');

        this.isOrderFilterApplied = false;
    }

    ionViewDidLeave() {
        this.updateRadioValue();
    }




    //Adds the checkedbox to the array and check if you unchecked it
    addCheckbox_sort(event, checkbox: String) {

        console.log('event.detail.value', checkbox);
        if (event.target.checked) {
            this.checked.push(checkbox);


        } else {
            let index = this.removeCheckedFromArray(checkbox);
            this.checked.splice(index, 1);
        }
    }

    //Removes checkbox from array when you uncheck it
    removeCheckedFromArray(checkbox: String) {
        return this.checked.findIndex((category) => {
            return category === checkbox;
        })
    }


    filtersortvalue(event) {
        console.log(event);
        this.orderbyfilterstatus = event.detail.value;
        console.log(this.orderbyfilterstatus);
        this.isOrderFilterApplied = true;

    }
    filterStatusvalue(event) {
        this.statusfilter = event.detail.value;

        console.log(this.statusfilter);


    }
    filtersortvalue1(event) {
        this.ordertypefilterstatus = event.detail.value;

        console.log(this.ordertypefilterstatus);

    }
    prioritycheck(event) {
        this.priority = event.detail.value;
        console.log(this.priority);

    }
    applyFilter() {


        this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus + this.statusfilter;
        console.log('segment' + this.priority);

        console.log(this.checked);
        this.modalController.dismiss({
            'dismissed': true,
            value: this.sortingdata,
            ordertypefilterstatus: this.ordertypefilterstatus,
            orderbyfilterstatus: this.orderbyfilterstatus,
            statusfilter: this.statusfilter,
            priority: this.priority,

        }, 'destructive')
    }

    updateRadioValue() {
        this.checked = [];
        this.sortingform.reset();
    }



}
