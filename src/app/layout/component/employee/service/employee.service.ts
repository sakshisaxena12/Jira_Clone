import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient,private router: Router,
    private errorHandlingService: ErrorHandlingService) { }


  EmployeeDataSave(employee)
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({ 
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.post<any>(environment.webapiUrl+`api/company/${companyID}/it/addEmployee`,employee, { headers: headers })
  }


  AddEmployeeInBulk(fileToUpload: File)
  {

    console.log(fileToUpload)
    
    let formData = new FormData();
    formData.append('empList', fileToUpload, fileToUpload.name);
    console.log(formData.getAll('empList'))


    // const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');


    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
     
      'authorization': `bearer ${token}`
    })


    return this.httpClient.post<any>(environment.webapiUrl+`api/company/${companyID}/it/addEmployees`,formData, { headers: headers })
  }


  getEmployeForIt(): Observable<any>
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/it/employees`, { headers: headers })

  }

  ToGetBoard(): Observable<any>
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/hr/boards`, { headers: headers })

  }


  getAllEmployeForOther(): Observable<any>
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/Employee/all`, { headers: headers })

  }

  

  getallemployee()
  {
    return this.httpClient.get("./assets/personData.json");
  }
  
}
