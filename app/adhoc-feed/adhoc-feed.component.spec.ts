import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocFeedComponent } from './adhoc-feed.component';

describe('AdhocFeedComponent', () => {
  let component: AdhocFeedComponent;
  let fixture: ComponentFixture<AdhocFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
