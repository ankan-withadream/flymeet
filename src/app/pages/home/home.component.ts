import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FlightSearchComponent } from "../../components/flight-search/flight-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FlightSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
