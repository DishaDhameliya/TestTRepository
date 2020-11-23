import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

import { NotificationService } from '../../notification.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: Item[] = [];

  constructor(public itemService:ItemService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {

    this.itemService.getAll().subscribe((data: Item[])=>{
      this.items = data;
      console.log(this.items);
    }) 
  }

  deleteItem(id :number){
    this.itemService.delete(id).subscribe(res => {
         this.items = this.items.filter(item => item.id !== id);         
         this.notifyService.showSuccess('Item deleted successfully!', "Success");
    })
  }

}
