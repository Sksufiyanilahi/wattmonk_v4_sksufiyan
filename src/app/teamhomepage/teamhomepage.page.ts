import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teamhomepage',
  templateUrl: './teamhomepage.page.html',
  styleUrls: ['./teamhomepage.page.scss'],
})
export class TeamhomepagePage implements OnInit {

  constructor(private router:Router) { 
    const url = this.router.url;
    console.log(url);
  }

  ngOnInit() {
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
