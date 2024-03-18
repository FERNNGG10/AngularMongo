import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasjuegosComponent } from './ventasjuegos.component';

describe('VentasjuegosComponent', () => {
  let component: VentasjuegosComponent;
  let fixture: ComponentFixture<VentasjuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasjuegosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasjuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
