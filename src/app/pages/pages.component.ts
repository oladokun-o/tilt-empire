import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  loading: boolean = true;
  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef
    ) {
    router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
