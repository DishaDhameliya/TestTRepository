import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: number;
  item!: Item;
  form!: FormGroup;
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService : NotificationService

  ) { 
  
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['itemId'];
    this.itemService.find(this.id).subscribe((data: Item)=>{
      this.item = data;
    });
    
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.compose([
        Validators.pattern(/^[\d\.,]+$/)
        ,Validators.required        
       ]))
    });
  }

  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.itemService.update(this.id, this.form.value).subscribe(res => {         
         this.notifyService.showSuccess('Item updated successfully!', "Success");
         this.router.navigateByUrl('item/index');
    })
  }   
}

