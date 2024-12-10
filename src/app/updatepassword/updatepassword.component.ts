import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatepasswordService } from '../services/updatepassword.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-updatepassword',
  standalone: false,
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent implements OnInit {
  passwordForm: any;  // Ensure this is typed correctly
  loading = false;
  errorMessage: string = '';
  id:string|null=sessionStorage.getItem("id");
  password:string|null=''

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private updatepasswordService: UpdatepasswordService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }


  onSubmit() {
    // if (this.passwordForm.invalid) {
    //   return;
    // }

    const { userId, currentPassword, newPassword } = this.passwordForm.value;
    this.loading = true;
    this.updatepasswordService.updatePassword(this.id,this.password).subscribe({
      next: (response) => {
        this.loading = false;
         alert('Password updated successfully');
        this.dialog.open(SuccessDialogComponent, {
        });
        this.router.navigateByUrl("/underwriter");
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to update password';
        this.router.navigateByUrl("/underwriter");
      }
    });
  }
}
