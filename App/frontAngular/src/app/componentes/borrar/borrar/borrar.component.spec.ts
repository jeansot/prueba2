import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarComponent } from './borrar.component';

describe('BorrarComponent', () => {
  let component: BorrarComponent;
  let fixture: ComponentFixture<BorrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
