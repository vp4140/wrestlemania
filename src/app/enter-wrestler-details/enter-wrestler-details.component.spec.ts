import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterWrestlerDetailsComponent } from './enter-wrestler-details.component';

describe('EnterWrestlerDetailsComponent', () => {
  let component: EnterWrestlerDetailsComponent;
  let fixture: ComponentFixture<EnterWrestlerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterWrestlerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterWrestlerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
