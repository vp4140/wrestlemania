import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPlayersComponent } from './enter-players.component';

describe('EnterPlayersComponent', () => {
  let component: EnterPlayersComponent;
  let fixture: ComponentFixture<EnterPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterPlayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
