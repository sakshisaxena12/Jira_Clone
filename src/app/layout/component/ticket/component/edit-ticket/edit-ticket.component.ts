import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  task:any={}
  mainfieldsForTickets:any[]=[]
  BoardId:any[]=[]
  message
  structure:any[]=[]
  // mainfieldsForTickets={}
  inputfield=[]
  listfield=[]
  employee:any[]=[]

  news:any = {}
  boardDetails: any ={}
  newboardDetails: any ={}
  showDev_QA_PM=false

  ids;
  ticketId;


  constructor(private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private ticketService: TicketService,private route: ActivatedRoute,
    private router: Router) {

       this.ids = this.route.snapshot.paramMap.get('boardId');
       this.ticketId = this.route.snapshot.paramMap.get('ticketId');

       this.getList(this.ids)

      console.log(this.ids)


      this.ticketService.getAllBoards().subscribe(resp =>{

        console.log(resp)
  
        if(resp.status)
        {
          this.BoardId = resp.boards
          // console.log(console.log(this.BoardId))
        }
        else
        { 
            
            this.message=resp.message;
            this.customToastrService.GetErrorToastr(this.message, "Edit Ticket Status", 5000)
  
        }
  
      },   (error: AppResponse) => {
  
  
        this.errorHandlingService.errorStatus(error,"Edit Ticket Status")
  
  }
  )

  //  this.id ="5e199afd-cef2-4b24-898d-399e5ef79c4d"

  this.ticketService.toGetParticularBoard(this.ids).subscribe(resp =>{

    console.log(resp)

    if(resp.status)
    {
      this.news = resp.board

      console.log(this.news)

      this.inputfield = this.news.mainfieldsForTickets
      this.listfield = this.news.subFieldsForTickets

      this.toGetDataOfTicket()

      // for(let x=0; x<this.inputfield.length; x++)
      // {
      //   this.inputfield[x].Value = "a"
      // }

      // console.log(this.inputfield)
        
      // console.log(console.log(this.BoardId))
    }
    else
    { 
        
        this.message=resp.message;
        this.customToastrService.GetErrorToastr(this.message, "Edit Ticket Status", 5000)

    }

  },   (error: AppResponse) => {


    this.errorHandlingService.errorStatus(error,"Edit Ticket Status")

}
)
      

    }

  ngOnInit() {
  
  }


  toGetDataOfTicket()
  {
    console.log(this.ticketId)
    console.log(this.inputfield)
    console.log(this.listfield)
    this.ticketService.toGetParticularTicket(this.ids,this.ticketId).subscribe(resp =>{

      // console.log(resp)

      if(resp.status)
      {
        this.boardDetails = resp.ticket

        console.log(this.boardDetails)

        for(let x=0; x<this.inputfield.length; x++)
      {
        this.inputfield[x].Value = this.boardDetails.mainFieldsValue[x].Value
      }

      
      for(let x=0; x<this.listfield.length; x++)
      {
        if(this.boardDetails.subFieldsValue[x].Title == "Priority")
        {
          this.listfield[x].Value = (this.boardDetails.subFieldsValue[x].Value).toUpperCase()
        }
        else
        {
          this.listfield[x].Value = (this.boardDetails.subFieldsValue[x].Value)
        }
        
      }

        this.task.status = this.boardDetails.status
        this.task.devId = this.boardDetails.developer
        this.task.qaId = this.boardDetails.qA
        this.task.pmId = this.boardDetails.pM
        this.task.boardId = this.boardDetails.boardId
       
       
        console.log(this.listfield)
      }
      else
      { 
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Edit Ticket Status", 5000)

      }

    },   (error: AppResponse) => {

      this.errorHandlingService.errorStatus(error,"Edit Ticket Status")

}
)
    // for(let x=0; x<this.inputfield.length; x++)
      // {
      //   this.inputfield[x].Value = "a"
      // }

      // console.log(this.inputfield)

  }

  getList(id)
  {

    this.ticketService.getTheTeamempolyee(id).subscribe(resps =>{

      console.log(resps)

      if(resps.status)
      {
        this.employee = resps.team
        console.log(this.employee)
        this.showDev_QA_PM = true

        // console.log(console.log(this.BoardId))
      }
      else
      { 
          
          this.message=resps.message;
          this.customToastrService.GetErrorToastr(this.message, "Edit Ticket Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Edit Ticket Status")

}
)
  }


  checkTextOrList(data)
  {
    
    if(data.Type=="Text")
    {
      // console.log(data)
      return true
    }
    else
    {
      return false
    }
  }

  AddTask(data)
  {

    // const newdata={
    //   name: data.name,
    //   email: data.email,
    //   password: data.password
    // }

    console.log(data)

    let obj1 = {
      "mainFieldsValue":  this.inputfield.map((field)=>{
        let newObje = {
               "Title":field["Title"],
               "Value":data[field["Title"]]
        }
    return newObje
})
      
      }

      let obj2 = {
        "subFieldsValue":  this.listfield.map((field)=>{
          let newObje = {
                 "Title":field["Title"],
                 "Value":data[field["Title"]]
          }
      return newObje
  })
        
        }

        

        let newdata={
          mainFieldsValue: obj1.mainFieldsValue,
          subFieldsValue: obj2.subFieldsValue,
          status: data.status,
          repoterId:sessionStorage.getItem('userID'),
          developer: ((data.devId !="UNASSIGNED")?data.devId:undefined),
          qA: ((data.qaId !="UNASSIGNED")?data.qaId:undefined),
          pM: ((data.pmId !="UNASSIGNED")?data.pmId:undefined)

        }


  

      // console.log(obj1)
      // console.log(obj2)
       console.log(newdata)

      
    
    this.ticketService.editTicketData(newdata,this.ids,this.ticketId ).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        // this.successStatus=true;
        // this.dangerStatus=false;
        this.message="Ticket is update successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Edit Ticket Status", 5000)
      }
      else
      {
        // this.dangerStatus=true;
        // this.successStatus=false;
        this.message=resp.Message;
      }
      
    }
    ,   (error: AppResponse) => {
      console.log(error)
      this.errorHandlingService.errorStatus(error,"Edit Ticket")

}
)

  }


}
