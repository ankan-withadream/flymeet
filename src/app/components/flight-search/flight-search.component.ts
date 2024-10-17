import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  inputControl1 = new FormControl('');
  inputControl2 = new FormControl('');
  
  suggestions: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  filteredSuggestions1: string[] = [];
  filteredSuggestions2: string[] = [];
  
  activeSuggestion1: number = -1; // Track active suggestion for input 1
  activeSuggestion2: number = -1; // Track active suggestion for input 2
  showSuggestions1: boolean = false;
  showSuggestions2: boolean = false;

  constructor() {
    this.inputControl1.valueChanges.subscribe(value => this.filterSuggestions(value, 1));
    this.inputControl2.valueChanges.subscribe(value => this.filterSuggestions(value, 2));
  }

  filterSuggestions(inputValue: string | null, inputField: number) {
if (inputValue != null)
    {    const filtered = this.suggestions.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (inputField === 1) {
      this.filteredSuggestions1 = filtered;
      this.activeSuggestion1 = -1; // Reset active suggestion
      this.showSuggestions1 = true;
    } else {
      this.filteredSuggestions2 = filtered;
      this.activeSuggestion2 = -1; // Reset active suggestion
      this.showSuggestions2 = true;
    }}
  }

  onKeydown(event: KeyboardEvent, inputField: number) {
    const isInput1 = inputField === 1;
    const activeSuggestion = isInput1 ? this.activeSuggestion1 : this.activeSuggestion2;
    const filteredSuggestions = isInput1 ? this.filteredSuggestions1 : this.filteredSuggestions2;

    if (event.key === 'ArrowDown') {
      if (activeSuggestion < filteredSuggestions.length - 1) {
        this.setActiveSuggestion(activeSuggestion + 1, inputField);
      }
    } else if (event.key === 'ArrowUp') {
      if (activeSuggestion > 0) {
        this.setActiveSuggestion(activeSuggestion - 1, inputField);
      }
    } else if (event.key === 'Enter') {
      if (activeSuggestion >= 0 && activeSuggestion < filteredSuggestions.length) {
        this.selectSuggestion(filteredSuggestions[activeSuggestion], inputField);
      }
    }
  }

  setActiveSuggestion(index: number, inputField: number) {
    if (inputField === 1) {
      this.activeSuggestion1 = index;
    } else {
      this.activeSuggestion2 = index;
    }
  }

  selectSuggestion(value: string, inputField: number) {
    if (inputField === 1) {
      this.inputControl1.setValue(value);
      this.filteredSuggestions1 = [];
      this.showSuggestions1 = false;
    } else {
      this.inputControl2.setValue(value);
      this.filteredSuggestions2 = [];
      this.showSuggestions2 = false;
    }
  }

  onBlur(inputField: number) {
    setTimeout(() => {
      if (inputField === 1) {
        this.showSuggestions1 = false;
      } else {
        this.showSuggestions2 = false;
      }
    }, 200);
  }
}
