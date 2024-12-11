import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnderwriterService {

  private apiUrl = 'http://localhost:8081'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch underwriters data from API
  getUnderwriters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/listUnderwriter');
  }

  // Optionally, you can create a method for deleting the underwriter
  // deleteUnderwriter(id: string): Observable<void> {
  //   return this.http.delete<void>(this.apiUrl+ `/deleteUnderWriter/${id}`);
  // }
}
