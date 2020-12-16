import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient:HttpClient,private router: Router,
    private errorHandlingService: ErrorHandlingService) { }


    TicketDataSave(task,boardId)
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({ 
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.post<any>(environment.webapiUrl+`api/company/${companyID}/board/${boardId}/ticket`,task, { headers: headers })
  }


  getTheTeamempolyee(boardId)
  {
    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/board/${boardId}/empInsideBoard`, { headers: headers })

  }

  getAllBoards(): Observable<any>
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



  toGetParticularBoard(boardId)
  {

    // const token = sessionStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'authorization': `bearer ${token}`
    // })
    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/board/${boardId}`, { headers: headers })

    
  }

  toGetParticularTicket(boardId, ticketId)
  {

    const headers = this.errorHandlingService.getauthorization()

    const companyID = sessionStorage.getItem('companyId');

    return this.httpClient.get<any>(environment.webapiUrl+`api/company/${companyID}/board/${boardId}/ticket/${ticketId}`, { headers: headers })


  }

  toCreateSt()
  {
    return this.httpClient.get("./assets/task.json")
  }
}
