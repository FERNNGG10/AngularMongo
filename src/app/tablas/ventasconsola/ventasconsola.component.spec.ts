import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasconsolaComponent } from './ventasconsola.component';

describe('VentasconsolaComponent', () => {
  let component: VentasconsolaComponent;
  let fixture: ComponentFixture<VentasconsolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasconsolaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasconsolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
