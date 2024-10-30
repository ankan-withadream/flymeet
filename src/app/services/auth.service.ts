import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { ID, Models } from 'appwrite';
import { from, switchMap, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: Models.User<Models.Preferences> | null = null;
  email: string = '';
  password: string = '';
  name: string = '';

  // Inject the BackendService here
  constructor(private backendService: BackendService) {}

  // Login method
  login(email: string, password: string): Observable<Models.User<Models.Preferences>> {
  return from(this.backendService.account.createEmailPasswordSession(email, password)).pipe(
    // Fetch logged-in user details after successful session creation
    switchMap(() => from(this.backendService.account.get())),
    // Emit the loggedInUser object after successful fetch
    map(user => {
      this.loggedInUser = user;
      console.log('User logged in:', this.loggedInUser);
      return this.loggedInUser;
    }),
    // Error handling with RxJS
    catchError(error => {
      console.error('Error logging in:', error);
      return throwError(() => error);
    })
  );
}

  // Register method
  register(email: string, password: string, name: string): Observable<Models.User<Models.Preferences>> {
    return from(this.backendService.account.create(ID.unique(), email, password, name)).pipe(
      // Log in the user after successful registration
      switchMap(() => from(this.login(email, password))),
      // Emit the loggedInUser object after successful login
      map(() => {
        if (!this.loggedInUser) {
          throw new Error('User not found after login');
        }
        return this.loggedInUser;
      }),
      // Error handling with RxJS
      catchError(error => {
        console.error('Error registering:', error);
        return throwError(() => error);
      })
    );
  }

  // Logout method
  logout(): Observable<void> {
    return from(this.backendService.account.deleteSession('current')).pipe(
      // Clear the loggedInUser object after successful session deletion
      map(() => {
        this.loggedInUser = null;
        console.log('User logged out');
      }),
      // Error handling with RxJS
      catchError(error => {
        console.error('Error logging out:', error);
        return throwError(() => error);
      })
    );
  }
}
