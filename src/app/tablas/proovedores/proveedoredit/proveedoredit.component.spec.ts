import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoreditComponent } from './proveedoredit.component';

describe('ProveedoreditComponent', () => {
  let component: ProveedoreditComponent;
  let fixture: ComponentFixture<ProveedoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProveedoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
