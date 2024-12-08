import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <div class="p-4 text-center">
      <h2 class="text-xl font-semibold text-green-600">Success</h2>
      <p class="mt-2 text-gray-700">{{ data.message }}</p>
      <button
        mat-button
        class="mt-4 bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700"
        (click)="closeDialog()"
      >
        OK
      </button>
    </div>
  `,
  standalone: false,
}
)
export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<SuccessDialogComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
