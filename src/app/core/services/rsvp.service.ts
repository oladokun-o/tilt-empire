import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  constructor(
    public http: HttpClient
  ) { 
  }

  saveRsvp(rsvp: any): Observable<any> {
    return this.http.post(ApiConfig.rsvp.post(), rsvp)
  }
}
