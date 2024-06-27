import { Component, OnInit } from '@angular/core';
import { findById } from '../API_access';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{
  param : string | undefined;
  item : any = undefined
  constructor(private route: ActivatedRoute) { } 

  ngOnInit() { 
     this.route.queryParamMap.subscribe(function(this : ItemComponent , params : any){  
      this.param = params.get('id');
      if(this.param != undefined){
        findById(this.param).then(function(this : ItemComponent,  x : any[]){
          if(x.length > 0){
            this.item = x[0]; 
          }
        }.bind(this))
      }
    }.bind(this)); 
  } 

}
