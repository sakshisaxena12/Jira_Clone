import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Role } from 'src/app/models/role';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  opened = false;
  roles;

  CompanyId;
  boardId;

  ADMIN_IT= false;
  ADMIN_HR=false;
  OWNER=false;
  SCRUM_MASTER=false;
  USER=false;

  constructor(private authService: AuthService,private router: Router,) {

    this.CompanyId = sessionStorage.getItem('companyId');
    this.boardId = 1

    // this.roles = sessionStorage.getItem('ROLE');
    // console.log(this.roles)



    this.ADMIN_IT= false;
    this.ADMIN_HR=false;
    this.OWNER=false;
    this.SCRUM_MASTER=false;
    this.USER=false;

    this.roles = authService.getRole()

    if(Role.ADMIN_IT == authService.getRole())
    {
      this.ADMIN_IT=true
    }
    if(Role.ADMIN_HR == authService.getRole())
    {
      this.ADMIN_HR=true
    }
    if(Role.OWNER == authService.getRole())
    {
      this.OWNER=true
    }
    if(Role.SCRUM_MASTER == authService.getRole())
    {
      this.SCRUM_MASTER=true
    }

    if(Role.USER == authService.getRole())
    {
      this.USER=true
    }

    console.log(this.roles)


   }


   routersToRedirect(name)
   {
     console.log(name)
      this.router.navigate([`company/${this.CompanyId}/${name}`]);
   }

  

  ngOnInit() {
  }

}
