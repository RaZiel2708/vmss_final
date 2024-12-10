import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { VehicleInsuranceService } from '../services/add-insurance.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-vehicle-insurance',
  templateUrl: './add-vehicle-insurance.component.html',
  styleUrls: ['./add-vehicle-insurance.component.css'],
  standalone: false
})
export class AddVehicleInsuranceComponent {
  insuranceForm: FormGroup;

  constructor(private fb: FormBuilder, private insuranceService: VehicleInsuranceService, private dialog: MatDialog) {
    this.insuranceForm = this.fb.group({
      vehicleno: ['', [Validators.required, Validators.minLength(1)]],
      make: ['', [Validators.required, Validators.minLength(1)]],
      model: ['', [Validators.required, Validators.minLength(1)]],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      primiumAmount: ['', [
        Validators.required, 
        Validators.min(100), 
        Validators.max(1000000),
        Validators.pattern(/^\d+$/)
      ]]
    }, { validators: this.dateRangeValidator });
  }

  // Custom validator to ensure end date is not before start date
  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('startdate');
    const endDate = group.get('enddate');

    if (startDate && endDate && startDate.value && endDate.value) {
      return new Date(startDate.value) > new Date(endDate.value) 
        ? { invalidDateRange: true } 
        : null;
    }
    return null;
  }

  onSubmit() {
    if (this.insuranceForm.valid) {
      this.insuranceService.addInsurance(this.insuranceForm.value).subscribe({
        next: (response: any) => {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Insurance details added successfully!' },
            width: '300px',
          });
          this.insuranceForm.reset();
        },
        error: (error: any) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'An error occurred while adding insurance details.' },
            width: '300px',
          });
        },
      });
    }
  }
}