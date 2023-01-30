import { EventsService } from '../services/events.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { events_query } from '../models/products.model';

@Injectable({
    providedIn: 'root'
})
export class Event implements Resolve<any> {
    constructor(
        private eventService: EventsService,
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params.id ? route.params.id : route.parent?.parent?.params.id;
        let query = `*[_id == '${id}']{
          title,
          _id,
          description,
          price,
          currency,
          'imageUrl': image.asset->url,
          datetime,
          stock,
          checkout_link
        }`;

        return this.eventService.get(query).pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}


@Injectable({
  providedIn: 'root'
})
export class Events implements Resolve<any> {
  constructor(
      private eventService: EventsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

      return this.eventService.get(events_query).pipe(
          catchError(error => {
              return of(null);
          })
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class NextEvent implements Resolve<any> {
  constructor(
      private eventService: EventsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      let query = `*[_id == 'next_event']{
        title,
        _id,
        description,
        price,
        currency,
        'imageUrl': image.asset->url,
        datetime,
        stock,
        checkout_link,
        location,
        tags
      }`;

      return this.eventService.get(query).pipe(
          catchError(error => {
              return of(null);
          })
      );
  }
}
