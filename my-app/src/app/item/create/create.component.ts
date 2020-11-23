import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { Key } from 'protractor';
  

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  fileData!:any;
  
   
  constructor(    
    public itemService: ItemService,
    private router: Router,
    private notifyService : NotificationService
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.compose([
        Validators.pattern(/^[\d\.,]+$/)
        ,Validators.required        
       ])),
      file: new FormControl('', Validators.required),       
    });
  }
   
  get f(){
    return this.form.controls;
  }    
  submit(){
    console.log(this.form.value);    
    let formData = new FormData(); 
    
    formData.append("file[]",this.fileData);  
    formData.append("data",JSON.stringify(this.form.value));
    
    this.itemService.create(formData).subscribe(res => {         
         this.notifyService.showSuccess('Item created successfully!', "Success");
         this.router.navigateByUrl('item/index');
    })
  }
  onFileChanged(event: Event){
    let currtarget:any=event?.target;
    if(currtarget != null && currtarget.files != null){
      this.fileData =currtarget.files.item(0);
    }    
  }
  
}