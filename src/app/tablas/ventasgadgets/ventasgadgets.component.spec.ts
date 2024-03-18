import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasgadgetsComponent } from './ventasgadgets.component';

describe('VentasgadgetsComponent', () => {
  let component: VentasgadgetsComponent;
  let fixture: ComponentFixture<VentasgadgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasgadgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasgadgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
