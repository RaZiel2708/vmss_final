import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatepasswordService } from '../services/updatepassword.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-updatepassword',
  standalone: false,
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent implements OnInit{
  passwordForm: any;  // Ensure this is typed correctly
  loading = false;
  errorMessage: string='';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private updatepasswordService: UpdatepasswordService
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
    if (this.passwordForm.invalid) {
      return;
    }

    const { userId, currentPassword, newPassword } = this.passwordForm.value;
    this.loading = true;
    this.updatepasswordService.updatePassword(userId, currentPassword, newPassword).subscribe({
      next: (response) => {
        this.loading = false;
        alert('Password updated successfully');
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to update password';
        this.router.navigateByUrl("/");
      }
    });
  }
}