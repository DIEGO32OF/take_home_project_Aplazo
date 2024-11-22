import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;  

  login() {
    
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', `${this.isAuthenticated}`);
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.isAuthenticated = false;
  }

  isAuthenticatedM(): boolean {
    this.isAuthenticated= Boolean(localStorage.getItem('isAuthenticated'));
    return this.isAuthenticated;  
  }
}
