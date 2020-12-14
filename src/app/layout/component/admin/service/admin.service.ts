import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient,private router: Router,
    private errorHandlingService: ErrorHandlingService) { }


    AddComapny(company)
  {

    const companyID = sessionStorage.getItem('companyId');


    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
     
      'authorization': `bearer ${token}`
    })


    return this.httpClient.post<any>(environment.webapiUrl+'api/admin/company',company, { headers: headers })
  }

  getCompanyList(): Observable<any>
  {
    
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/admin/company`, { headers: headers })

  }

  
}
