import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UpdatepasswordService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

    updatePassword(userId: number, confirmPassword: string, newPassword: string): Observable<any> {
    const body = { userId, newPassword }; // Only sending userId and newPassword
    return this.http.post(`${this.baseUrl}/user/updatePassword`, body); // POST request
  }
}