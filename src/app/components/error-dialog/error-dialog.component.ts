import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <div class="p-4 text-center">
      <h2 class="text-xl font-semibold text-red-600">Error</h2>
      <p class="mt-2 text-gray-700">{{ data.message }}</p>
      <button
        mat-button
        class="mt-4 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
        (click)="closeDialog()"
      >
        OK
      </button>
    </div>
  `,
  standalone: false,
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
