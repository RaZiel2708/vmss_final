import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-delete',
  standalone: false,

  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  underWriterId: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog) { }

  user: any = {

  }
  check = false
  onBack() {
    this.router.navigate(['/admin']);
  }


  onSearch() {
    if (this.underWriterId.trim() === '') {
      this.errorMessage = 'Please enter a valid Underwriter ID.';
      return;
    }

    this.errorMessage = '';

    const apiUrl = `http://localhost:8081/deleteUnderWriter/${this.underWriterId}`;
    this.http.delete(apiUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        // alert(response); // Display the response message from the backend
        this.dialog.open(SuccessDialogComponent, {
          data: { message: response },
          width: '300px',
        });
        this.underWriterId = ''; // Clear the input field
      },
      error: (error) => {
        console.error('Error deleting underwriter:', error);
        if (error.status === 404) {
          // alert('User deletion failed. User may not exist.');
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'User deletion failed. User may not exist.' },
            width: '300px',
          });
        } else {
          // alert('Failed to delete the underwriter. Please try again.');
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Failed to delete the underwriter. Please try again.' },
            width: '300px',
          });
        }
      },
    });
  }

  onSearch1() {
    if (this.underWriterId.trim() === '') {
      this.errorMessage = 'Please enter a valid Underwriter ID.';
      return;
    }
    this.errorMessage = '';

    const apiUrl = `http://localhost:8081/searchByid/${this.underWriterId}`;
    console.log(this.underWriterId)
    this.http.get(apiUrl, { responseType: 'text' }).subscribe({
      next: (response) => {

        this.check = true
        this.user = response
        this.user = JSON.parse(response);
        console.log(this.user?.name, this.user?.id);
      },
      error: Error => {

        // alert('not found')
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'not found' },
          width: '300px',
        });
      }
    })
  }

}
