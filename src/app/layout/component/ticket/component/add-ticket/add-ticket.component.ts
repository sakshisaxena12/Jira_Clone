import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  task:any[]=[]
  mainfieldsForTickets:any[]=[]
  BoardId:any[]=[]
  message
  structure:any[]=[]
  // mainfieldsForTickets={}
  inputfield=[]
  listfield=[]
  employee:any[]=[]

  news:any = {}
  showDev_QA_PM=false

  ids


  constructor(private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private ticketService: TicketService,private route: ActivatedRoute,
    private router: Router) {

       this.ids = this.route.snapshot.paramMap.get('boardId');
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
            this.customToastrService.GetErrorToastr(this.message, "Add Ticket Status", 5000)
  
        }
  
      },   (error: AppResponse) => {
  
  
        this.errorHandlingService.errorStatus(error,"Add Ticket Status")
  
  }
  )

  //  this.id ="5e199afd-cef2-4b24-898d-399e5ef79c4d"

  this.ticketService.toGetParticularBoard(this.ids).subscribe(resp =>{

    console.log(resp)

    if(resp.status)
    {
      this.news = resp.board

      this.inputfield = this.news.mainfieldsForTickets
      this.listfield = this.news.subFieldsForTickets
        
      // console.log(console.log(this.BoardId))
    }
    else
    { 
        
        this.message=resp.message;
        this.customToastrService.GetErrorToastr(this.message, "Add Ticket Status", 5000)

    }

  },   (error: AppResponse) => {


    this.errorHandlingService.errorStatus(error,"Add Ticket Status")

}
)


      // this.ticketService.toCreateSt().subscribe(resp => {
      //   this.structure = resp[0]

      //   this.inputfield = this.structure.mainfieldsForTickets
      //   this.listfield = this.structure.subFieldsForTickets

      //   for(let x=0;x<this.structure.mainfieldsForTickets.length;x++)
      //   {
      //     if(this.structure.mainfieldsForTickets[x].Type=="Text")
      //     {
      //       this.inputfield.push(this.structure.mainfieldsForTickets[x])
      //     }

      //     else
      //     {
      //       this.listfield.push(this.structure.mainfieldsForTickets[x])
      //     }

      //   }


      //   for(let x=0;x<this.structure.subFieldsForTickets.length;x++)
      //   {
      //     if(this.structure.subFieldsForTickets[x].Type=="Text")
      //     {
      //       this.inputfield.push(this.structure.subFieldsForTickets[x])
      //     }

      //     else
      //     {
      //       this.listfield.push(this.structure.subFieldsForTickets[x])
      //     }

      //   }

      //   console.log(this.inputfield)
      //   console.log(this.listfield)

      //   console.log(this.structure)


      // })

      
      

    }

  ngOnInit() {
  
  }

  getList(event)
  {
    let id = event.target.value
    console.log(id)


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
          this.customToastrService.GetErrorToastr(this.message, "Add Ticket Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Add Ticket Status")

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
          developer: data.devId,
          qA: data.qaId,
          pM:data.pmId

        }


  

      // console.log(obj1)
      // console.log(obj2)
       console.log(newdata)

      
    
    this.ticketService.TicketDataSave(newdata,this.ids ).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        // this.successStatus=true;
        // this.dangerStatus=false;
        this.message="Ticket is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Add Ticket Status", 5000)
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
      this.errorHandlingService.errorStatus(error,"Add Ticket Status")

}
)

  }


}
