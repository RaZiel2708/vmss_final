import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UpdatepasswordService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

    updatePassword(userId: string| null,  newPassword: string|null): Observable<any> {
    return this.http.get(`${this.baseUrl}/update/${userId}/${newPassword}`);
  }
}