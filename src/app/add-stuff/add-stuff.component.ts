import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { add } from '../API_access';

@Component({
  selector: 'app-add-stuff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-stuff.component.html',
  styleUrl: './add-stuff.component.css'
})

export class AddStuffComponent  {
  stuff:  any = [["id", "id", "s"] , ["date", "Date", "d"] , ["amount", "Amount", "s"], ["currency", "Currency", "s"] , ["Comments", "Comments", "s"], ["status", "Status", "e", ["IN PROGRESS", "REJECTED", "PENDING", "COMPLETED"]]]
  personstuff : string[][] = [["firstName", "First Name", "s"], ["lastName","Last Name", "s"], ["dateOfBirth", "Date of Birth", "d"], ["email", "Email", "s"],["IDNumber", "ID Number", "s"], ["bank", "Bank", "s"] 
  ]
  dataList = [1,2,3,4,5,6,7,8,9,10];
  click($event: any){
    console.log($event);
  }
  extract(triple : any, el : HTMLElement){
    if(triple[2] == "s"){
      return (el.querySelector("#" + triple[0]) as HTMLInputElement).value;
    }
    if(triple[2] == "d"){
      return (el.querySelector("#" + triple[0]) as HTMLInputElement).valueAsNumber;
    }
    if(triple[2] == "e"){
      let values : HTMLInputElement[]= Array.from((el.querySelector("#" + triple[0]) as HTMLElement).querySelectorAll("input[type='radio']"));
      for(var item of values){
        if(item.checked){
          return item.id; 
        }
      }
      return undefined;
    }
    return undefined;
  }

  add_(){
    let obj  : Record<string , any > = {}
    for(let item of this.stuff){
      obj[item[0]] = this.extract(item, document.body);
    }
    obj['sender'] = {}
    obj['recipient'] = {}
    for(let item of this.personstuff){
      obj["sender"][item[0]] = this.extract(item, document.getElementById("sender") as HTMLElement);
      obj["recipient"][item[0]] = this.extract(item, document.getElementById("recipient")as HTMLElement);
    }
    obj['amount'] = parseInt(obj['amount']);
    console.log(obj);
    add(obj);
  }
}
