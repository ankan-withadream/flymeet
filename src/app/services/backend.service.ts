import { Injectable } from '@angular/core';
import { Client, Account} from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
public client:Client = new Client();
public account:Account;

  constructor() { 
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('67178ed60007727a43de');
    this.account = new Account(this.client);
    console.log(this.account);
  }

}
