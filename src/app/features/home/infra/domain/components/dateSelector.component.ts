import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'date-selector',
  templateUrl: './dateSelector.component.html',
    imports:[CommonModule, ReactiveFormsModule]
})
export class DateComponent {
    @Output() dateChange: EventEmitter<string> = new EventEmitter();
    startDateControl = new FormControl(Date.now().toLocaleString());

  constructor() { 
    this.startDateControl.valueChanges.subscribe((newValue) => {      
      this.dateChange.emit(newValue?.toString());
    });
  }
}