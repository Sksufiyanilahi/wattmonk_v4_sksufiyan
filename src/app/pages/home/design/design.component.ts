import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DesginDataModel, prelimCounts, PrelimDesign } from 'src/app/models/design.model';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, AlertController, Platform, IonInfiniteScroll, IonContent, ActionSheetController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { DrawerState } from 'ion-bottom-drawer';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ErrorModel } from 'src/app/models/error.model';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { COMETCHAT_CONSTANTS,ROLES } from 'src/app/services/constants';
import { FilterPage } from '../../filter/filter.page';
import { SortingFilterPage } from '../../sorting-filter/sorting-filter.page';
import * as moment from 'moment';
import { EmailModelPage } from '../../email-model/email-model.page';
import { DeclinePage } from '../../decline/decline.page';
import { ResendDialogPage } from '../../resend-dialog/resend-dialog.page';
import { PaymentModalPage } from '../../payment-modal/payment-modal.page';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.scss'],
})

export class DesignComponent implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll, { static: false }) infinitescroll: IonInfiniteScroll;
    @ViewChild('content', { static: false }) content: IonContent;

    listOfDesignDataHelper: DesginDataHelper[] = [];
    private refreshSubscription: Subscription;
    private routeSubscription: Subscription;
    today: any;
    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    drawerState = DrawerState.Bottom;
    assignForm: FormGroup;
    listOfAssignees: AssigneeModel[] = [];
    listOfAssignees2: AssigneeModel[] = [];
    designId = 0;
    disableAccept = "true"
    showBottomDraw: boolean = false;
    roleType: any;
    myFiles: string[] = [];
    segments: any;
    listOfDesigns: DesginDataModel[];
    private DesignRefreshSubscription: Subscription;
    private dataRefreshSubscription: Subscription;
    listOfDesignsHelper: any[];
    overdue: any;
    todaysdate: string;
    userData: User;
    designerData: any;
    assigneeData: any;
    selectedDesigner: User;
    netSwitch: boolean;
    skip: number = 0;
    limit: number = 20;
    reviewAssignedTo: any;
    isclientassigning: boolean = false;
    acceptid: any;
    deactivateNetworkSwitch: Subscription;
    noDesignFound: string;
    storageDirectory: string;
    PrelimCounts: prelimCounts = <prelimCounts>{};
    public userAccessRights: any = {};
    public memberId: string;
    public isFilterApplied: boolean = false;
    public isClient: boolean = true;
    public getFilterData: any = {};
    public getSelectedSegment: string = 'newDesign';
    //counts
    // newprelims: Observable<any>;
    // newprelimsRef: AngularFireObject<any>;
    // //newprelimsRef:any;
    // newprelimscount = 0;

    /* sort variable*/
    public sorting: boolean = false;
    public orderbyfilterstatus = null;
    public ordertypefilterstatus = null;
    public sortingdata: string;
    public showdesign: boolean = false;
    public sortdelive: string = 'newDesign';
    public Type = 'orderbyfilterstatus';
    public statusfilter: string = 'newDesign';
    public stsus : string = '&isinrevisionstate=false';
    /* sort variable*/
    public getsortFilterData: any = {};
    public issortingApplied: boolean = false;
    isdesign: boolean = false;
    userRoleID: any;
    prelimpageCount: any;
    prelimData: any;
    userId: number;
    role: any;
    name: any;
    prelimSegment: any;
    filterID: any;
    sortorder: string;
    sortby: any;
    filterbyId: any;
    constructor(
        private utils: UtilitiesService,
        private apiService: ApiService,
        private datePipe: DatePipe,
        private storage: Storage,
        private cdr: ChangeDetectorRef,
        private launchNavigator: LaunchNavigator,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public modalController: ModalController,
        private storageService: StorageService,
        private network: NetworkDetectService,
        public alertController: AlertController,
        private socialsharing: SocialSharing,
        private file: File,
        //private localnotification: LocalNotifications,
        private platform: Platform,
        private androidPermissions: AndroidPermissions,
        private transfer: FileTransfer,
        private mixpanelService: MixpanelService,
        public actionSheetController: ActionSheetController

    ) {

      
        this.userData = this.storageService.getUser();
        this.userRoleID = this.storageService.getUser().role.id
        console.log(this.userRoleID)
        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD' || this.userData.role.name == 'Team Head' || this.userData.role.name == 'SuccessManager' || this.userData.role.name == 'Master') {
            this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted'+this.stsus+'';
        } else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted'+this.stsus;
        }
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');

        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new FormControl('', [Validators.required]),
            comment: new FormControl('')
        });
        //counts
        // this.newprelimsRef = db.object('newprelimdesigns');
        // this.newprelims = this.newprelimsRef.valueChanges();
        // this.newprelims.subscribe(
        //   (res) => {

        //     this.newprelimscount = res.count;
        //     cdr.detectChanges();
        //   },


        // )

        // get access right permission data
        this.userAccessRights = this.utils.getUserAccessRights('prelim');

        this.isClient = this.utils.isClient();
    }

    makeDirectory() {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            } else if (this.platform.is('android')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            } else {
                this.storageDirectory = this.file.cacheDirectory;
            }
        });
    }

    createChatGroup(design: DesginDataModel) {
        var GUID = 'prelim' + "_" + new Date().getTime();

        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(group => {
            let membersList = [
                new CometChat.GroupMember("" + design.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
            ];
            CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            })
        })
    }

    ionViewDidEnter() {
        this.makeDirectory();
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;


        })

        this.network.networkDisconnect();
        this.network.networkConnect();

    }

    ionViewWillEnter(){
        this.userRoleID = this.storageService.getUser().role.id
        console.log(this.userRoleID)
    }

    segmentChanged(event) {

        this.sortdelive = event.target.value;

       
        this.stsus = '';
        this.sortdelive = event.target.value;
        if (this.statusfilter === 'revision') {
            this.stsus = '&isinrevisionstate=true';
        }
        if (this.sortdelive === 'Revision') {
            this.stsus = '&isinrevisionstate=true';
        }else  if (this.sortdelive === 'newDesign') {
            this.stsus = '&isinrevisionstate=false';
        }
        this.skip = 0;
        this.getSelectedSegment = event.detail.value;

        if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
            && this.orderbyfilterstatus != null) {
            this.sorting = true;
            this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;

            let showLoader = true;
            if (event != null && event !== undefined) {
                showLoader = false;
            }
        } else {
            this.sorting = false;
            this.sortingdata = "";
            this.ordertypefilterstatus = null;
            this.orderbyfilterstatus = null;
        }

        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD' || this.userData.role.name == 'Team Head' || this.userData.role.name == 'SuccessManager' || this.userData.role.name == 'Master') {
            if (event.target.value == 'newDesign') {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'InDesign') {
                this.segments = "requesttype=prelim&status=designassigned" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'OnHold') {
                this.segments = "requesttype=prelim&status=requestdeclined" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "requesttype=prelim&status=designcompleted" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'InReview') {
                this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {

                console.log(this.sortdelive);
                this.segments = "requesttype=prelim&status=delivered" + this.sortingdata + this.stsus;
            } else if (event.target.value == 'Revision') {
                this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" +
                    this.sortingdata+ this.stsus;
                // return this.segments;
            }
            this.getDesigns(null, this.getFilterData.id);
            // return this.segments;

        } else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            if (event.target.value == 'newDesign') {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'InDesign') {
                this.segments = "requesttype=prelim&status=designassigned" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'OnHold') {
                this.segments = "requesttype=prelim&status=requestdeclined" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "requesttype=prelim&status=designcompleted" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'InReview') {
                this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed" + this.sortingdata + this.stsus;
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "requesttype=prelim&status=delivered" + this.sortingdata + this.stsus;
            } else if (event.target.value == 'Revision') {
                this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" +
                    this.sortingdata+ this.stsus;
                // return this.segments;
            }
            this.getDesigns(null, this.getFilterData.id);

            // this.getPrelimData('')
        }

        // this.segments = event.target.value;
        // this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        // });

        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        //     this.formatDesignData(this.listOfDesigns);
        //   }
        // });

    }

    filtersortvalue(ordertypefilterstatus, orderbyfilterstatus, statusfilter) {

        console.log('ordertypefilterstatus', ordertypefilterstatus);
        console.log('orderbyfilterstatus', orderbyfilterstatus);

        this.ordertypefilterstatus = ordertypefilterstatus;
        this.orderbyfilterstatus = orderbyfilterstatus;
        
        this.sortorder = this.ordertypefilterstatus;
        console.log('SORT ORDER IN FILTERSORT',this.sortorder);
        
      return  this.getPrelimData(this.sortorder)

        let stuscountdata;
        if (this.statusfilter === 'revision') {
            this.stsus = '&isinrevisionstate=true';
        }
        if (this.sortdelive === 'Revision') {
            this.stsus = '&isinrevisionstate=true';
        }
        if (statusfilter != null) {

            this.filterStatusvalue(statusfilter, '');
        }
        if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
            && this.orderbyfilterstatus != null) {
            console.log('in if');

            this.sorting = true;
            this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;

            let showLoader = true;
            if (event != null && event !== undefined) {
                showLoader = false;
            }

            
            if (this.sortdelive == 'newDesign') {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata+this.stsus;
                // return this.segments;
            } else if (this.sortdelive == 'InDesign') {
                this.segments = "requesttype=prelim&status=designassigned" + this.sortingdata+this.stsus;
                // return this.segments;
            } else if (this.sortdelive == 'OnHold') {
                this.segments = "requesttype=prelim&status=requestdeclined" + this.sortingdata+this.stsus;
                // return this.segments;
            } else if (this.sortdelive == 'completed') {
                this.segments = "requesttype=prelim&status=designcompleted" + this.sortingdata+this.stsus;
                // return this.segments;
            } else if (this.sortdelive == 'InReview') {
                this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed" + this.sortingdata+this.stsus;
                // return this.segments;
            } else if (this.sortdelive == 'delivered') {
                this.segments = "requesttype=prelim&status=delivered" + this.sortingdata+this.stsus;
            } else if (this.sortdelive == 'Revision') {
                this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" + this.sortingdata+this.stsus;
                // return this.segments;
            } else {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata+this.stsus;
            }

            // this.getDesigns(null, this.getFilterData.id);
        }

        else if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
            && this.statusfilter != null) {
            this.sorting = true;
            this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;
            console.log('segment' + this.segments + this.sortingdata);


            this.filterStatusvalue(statusfilter, this.sortingdata);

        } else {
            this.sorting = false;
            if (ordertypefilterstatus == "null" || orderbyfilterstatus == "null") {
                this.sortingdata = "";
                this.ordertypefilterstatus = null;
                this.orderbyfilterstatus = null;
                console.log('sprting' + this.ordertypefilterstatus);
                if (this.sortdelive == 'newDesign') {
                    this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata+this.stsus;
                    // return this.segments;
                }
                else if (this.sortdelive == 'InDesign') {
                    this.segments = "requesttype=prelim&status=designassigned" + this.sortingdata+this.stsus;
                    // return this.segments;
                }
                else if (this.sortdelive == 'OnHold') {
                    this.segments = "requesttype=prelim&status=requestdeclined" + this.sortingdata+this.stsus;
                    // return this.segments;
                }
                else if (this.sortdelive == 'completed') {
                    this.segments = "requesttype=prelim&status=designcompleted" + this.sortingdata+this.stsus;
                    // return this.segments;
                }
                else if (this.sortdelive == 'InReview') {
                    this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed" + this.sortingdata+this.stsus;
                    // return this.segments;
                }
                else if (this.sortdelive == 'delivered') {
                    this.segments = "requesttype=prelim&status=delivered" + this.sortingdata+this.stsus;
                }  else if (this.sortdelive == 'Revision') {
                    this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" + this.sortingdata+this.stsus;
                    // return this.segments;
                } else {
                    this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.sortingdata+this.stsus;
                }
                this.getDesigns(null, this.getFilterData.id);
            }

        }
    }

    filterStatusvalue(statusfilter, sortingdata) {
        console.log('statusfilter', statusfilter);
        this.statusfilter = statusfilter;
        
        let stuscountdata;
        if (this.statusfilter === 'revision') {
            this.stsus = '&isinrevisionstate=true';
            stuscountdata = 'isinrevisionstate';
        } 
        var creatorParentId = this.getFilterData.id;
        console.log("event" + creatorParentId);
        console.log("event" + stuscountdata);
        this.getPrelimcounts(creatorParentId, stuscountdata);
        if (this.statusfilter === 'revision' && this.sortdelive === 'newDesign') {
            console.log("revision data");
            this.noDesignFound = "No Designs Found";

            this.listOfDesigns = [];
            this.listOfDesignsHelper = [];
            this.cdr.detectChanges();
        } else {

            if (this.sortdelive == 'newDesign') {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.stsus + sortingdata;
                // return this.segments;
            }
            else if (this.sortdelive == 'InDesign') {
                this.segments = "requesttype=prelim&status=designassigned" + this.stsus + sortingdata;
                // return this.segments;
            }
            else if (this.sortdelive == 'OnHold') {
                this.segments = "requesttype=prelim&status=requestdeclined" + this.stsus + sortingdata;
                // return this.segments;
            }
            else if (this.sortdelive == 'completed') {
                this.segments = "requesttype=prelim&status=designcompleted" + this.stsus + sortingdata;
                // return this.segments;
            }
            else if (this.sortdelive == 'InReview') {
                this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed" + this.stsus + sortingdata;
                // return this.segments;
            } else if (this.sortdelive == 'delivered') {
                this.segments = "requesttype=prelim&status=delivered" + this.stsus + sortingdata;
            }  else if (this.sortdelive == 'Revision') {
                this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" + this.sortingdata+this.stsus;
                // return this.segments;
            } else {
                this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted' + this.stsus + sortingdata;
            }

            this.getDesigns(null, this.getFilterData.id);
        }
    }

    ngOnInit() {
        this.getPrelimcounts();
        this.apiService.emitUserNameAndRole(this.userData);
        // this.userData = this.storageService.getUser();

        this.mixpanelService.track("PRELIM_DESIGN_PAGE_OPEN", {
            // $id: this.userData.id,
            // $email: this.userData.email,
            // $name: this.userData.firstname + this.userData.lastname
        });
        // this.router.navigate(['home/design/pending']);
        // this.routeSubscription = this.router.events.subscribe((event) => {
        //   if (event instanceof NavigationEnd) {
        //     // Trick the Router into believing it's last link wasn't previously loaded
        //     if (this.router.url.indexOf('page') > -1) {
        //       this.router.navigated = false;
        //       let data = this.route.queryParams.subscribe((_res: any) => {

        //         if (Object.keys(_res).length !== 0) {
        //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

        //           this.filterData(_res.serchTerm);
        //         } else {
        //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        //             // ;
        //             this.getDesign(null, true);
        //           // });
        //         }
        //       });
        //     }
        //   }
        // });
        this.setupCometChat();
        this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);

        });


        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
                this.formatDesignData(this.listOfDesigns);

            }
        });
        this.userRoleID = this.storageService.getUser().role.id
        console.log(this.userRoleID)
    }

    getPrelimcounts(creatorParentId = null, stuscountdata?: string): void {
        let userId = this.storageService.getUserID()
        let requesttype = "prelim"

        // this.apiService.getPrelimcounts(userId, requesttype, creatorParentId ? creatorParentId : '', stuscountdata).subscribe(res => {
        //     this.PrelimCounts = res;
        // });
        console.log(this.userRoleID);

          this.apiService.getPrelimc(userId, requesttype,this.userRoleID).subscribe(res => {
            // this.PrelimCounts = res;
            console.log(this.userRoleID);
            
            this.prelimpageCount = res['data']['attributes']
            console.log("this.permitpageCount",this.prelimpageCount);
        });
    }

    getDesigns(event, creatorParentId?: string) {
        console.log('getDesigns');

        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader, creatorParentId);
        this.getPrelimData('');
    }

    accept(id, data: string, event) {
        event.stopPropagation();
        this.mixpanelService.track("ACCEPT_PRELIM_DESIGN_PAGE_OPEN", {
        });
        this.acceptid = id;
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var d_date = tomorrow.toISOString();
        let status = {
            status: data,
            deliverydate: d_date
        }
        this.utils.showLoading("accepting").then(() => {
            this.apiService.updateDesignForm(status, id).subscribe((res: any) => {
                if (!res.isinrevisionstate) {
                    //  this.createNewDesignChatGroup(res);
                }
                ;
                this.utils.hideLoading().then(() => {
                    this.utils.setHomepageDesignRefresh(true);
                })
            })
        })

    }


    addUserToGroupChat() {
        ;
        var GUID = this.designerData.chatid;
        var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        if (this.isclientassigning) {
            userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        }
        let membersList = [
            new CometChat.GroupMember("" + this.selectedDesigner.cometchatuid, userscope)
        ];
        CometChat.addMembersToGroup(GUID, membersList, []).then(
            response => {

            },
            error => {

            }
        );
    }



    fetchPendingDesigns(event, showLoader: boolean, creatorParentId?: string) {

        this.noDesignFound = "";

        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        if (this.statusfilter === 'revision' && this.sortdelive === 'newDesign') {
            this.noDesignFound = "No Designs Found";
            this.listOfDesigns = [];
            this.listOfDesignsHelper = [];
            this.cdr.detectChanges();
        } else {


            this.isdesign = false;

            this.apiService.getDesignSurveys(this.segments, this.limit, this.skip, creatorParentId).subscribe((response: any) => {
                this.content.scrollToTop(10);
                this.isdesign = true;

                if (response.length) {
                    this.formatDesignData(response);
                } else {
                    this.noDesignFound = "No Designs Found";
                }
                if (event !== null) {
                    event.target.complete();
                }

            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });

        }
    }

    getPrelimData(sortorder,filterid = null){
        console.log('id from filter in getprelimData',filterid);
        console.log("SORTING ORDER", sortorder);
        
        if (sortorder !== '') {
            this.sortby = '&orderby=' + sortorder
            console.log(this.sortby);
            
        } else {
            this.sortby = ''
        }

        if (filterid !== null ) {
            this.filterbyId = '&creatorparentids=' +  "["+filterid+"]"
            console.log(this.filterbyId);

        } else {
            this.filterbyId = ''
        }
        // this.filterID = filterid
        this.prelimSegment
         
        this.userId = this.userData.id;
        console.log(this.userId);
        if(this.userRoleID == ROLES.SuperAdmin){
            this.role = 'masterrole'

             if(this.sortdelive == 'newDesign' ){
               this.prelimSegment = this.role +'/new/'+ this.userId  + this.filterbyId +  this.sortby

           }else if(this.sortdelive == 'Revision'){
               this.prelimSegment = this.role + '/inrevision/' + this.userId  + this.filterbyId +  this.sortby

           }else if(this.sortdelive == 'OnHold'){
               this.prelimSegment = this.role + '/onhold/' + this.userId  + this.filterbyId +  this.sortby

            }else if(this.sortdelive == 'InDesign'){
               this.prelimSegment = this.role + '/indesigning/' + this.userId  + this.filterbyId +  this.sortby

            }else if(this.sortdelive == 'completed'){
               this.prelimSegment = this.role + '/completed/' + this.userId  + this.filterbyId +  this.sortby
            
            }else if(this.sortdelive == 'InReview'){
               this.prelimSegment = this.role + '/inreview/' + this.userId  + this.filterbyId +  this.sortby
            
            }else if(this.sortdelive == 'delivered'){
               this.prelimSegment = this.role + '/delivered/' + this.userId  + this.filterbyId +  this.sortby
            }
        }else if(this.userRoleID !== ROLES.SuperAdmin){
            this.role = 'slaverole/'  

            if(this.sortdelive == 'newDesign'){
               this.prelimSegment = this.role + '/new/'+ this.userId  + this.filterbyId +  this.sortby

           }else if(this.sortdelive == 'Revision'){
               this.prelimSegment =  this.role + '/inrevision/' + this.userId  + this.filterbyId +  this.sortby

           }else if(this.sortdelive == 'OnHold'){
               this.prelimSegment =  this.role + '/onhold/' + this.userId  + this.filterbyId +  this.sortby

            }else if(this.sortdelive == 'InDesign'){
            this.prelimSegment = this.role + '/indesigning/' + this.userId  + this.filterbyId +  this.sortby

            }else if(this.sortdelive == 'completed'){
                //this.prelimSegment = 'designcompleted/'   
                // no api available
            }else if(this.sortdelive == 'InReview'){
                //this.prelimSegment = 'inreview/'
                // no api available

            }else if(this.sortdelive == 'delivered'){
               this.prelimSegment = this.role + '/delivered/' + this.userId  + this.filterbyId +  this.sortby
            }
        }
      
      
       console.log (this.prelimSegment)
      
        // console.log(userId);
        this.isdesign = false;
        this.listOfDesignsHelper = [];

        this.apiService.getPrelimData (this.prelimSegment,this.limit,this.skip).subscribe((res:any)=>{
           console.log(res);
           this.prelimData = res.data;
           console.log("this.prelimData",this.prelimData);


           this.isdesign = true;

           this.content.scrollToTop(10);
           console.log("RES.LENTH IS",res.length);


                  if (this.prelimData.length) {
                   console.log("in if loop");
           
                   console.log("this.pestampData",this.prelimData);
                   this.formatDesignData(this.prelimData);    } 
                   else {
                   this.noDesignFound = "No PE Stamp Found"
               }
           
           
        //    this.listOfDesignsHelper =  this.prelimData
        //    console.log("this.listOfDesignsHelper",this.listOfDesignsHelper)
        //    console.log("this.listOfDesigns",this.listOfDesigns)


        //    const username = this.listOfDesigns.map(item => {
        //     // const container = {};
        
        //     // container[item.name] = item.likes;
        //     this.name = item.attributes.name;
        
        //     return this.name;
        // })
        
        // console.log(username);
        })
    }

    formatDesignData(records: DesginDataModel[]) {
        console.log(records);
        
        this.overdue = [];
        let list: DesginDataModel[];

        list = this.fillinDynamicData(records);
        console.log('list', list);
        list.forEach(element => {
            this.listOfDesigns.push(element);
        })
        if (list.length > 0) {
            console.log(this.listOfDesigns);
            
            list.forEach((designItem: any, i) => {
                this.sDatePassed(designItem.updated_at, i);
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
                listOfDesign.listOfDesigns.push(designItem);      
                this.listOfDesignsHelper.push(listOfDesign);
                console.log(this.listOfDesignsHelper);
                

            });

            this.chatIcon(list);
            this.cdr.detectChanges();

        }
        // comment on 20220310
        // this.overdue = [];
        // let list: DesginDataModel[];
        // list = this.fillinDynamicData(records);
        // list.forEach(element => {
        //     this.listOfDesigns.push(element);
        // })
        // const tempData: DesginDataHelper[] = [];
        // this.listOfDesigns.forEach((designItem: any, i) => {
        //     if (tempData.length === 0) {
        //         this.sDatePassed(designItem.updated_at, i);
        //         const listOfDesign = new DesginDataHelper();
        //         listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
        //         listOfDesign.lateby = this.overdue;
        //         listOfDesign.listOfDesigns.push(designItem);
        //         tempData.push(listOfDesign);



        //         ;
        //     } else {

        //         let added = false;
        //         tempData.forEach((DesignList) => {
        //             // DesignList['listOfDesigns'].forEach(element=>{



        //             //   this.sDatePassed(element.deliverydate);
        //             // })
        //             if (!added) {
        //                 if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
        //                     DesignList.listOfDesigns.push(designItem);
        //                     this.sDatePassed(designItem.updated_at, i);
        //                     added = true;
        //                 }
        //             }
        //         });
        //         if (!added) {
        //             ;
        //             this.sDatePassed(designItem.updated_at, i);
        //             const listOfDesign = new DesginDataHelper();
        //             listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
        //             listOfDesign.lateby = this.overdue;
        //             listOfDesign.listOfDesigns.push(designItem);
        //             tempData.push(listOfDesign);
        //             added = true;
        //         }
        //     }
        // });
        // this.listOfDesignsHelper = tempData.sort(function (a, b) {
        //     var dateA = new Date(a.date).getTime(),
        //         dateB = new Date(b.date).getTime();
        //     return dateB - dateA;
        // });
        // this.chatIcon(list);
        // this.cdr.detectChanges();
    }

    ///chat icon
    chatIcon(list: DesginDataModel[]) {
        list.forEach(element => {
            var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(
                groupMembers => {

                    element.addedtogroupchat = true;
                },
                error => {

                }
            );
        })
    }

    ngOnDestroy(): void {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();

        this.dataRefreshSubscription.unsubscribe();
        this.DesignRefreshSubscription.unsubscribe();
    }

    // filterData(records : DesginDataModel[]) {

    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
    //   const tempData: DesginDataHelper[] = [];
    //   this.listOfDesigns.forEach((desginItem) => {
    //     if (tempData.length === 0) {
    //       const listOfDesign = new DesginDataHelper();
    //       listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //       listOfDesign.listOfDesigns.push(desginItem);
    //       tempData.push(listOfDesign);
    //     } else {
    //       let added = false;
    //       tempData.forEach((desginList) => {
    //         if (!added) {
    //           if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
    //             desginList.listOfDesigns.push(desginItem);
    //             added = true;
    //           }
    //         }
    //       });
    //       if (!added) {
    //         const listOfDesign = new DesginDataHelper();
    //         listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //         listOfDesign.listOfDesigns.push(desginItem);
    //         tempData.push(listOfDesign);
    //         added = true;
    //         this.listOfDesignDataHelper.push(listOfDesign);

    //       }
    //     }
    //   });
    //   this.listOfDesignDataHelper = tempData;
    //   this.cdr.detectChanges();
    // }

    fillinDynamicData(records: DesginDataModel[]): DesginDataModel[] {
        records.forEach((element: any) => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            } else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime)
            reviewdate.setMinutes(reviewdate.getMinutes() + 15)
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
             
            var acceptancedate = new Date(element.designacceptancestarttime);
            element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            var indesigndate = new Date(element.designstarttime);
            indesigndate.setHours(indesigndate.getHours() + 2);
            element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());
            //Setting acceptance timer
            if (element.status == "outsourced") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                } else {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }

                if (element.designacceptanceremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }

            //Setting design timer
            if (element.status == "designassigned" || element.status == "requestdeclined" || element.status == "designcompleted") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 6);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                } else {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 2);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }

            //Setting review timer
            if (element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed") {
                if (element.requesttype == "permit") {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setHours(reviewdate.getHours() + 2);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                } else {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setMinutes(reviewdate.getMinutes() + 15);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                if (element.reviewremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            // this.storage.get(''+element.id).then((data: any) => {

            //   if (data) {
            //     element.totalpercent = data.currentprogress;
            //   }else{
            //     element.totalpercent = 0;
            //   }
            // });
        });
        console.log(records);

        return records;
        
    }

    trackdesign(index, design) {
        return design.id;
    }

    // getDesign(event, showLoader: boolean) {

    //   this.listOfDesignsData = [];
    //   this.listOfDesignDataHelper = [];

    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
    //     // ;
    //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         // ;
    //         if (event !== null) {
    //           event.target.complete();
    //         }

    //         this.listOfDesignsData = response;
    //          response.forEach(element => {
    //             this.roleType = element.type;
    //         });;


    //         const tempData: DesginDataHelper[] = [];
    //         this.listOfDesignsData.forEach((desginItem) => {
    //           if (tempData.length === 0) {
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //             listOfDesign.listOfDesigns.push(desginItem);
    //             tempData.push(listOfDesign);
    //           } else {
    //             let added = false;
    //             tempData.forEach((desginList) => {
    //               if (!added) {
    //                 if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
    //                   desginList.listOfDesigns.push(desginItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //               listOfDesign.listOfDesigns.push(desginItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //               this.listOfDesignDataHelper.push(listOfDesign);

    //             }
    //           }
    //         });
    //         this.listOfDesignDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       },responseError=>{
    //         this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //           if (event !== null) {
    //             event.target.complete();
    //           }
    //           const error: ErrorModel = responseError.error;
    //           this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         });
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message);
    //       });

    //     });
    //   }, (apiError) => {
    //     this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //       if (event !== null) {
    //         event.target.complete();
    //       }
    //     });

    //   });
    // }

    openAddressOnMap(address: string, event, latitude, longitude) {
        event.stopPropagation();


        if (this.platform.is('ios')) {
            //try google maps first
            this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(
                response => {
                    if (response) {
                        this.launchNavigator.navigate(address, this.options);
                    } else {
                        window.open('maps://?q=' + latitude + ',' + longitude, '_system');
                    }
                },
                failure => {
                    //check failed;
                }
            );
        } else {
            this.launchNavigator.navigate(address, this.options);
        }

        //this.launchNavigator.navigate(address, this.options);
    }

    dismissBottomSheet() {
        this.showBottomDraw = false;

        this.drawerState = DrawerState.Bottom;
        this.utils.setBottomBarHomepage(true);
        this.assignForm.get('comment').setValue("");
        this.listOfAssignees = [];


    }

    raiseSurvey(designData, event) {
        event.stopPropagation();
        let objToSend: NavigationExtras = {
            queryParams: {
                designData: designData
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        this.router.navigate(['/schedule/survey'], {
            state: { productdetails: objToSend }
        });
    }

    assignToDesigner() {


        if (this.assignForm.status === 'INVALID' && (this.designerData.attributes.status === 'designcompleted' || this.designerData.attributes.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else if (this.assignForm.status === 'INVALID' && (this.designerData.attributes.status === 'created' || this.designerData.attributes.status === 'requestaccepted' || this.designerData.status === 'designassigned')) {
            if (this.userData.role.type == 'clientsuperadmin') {
                this.utils.errorSnackBar('Please select the WattMonk admin');
            }
            else { this.utils.errorSnackBar('Please select a designer'); }
        }
        else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utils.errorSnackBar("This design request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)

        }
        else {


            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            var additonalhours = 0;
            if (this.designerData.requesttype == "prelim") {

                additonalhours = this.selectedDesigner.jobcount * 2;

                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            } else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }

            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                ;
                if (this.selectedDesigner.parent.id == this.userData.parent.id) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "designer") {
                        postData = {
                            designassignedto: this.selectedDesigner.id,

                            isoutsourced: "false",
                            status: "designassigned",
                            designstarttime: designstarttime
                        };

                    }

                }
                else {
                    var designacceptancestarttime = new Date();
                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced",
                        designacceptancestarttime: designacceptancestarttime
                    };
                }
            } else {
                if (this.selectedDesigner.role.type == "designer") {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;


                        if (this.userData.role.type === 'clientsuperadmin' && this.designerData.attributes.status === 'created') {
                            this.isclientassigning = true;
                            this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
                            this.addUserToGroupChat();
                        } else {
                            this.addUserToGroupChat();
                            this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');
                        }
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);

                    })
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            })
        }

    }

    openDesigners(id: number, designData, event) {
        event.stopPropagation();
        this.mixpanelService.track("ASSIGN_PRELIM_DESIGN_PAGE_OPEN", {
        });
        this.listOfAssignees = [];

        this.designerData = designData;
        this.reviewAssignedTo = designData.designassignedto;
        if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
            //this.router.navigate(["payment-modal",{id:id,designData:this.designerData.requesttype}])

            let objToSend: NavigationExtras = {
                queryParams: {
                    id: id,
                    designData: this.designerData.requesttype,
                    fulldesigndata: this.designerData
                },
                skipLocationChange: false,
                fragment: 'top'
            };


            this.router.navigate(['/payment-modal'], {
                state: { productdetails: objToSend }
            });
        }

        else {
            if (this.listOfAssignees.length === 0) {
                this.utils.showLoading('Getting Designers').then(() => {
                    this.apiService.getDesigners().subscribe(assignees => {
                        this.utils.hideLoading().then(() => {
                            this.listOfAssignees = [];
                            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                            assignees.forEach(item => this.listOfAssignees.push(item));

                            this.showBottomDraw = true;
                            this.designId = id;
                            this.utils.setBottomBarHomepage(false);
                            this.drawerState = DrawerState.Docked;
                            this.assignForm.patchValue({
                                assignedto: ''
                            });
                        });
                    }, (error) => {
                        this.utils.hideLoading().then(() => {
                            this.utils.errorSnackBar('Some error occurred. Please try again later');
                        });
                    });
                });

            } else {
                this.designId = id;
                this.utils.setBottomBarHomepage(false);
                this.drawerState = DrawerState.Docked;
                this.assignForm.patchValue({
                    assignedto: ''
                });
            }
        }
    }

    openAnalysts(id: number, designData, event) {
        event.stopPropagation();
        this.listOfAssignees = [];

        this.designerData = designData;
        this.reviewAssignedTo = designData.reviewassignedto;

        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));

                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = DrawerState.Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }

    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = DrawerState.Bottom;
            this.utils.setBottomBarHomepage(true);
        } else {
            this.showBottomDraw = true;
        }
    }

    async openreviewPassed(id, designData, event) {
        event.stopPropagation();
        this.mixpanelService.track("DELIVER_PRELIM_PAGE_OPEN", {
        });
        this.designId = id
        const alert = await this.alertController.create({
            cssClass: 'alertClass',
            header: 'Confirm!',
            message: 'Would you like to  Add Comments!!',
            inputs:
                [{
                    name: 'comment',
                    id: 'comment',
                    type: 'textarea',
                    placeholder: 'Enter Comment'
                }
                ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                }, {
                    text: 'deliver',
                    handler: (alertData) => {
                        var postData = {};
                        if (alertData.comment != "") {
                            postData = {
                                status: "delivered",
                                comments: alertData.comment,
                            };
                        }
                        else {
                            postData = {
                                status: "delivered",
                            };
                        }

                        this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                            this.utils.hideLoading().then(() => {
                                ;

                                this.utils.showSnackBar('Design request has been delivered successfully');
                                this.utils.setHomepageDesignRefresh(true);
                            })
                        }, (error) => {
                            this.utils.hideLoading();
                            ;
                        });
                    }
                }
            ]
        });

        await alert.present();



    }

    doInfinite($event) {
        
        let stuscountdata;
    

        this.skip = this.skip + 20;
        // this.apiService.getDesignSurveys(this.segments, this.limit, this.skip, this.getFilterData.id ? this.getFilterData.id : '').subscribe((response: any) => {
            this.apiService.getPrelimData(this.prelimSegment,this.limit,this.skip).subscribe((response:any)=>{

            if (response.data.length) {

                this.formatDesignData(response.data);
            } else {
                this.noDesignFound = "No Designs Found"
            }
            if ($event !== null) {
                $event.target.complete();
            }

        },
            (responseError: any) => {
                if ($event !== null) {
                    $event.target.complete();
                }
                const error: ErrorModel = responseError.error;
                console.log(error);
                
                this.utils.errorSnackBar(error.message);

            });

    }

    refreshDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.getPrelimcounts();
        // this.prelimpageCount();
        // this.fetchPendingDesigns(event, showLoader, this.getFilterData.id ? this.getFilterData.id : '');
        this.getPrelimData('');
    }

    async OpenPaymentmodal(id) {

        const modal = await this.modalController.create({
            component: PaymentModalPage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                id: id,
                designData: this.designerData
            },
            backdropDismiss: false
        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null, this.getFilterData.id)
            }
        });
        // modal.dismiss(() => {
        //   ;
        //   this.getDesigns(null);
        // });
        return await modal.present();

    }

    async decline(id, event) {
        event.stopPropagation();
        this.mixpanelService.track("DECLINE_PRELIM_PAGE_OPEN", {
        });
        const modal = await this.modalController.create({
            component: DeclinePage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                id: id
            },
            backdropDismiss: false
        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null, this.getFilterData.id)
            }
        });
        // modal.dismiss(() => {
        //   ;
        //   this.getDesigns(null);
        // });
        return await modal.present();
    }

    async Resend(id, type, event) {
        event.stopPropagation();
        this.mixpanelService.track("RESEND_PRELIM_PAGE_OPEN", {
        });
        const modal = await this.modalController.create({
            component: ResendDialogPage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                id: id,
                requesttype: type

            },
            backdropDismiss: false
        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null, this.getFilterData.id)
            }
        });
        // modal.dismiss(() => {
        //   ;
        //   this.getDesigns(null);
        // });
        return await modal.present();
    }

    sDatePassed(datestring: string, i) {
        var checkdate = moment(datestring, "YYYYMMDD");
        var todaydate = moment(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;

    }

    selfAssign(id, designData, event) {
        event.stopPropagation();
        // this.mixpanelService.track("SelfAssign_Pestamp_PAGE_OPEN", {
        // });
        var designstarttime = new Date();
        var milisecond = designstarttime.getTime();
        var postData = {}
        postData = {
            reviewassignedto: this.userData.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateDesignForm(postData, id).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;

                    this.utils.showSnackBar('Design request has been assigned to you successfully');
                    this.utils.setHomepageDesignRefresh(true);

                })
            }, (error) => {
                this.utils.hideLoading();

            });
        })
    }

    pending(value) {
        ;
        if (this.userData.role.type == 'SuperAdmin') {
            value = "requesttype=prelim&status=created&status=outsourced&status=requestaccepted"
        } else {
            value = "requesttype=prelim&status=created&status=outsourced&status=requestaccepted"
        }
    }

    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;


    }

    shareWhatsapp(designData, event) {
        event.stopPropagation();
        this.socialsharing.share(designData.prelimdesign.url);
    }

    async shareViaEmails(id, designData, event) {
        event.stopPropagation();
        const modal = await this.modalController.create({
            component: EmailModelPage,
            cssClass: 'email-modal-css',
            componentProps: {
                id: id,
                designData: designData
            },

        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null, this.getFilterData.id)
            }
        });
        return await modal.present();
    }

    designDownload(designData, event) {
        event.stopPropagation();
        this.mixpanelService.track("DOWNLOAD_PRELIM_PAGE_OPEN", {
        });


        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

                    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
                );
                this.file.checkFile(resolvedDirectory.nativeURL, designData.prelimdesign.hash).then(data => {


                    if (data == true) {

                    } else {

                        throw { code: 1, message: 'NOT_FOUND_ERR' };
                    }

                }).catch(async err => {


                    if (err.code == 1) {
                        const fileTransfer: FileTransferObject = this.transfer.create();
                        this.utils.showLoading('Downloading').then(() => {
                            fileTransfer.download(url, this.storageDirectory + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {
                                this.utils.hideLoading().then(() => {

                                    this.utils.showSnackBar("Sales Proposal Design Downloaded Successfully");

                                    // this.clickSub = this.localnotification.on('click').subscribe(data => {

                                    //   path;
                                    // })
                                    /*this.localnotification.schedule({ text: 'Sales Proposal Design Downloaded Successfully', foreground: true, vibrate: true })*/
                                }, (error) => {
                                    // handle error


                                });
                            })
                        })
                    }
                })
            })
        })

        let dir_name = 'WattMonk';
        let path = '';
        const url = designData.prelimdesign.url;
        const fileTransfer: FileTransferObject = this.transfer.create();


        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();


            fileTransfer.download(url, path + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {

                this.utils.showSnackBar("Sales Proposal Design Downloaded Successfully");

                // this.clickSub = this.localnotification.on('click').subscribe(data => {

                //   path;
                // })
                /* this.localnotification.schedule({ text: 'Downloaded Successfully', foreground: true, vibrate: true })*/
            }, (error) => {
                // handle error
            });
        })


    }

    async presentFilterModal() {
        console.log("hello")
        const modal = await this.modalController.create({
            component: FilterPage,
            cssClass: 'small-modal',
            componentProps: {
                requesttype: 'prelim',
                isFilterApplied: this.isFilterApplied,
                memberid: this.memberId,
                selectedFilterData: this.getFilterData
            },
            backdropDismiss: true
        });
        modal.onDidDismiss().then((data) => {
            console.log('filter data', data)
            this.getFilterData = data.data;
            if (this.getFilterData != null || this.getFilterData != undefined) {
                if (this.getFilterData.id != null) {
                    this.isFilterApplied = true;
                    this.memberId = this.getFilterData.id;
                    console.log(this.memberId);
                    
                    this.filterApplied(this.getFilterData);
                } else {
                    this.removeFilter();
                }
            } else {
                this.removeFilter();
            }
        })
        return await modal.present();
    }

    filterApplied(filterData) {
        console.log('FILTERDATA IN FILTER APPLIED',filterData);
        
        this.skip = 0;
        if (this.memberId !== null && this.memberId !== '') {
            let creatorParentId = this.memberId;
            // this.getPrelimcounts(creatorParentId);
            // this.getDesigns(null, filterData.id);
            this.getPrelimData('',filterData.id)
            
        }
    }

    // remove filter when click on filtered data
    removeFilter(): void {
        this.getFilterData = '';
        this.memberId = null;
        this.skip = 0;
        this.isFilterApplied = false;
        this.getDesigns(null);
        this.getPrelimData('')
        this.getPrelimcounts();
    }

    createNewDesignChatGroup(design: DesginDataModel) {
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(
            group => {
                let membersList = [
                    new CometChat.GroupMember("" + design.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                    new CometChat.GroupMember("" + this.userData.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
                ];
                CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                    response => {
                        if (design.requesttype == "prelim") {
                            let postdata = {
                                chatid: GUID
                            }

                            this.apiService.updateDesignForm(postdata, this.acceptid).subscribe(res => { })
                            // this.updateItemInList(LISTTYPE.NEW, design);
                        } else {
                            // this.updateItemInPermitList(LISTTYPE.NEW, design);
                        }
                    },
                    error => {
                    }
                );
            },
            error => {

            }
        );
    }

    // addUserToGroupChat() {
    //    ;
    // var GUID = this.designerData.chatid;
    // var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
    // if (this.isclientassigning) {
    //   userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
    // }
    // let membersList = [
    //   new CometChat.GroupMember("" + this.selectedDesigner.id, userscope)
    // ];
    // CometChat.addMembersToGroup(GUID, membersList, []).then(
    //   response => {

    //   },
    //   error => {

    //   }
    // );
    // }

    setupCometChat() {
        let userId = this.storageService.getUserID()
        const user = new CometChat.User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
            () => {

                // if(this.utilities.currentUserValue != null){
                // You can now call login function.
                CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
                    (user) => {

                    },
                    error => {

                    }
                );
                // }
            },
            error => {

            }
        );
    }

    directAssignToWattmonk(id: number, event) {
        event.stopPropagation();
        this.mixpanelService.track("REASSIGN_PRELIM_DESIGN_PAGE_OPEN", {
        });
        this.designId = id;
        var postData = {};
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        postData = {
            //outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;


                    //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
                    //  {
                    //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
                    //  }else{
                    this.utils.showSnackBar('Design request has been reassigned to WattMonk successfully');

                    //this.dismissBottomSheet();
                    //this.showBottomDraw = false;
                    this.utils.setHomepageDesignRefresh(true);

                })
            }, (error) => {
                this.utils.hideLoading();
                // this.dismissBottomSheet();
                // this.showBottomDraw = false;
            });
        })
    }

    gotoActivity(designData, event) {

        event.stopPropagation();
        this.router.navigate(['/activity-details' + '/' + designData.id + '/prelim'])

    }

    gotoDetails(designData, $event) {
        console.log(designData);
        
        // $event.preventDefault();
        // $event.stopPropagation();
        // this.router.navigate(['/design-details/' + designData.id])
        this.utils.setPrelimId(designData)
        this.utils.setRequestType('prelim')
        this.router.navigate(['/master-details/prelim-details/' + designData.id])
    }

    gotoChats(designData, event) {
        event.stopPropagation();
        let objToSend: NavigationExtras = {
            queryParams: {
                name: designData.name + '_' + designData.address,
                guid: designData.chatid
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        this.router.navigate(['chat/' + designData.chatid], {
            state: { productdetails: objToSend }
        });
    }

    // open mail click on email id
    onMailClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "mailto:" + email;
    }

    scheduledPage() {
        // comment on 20220128
        this.mixpanelService.track("ADD_PRELIMDESIGN_PAGE_OPEN", {
        });
        this.utils.presentPopover('design');
        this.utils.setDesignDetails(null);
        // this.showToast()
        // this.route.navigate([ '/schedule/design' ]);
        //this.utils.dismissPopover();

    }


    async share_wattActionSheet(designData, event) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Share Sales Proposal Design',
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Send For Revision',

                    icon: 'share-outline',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                }, {
                    text: 'Raise  Survey Request',

                    icon: 'analytics-outline',
                    handler: () => {
                        this.raiseSurvey(designData, event);
                        console.log('Delete clicked');
                    }
                }, {
                    text: 'Raise  Permit Request',

                    icon: 'newspaper-outline',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                }, {
                    text: 'Share By Mail',
                    icon: 'mail-outline',
                    handler: () => {
                        this.shareViaEmails(designData.id, designData, event);
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Share By Whatsapp',
                    icon: 'logo-whatsapp',
                    handler: () => {
                        this.shareWhatsapp(designData, event);
                        console.log('Play clicked');
                    }
                }, {
                    text: 'Download File',
                    icon: 'download-outline',
                    handler: () => {
                        this.designDownload(designData, event);
                        console.log('Favorite clicked');
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();

        const { role, data } = await actionSheet.onDidDismiss();
        console.log('onDidDismiss resolved with role and data', role, data);
    }






    async sort_model(t,f) {
        console.log("hello")
        console.log(t,f);
        
        const modal = await this.modalController.create({
            component: SortingFilterPage,
            cssClass: 'small-modal',
            componentProps: {
                requesttype: 'prelim',
                issortingApplied: this.issortingApplied,
                sort:t,
                rev:f
            },
            backdropDismiss: true
        });
        modal.onDidDismiss().then((data) => {
            console.log('filter data', data)
            this.getsortFilterData = data.data;
            if (this.getsortFilterData != null || this.getsortFilterData != undefined) {
                if (this.getsortFilterData.value != null) {
                    this.issortingApplied = true;
                    let create = this.getsortFilterData.value;
                    this.ordertypefilterstatus = this.getsortFilterData.ordertypefilterstatus;
                    this.orderbyfilterstatus = this.getsortFilterData.orderbyfilterstatus;
                    this.statusfilter = this.getsortFilterData.statusfilter;

                    this.shotfilterApplied(this.getsortFilterData, this.ordertypefilterstatus, this.orderbyfilterstatus, this.statusfilter);
                } else {
                    this.removesorting();
                }
            } else {
                this.removesorting();
            }
        })
        return await modal.present();
    }


    shotfilterApplied(sortfilterData, ordertypefilterstatus, orderbyfilterstatus, statusfilter) {


        if(sortfilterData.value != ''){
        this.filtersortvalue(ordertypefilterstatus, orderbyfilterstatus, statusfilter);
        }

    }

    removesorting(): void {
        this.getsortFilterData = '';
        this.skip = 0;
        this.issortingApplied = false;
        this.statusfilter = 'newDesign';
        
        if (this.statusfilter === 'revision') {
            this.stsus = '&isinrevisionstate=true';
        }else{

            this.stsus = '&isinrevisionstate=false';
        }
        if (this.sortdelive === 'Revision') {
            this.stsus = '&isinrevisionstate=true';
        }
        if (this.sortdelive == 'newDesign') {
            this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted'+this.stsus;
            // return this.segments;
        }
        else if (this.sortdelive == 'InDesign') {
            this.segments = "requesttype=prelim&status=designassigned"+this.stsus;
            // return this.segments;
        }
        else if (this.sortdelive == 'OnHold') {
            this.segments = "requesttype=prelim&status=requestdeclined"+this.stsus;
            // return this.segments;
        }
        else if (this.sortdelive == 'completed') {
            this.segments = "requesttype=prelim&status=designcompleted"+this.stsus;
            // return this.segments;
        }
        else if (this.sortdelive == 'InReview') {
            this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed"+this.stsus;
            // return this.segments;
        }
        else if (this.sortdelive == 'delivered') {
            this.segments = "requesttype=prelim&status=delivered"+this.stsus;
        }else if (this.sortdelive == 'Revision') {
            this.segments = "requesttype=prelim&status=outsourced&status=requestaccepted" + this.stsus;
            // return this.segments;
        } else {
            this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted'+this.stsus;
        }
        this.getDesigns(null, this.getFilterData.id);
        this.getPrelimcounts();
    }
}


export class DesginDataHelper {
    listOfDesigns: DesginDataModel[];
    date: any;
    lateby: any;

    constructor() {
        this.listOfDesigns = [];
    }

    shareDesign() {

    }

}
