
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleInsuranceService {
  private apiUrl = 'http://localhost:3002/api/vehicle/add'; // Replace with your API UR
  constructor(private http: HttpClient) {}

  addInsurance(data: any): Observable<any> {
    console.log(data);
    return this.http.post(this.apiUrl, data);
  }
}
