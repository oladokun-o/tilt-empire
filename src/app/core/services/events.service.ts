import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry, catchError } from 'rxjs/operators';
import { ApiConfig } from '../config/api.config';
import { RootObject } from '../models/products.model';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  get(query: string) {
    return this.http.get<RootObject>(ApiConfig.events.get(query)).pipe(
      //retry(),
			catchError((error: HttpErrorResponse) => {
				let error_msg = '';

				if(error.error instanceof Error) {
					//client error
					error_msg = error.message;
				} else {
					//server error
					error_msg = `Error code: ${error.error.code}\n Error message: ${error.error.message}`
				}
        //this.toastr.error(error_msg)
				return throwError(error_msg)
			})
    )
  }

  submitnews(payload: any) {
    return this.http.post<{ result: string, error?: string | any}>(ApiConfig.events.news(), payload).pipe(
      //retry(),
			catchError(( result: string, error?: string | any) => {
				let error_msg = '';

				if(error) {
					//client error
					error_msg = error;
				} else {
					//server error
					error_msg = error//`Error code: ${error.error.code}\n Error message: ${error.error.message}`
				}
        //this.toastr.error(error_msg)
				return throwError(error_msg)
			})
    )
  }

  submitcontact(payload: any) {
    return this.http.post<any>(ApiConfig.events.contact(), payload).pipe(
      map(
      	(response) => {
      		if (response) {
      			return response;
      		}
      	},
      	(error: any) => {
      		return error;
      	}
      )
    )
  }
}
