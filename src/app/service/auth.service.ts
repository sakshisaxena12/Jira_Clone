import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedinUser } from '../models/loggedInUser';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }


  login(params): Observable<LoggedinUser> {
    
    return this.httpClient.post<LoggedinUser>(environment.webapiUrl + 'api/login', params);
  }


  public refreshToken() {
    /* Leave it for next article because I want to cover 
     * it in more detail and different scenarios which 
     * we need for real project */
  }


  public getUserDetail() {     
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user'));
    } else {
      return null;
    }
  }

  public get isLoggedIn() { return !!sessionStorage.getItem('token'); }  

  public get getToken() { return sessionStorage.getItem('token'); }

  public get CompanyID() { return sessionStorage.getItem('companyId'); }

  public get getRefreshToken() { return sessionStorage.getItem('refresh'); }
  

  getRole()
  {
    return sessionStorage.getItem('ROLE')
  }


  public manageSession(data: LoggedinUser) {
    sessionStorage.setItem('token', data.authToken);
    sessionStorage.setItem('companyId', data.companyId);
    sessionStorage.setItem('ROLE', data.ROLE);
    sessionStorage.setItem('userID', data.uuid);
    // sessionStorage.setItem('refresh', data.refresh_token);
    sessionStorage.setItem('user', JSON.stringify(data));

    // console.log(data.Id)
    


    // if(data.Id=="72fecddb-fcfa-4afb-a8ec-7c0a3839e7c5")
    // {
    //   sessionStorage.setItem('role', Role.Admin);
    // }
    // else if(data.Id=="eca650a6-25fe-45a0-a9a1-5934eac3d64a")
    // {
    //   sessionStorage.setItem('role', Role.HR);
    // }
    // else if(data.Id=="b2e6392c-f944-4f17-9f48-f0a79e561397")
    // {
    //   sessionStorage.setItem('role', Role.Manager);
    // }
    // else
    // {
    //   sessionStorage.setItem('role', Role.User);
    // }
    
  }
 
  
  public logout(): void {

    //this.redirectUrl = document.location.pathname;
    this.redirectUrl = this.router.url;
    // console.log(this.redirectUrl)
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role')
    
    this.router.navigate(['/login']);
    this.loginStatus.emit(false);
    
  }



  getdata(): Observable<any> {

    const token = sessionStorage.getItem('token')

    console.log(token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `bearer ${token}`
    })

    return this.httpClient.get(environment.webapiUrl+'api/user/72fecddb-fcfa-4afb-a8ec-7c0a3839e7c5', { headers: headers  })
  } 


}
