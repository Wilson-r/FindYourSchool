import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaScuolaComponent } from './ricerca-scuola.component';

describe('RicercaScuolaComponent', () => {
  let component: RicercaScuolaComponent;
  let fixture: ComponentFixture<RicercaScuolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RicercaScuolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaScuolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
