import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-teamhomepage',
  templateUrl: './teamhomepage.page.html',
  styleUrls: ['./teamhomepage.page.scss'],
})
export class TeamhomepagePage implements OnInit {

  user:any
  constructor(private router:Router,
    private storage : StorageService) { 
    const url = this.router.url;
    console.log(url);
  }

  ngOnInit() {
this.user = this.storage.getUser();
console.log(this.user)
  }

  scheduledPage()
  {
    if(this.router.url == '/teamhomepage/team')
    {
      this.router.navigate(['/teamschedule']);
    }
    else
    {
      this.router.navigate(['/groupschedule']);
    }
  }
}
