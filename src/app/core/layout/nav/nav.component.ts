import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/modals/shopping-cart/shopping-cart.component';
import { Event, events_query } from '../../models/products.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from 'src/app/shared/modals/shopping-cart/shopping-cart.component';
import { EventsService } from '../../services/events.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  events: Event[] = [];
  event!: Event;
  //storage: Storage = sessionStorage;
  Order!: Order;
  event_id!: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService,
    public modalService: NgbModal
  ) {
    //this.getEvents();
  }

  ngOnInit(): void {
  }

  showShoppingCart() {
    const ref = this.modalService.open(ShoppingCartComponent);
    ref.componentInstance.event = this.event;
  }

  getEvents() {
    this.eventService.get(events_query).subscribe({
      next: (result) => {
        this.events = result.result;
        let ids: string[] = this.events.map(e => { return e._id });
        console.log(ids)

        //this.Order = JSON.parse(this.storage.getItem(this.event._id) as string);
        //if (this.Order) this.event = this.Order.event;
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application')
      }
    })
  }

}
