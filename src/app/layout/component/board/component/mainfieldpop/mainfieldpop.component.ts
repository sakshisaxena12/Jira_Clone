import { Component, Inject, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mainfieldpop',
  templateUrl: './mainfieldpop.component.html',
  styleUrls: ['./mainfieldpop.component.css']
})
export class MainfieldpopComponent implements OnInit {


  editRole:any[]=[]
  mainfieldsForTickets={}

  


  dropdownvalue;
  statusToShow=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<MainfieldpopComponent>) {

    this.statusToShow=false


   }

  ngOnInit() {
  }


  getList(event)
  {
    this.dropdownvalue = event.target.value
    console.log(this.dropdownvalue)
    if(this.dropdownvalue == "List")
    {
      this.statusToShow=true
    }
  }



  Addmain(data)
  {
    console.log(data)

    let forData = [];
    data.item1 = data.item1;
    if(data.item1){
      forData.push(data.item1)
    }

    data.item2 = data.item2;
    if(data.item2){
      forData.push(data.item2)
    }

    data.item3 = data.item3;
    if(data.item3){
      forData.push(data.item3)
    }

    data.item4 = data.item4;
    if(data.item4){
      forData.push(data.item4)
    }

    data.item5 = data.item5;
    if(data.item5){
      forData.push(data.item5)
    }

    console.log(forData)


    if(forData.length==0)
    {
        this.mainfieldsForTickets=
      {
        Title: data.title,
        Type: data.type,
      }

      console.log("yes")

    }

    else{

      this.mainfieldsForTickets=
      {
        Title: data.title,
        Type: data.type,
        Items: forData 
      }

      console.log("no")

    }


    

    console.log(this.mainfieldsForTickets)


    


  }

  close()
  {
    this.dialogRef.close({action:1, data:this.mainfieldsForTickets});
  }


}
