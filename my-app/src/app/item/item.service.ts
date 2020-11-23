import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiURL = "https://localhost:44318";
   
  httpOptions = {
    // headers: new HttpHeaders({
    //  // 'Content-Type': 'application/json'
    // })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.apiURL + '/getdata')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(item:FormData): Observable<string> {            
    return this.httpClient.post<string>(this.apiURL + '/addItem', item, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id:number): Observable<Item> {
    return this.httpClient.get<Item>(this.apiURL + '/getDataById/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id:number, item:Item): Observable<Item> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post<Item>(this.apiURL + '/updateItem/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id:number){    
    return this.httpClient.delete<Item>(this.apiURL + '/deleteItem/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

