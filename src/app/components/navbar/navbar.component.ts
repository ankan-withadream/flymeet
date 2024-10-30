import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(public authService: AuthService) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
