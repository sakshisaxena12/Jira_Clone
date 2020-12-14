import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient,private router: Router,
    private errorHandlingService: ErrorHandlingService) { }


    GetBoardId(): Observable<any>
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/employee/boards`, { headers: headers })

  }

  
}
