import { Component, EventEmitter, inject, Output } from '@angular/core';
import { getUniqueBranch } from '../utils';
import { CommonModule } from '@angular/common';
import {  FormBuilder, FormGroup, ReactiveFormsModule   } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'branch-selector',
  templateUrl: './brancsSelector.component.html',
    imports:[CommonModule, ReactiveFormsModule]
})
export class BranchComponent {
    @Output() BranchSelected = new EventEmitter<number>();
    branchesId : number[]=[]
    private readonly fb = inject(FormBuilder);
    form: FormGroup;
    ngOnInit() {
        this.form = this.fb.group({
            branch: [""],
          });
            this.branchesId=getUniqueBranch().sort((a,b) => a-b)
    }


    updateBranch(){
        const branch = this.form.controls["branch"].value;
        this.BranchSelected.emit(branch[0]);
    }
}