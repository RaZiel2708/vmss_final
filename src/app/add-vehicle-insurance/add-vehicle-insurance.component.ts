
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      vehicleNo: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      premiumAmount: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
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
