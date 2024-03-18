import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolladoreditComponent } from './desarrolladoredit.component';

describe('DesarrolladoreditComponent', () => {
  let component: DesarrolladoreditComponent;
  let fixture: ComponentFixture<DesarrolladoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesarrolladoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesarrolladoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
