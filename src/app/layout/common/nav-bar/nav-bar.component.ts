import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  Name;
  CompanyId;

  constructor(private authService: AuthService) {
     this.Name = "XYZ"
     this.CompanyId = 2


   }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();


    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 100);

}


Logout()
{
  console.log()
  this.authService.logout()
}

}
