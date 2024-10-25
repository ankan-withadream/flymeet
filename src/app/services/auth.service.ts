import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';  // Correct case for import
import { ID, Models } from 'appwrite';                      // Ensure ID is imported

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
  async login(email: string, password: string) {
    try {
      // Create a session
      await this.backendService.account.createEmailPasswordSession(email, password);

      // Fetch logged-in user details
      this.loggedInUser = await this.backendService.account.get();
      console.log('User logged in:', this.loggedInUser);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  // Register method
  async register(email: string, password: string, name: string) {
    try {
      // Create a new user account
      await this.backendService.account.create(ID.unique(), email, password, name);

      // Log the user in after registration
      await this.login(email, password);
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  // Logout method
  async logout() {
    try {
      // Delete the current session
      await this.backendService.account.deleteSession('current');
      this.loggedInUser = null;
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
