import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventstypeComponent } from './eventstype.component';

describe('EventstypeComponent', () => {
  let component: EventstypeComponent;
  let fixture: ComponentFixture<EventstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventstypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
