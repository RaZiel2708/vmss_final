import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-under-writer',
  standalone: false,
  templateUrl: './register-under-writer.component.html',
  styleUrls: ['./register-under-writer.component.css']
})
export class RegisterUnderWriterComponent {
  underwriter = {
    name: '',
    dob: '',
    gender: '',
    address: '',
    doj: ''
  };
  
  // Maximum date for date of birth
  maxDate: string;

  constructor(private http: HttpClient, private route: Router, private dialog: MatDialog) {
    // Initialize the maxDate to today's date in YYYY-MM-DD format
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    
    // Automatically set the joining date to today's date
    this.underwriter.doj = this.maxDate;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const apiUrl = "http://localhost:8081/addUnderWritter";
      this.http.post(apiUrl, this.underwriter).subscribe(
        (response) => {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Underwriter registered successfully' },
            width: '300px',
          });
          this.route.navigate(['/success'], { state: this.underwriter });
        },
        (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Failed to register the underwriter. Please try again' },
            width: '300px',
          });
        }
      );
    }
  }

  onClick() {
    this.route.navigate(['/admin']);
  }
}
