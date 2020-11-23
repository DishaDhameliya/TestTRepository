import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
  
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
   
  id!: number;
  item!: Item;
   
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['itemId'];
      
    this.itemService.find(this.id).subscribe((data: Item)=>{
      this.item = data;
    });
  }
  
}