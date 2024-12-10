import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

interface Insurance {
  id: number;
  vehicleNumber: string;
  make: string;
  model: string;
  startDate: Date;
  endDate: Date;
  premium: number;
}

@Component({
  selector: 'app-insurance-history',
  templateUrl: './insurance-history.component.html',
  standalone: false,
  styleUrls: ['./insurance-history.component.css']
  // Remove imports: [] configuration
})
export class InsuranceHistoryComponent implements OnInit {
  insurances: Insurance[] = [];
  users: any = [];
  isLoading = true;
  errorMessage = '';

  currentDate: Date = new Date();

  filteredInsurances: Insurance[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('API Response', data);
        this.isLoading = false;

        this.insurances = this.users.map((user: any) => ({
          id: user.insuranceid,
          vehicleNumber: user.vehicleno,
          make: user.make,
          model: user.model,
          startDate: new Date(user.startdate),
          endDate: new Date(user.enddate),
          premium: user.primiumAmount
        }));

        this.filteredInsurances = this.insurances;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  searchInsurances() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredInsurances = this.insurances.filter(insurance =>
      (insurance.vehicleNumber||'').toLowerCase().includes(term)
    );
    console.log(this.filteredInsurances,"qwertyui");
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredInsurances = this.insurances;
  }
}