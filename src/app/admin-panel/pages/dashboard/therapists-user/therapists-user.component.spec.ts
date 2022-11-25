import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistsUserComponent } from './therapists-user.component';

describe('TherapistsUserComponent', () => {
  let component: TherapistsUserComponent;
  let fixture: ComponentFixture<TherapistsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
