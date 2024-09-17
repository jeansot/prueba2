import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGenerosComponent } from './listar-generos.component';

describe('ListarGenerosComponent', () => {
  let component: ListarGenerosComponent;
  let fixture: ComponentFixture<ListarGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarGenerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
