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
}
