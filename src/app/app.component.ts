import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ExpenseEntryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'expense-manager';
  name = "David"; 
  display=true;
  
  constructor(private location: Location){}
  ngOnInit(){
    console.log(this.location.path() );
    this.display =  this.location.path() == "";
  }

}
