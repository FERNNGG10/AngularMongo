import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacioneditComponent } from './clasificacionedit.component';

describe('ClasificacioneditComponent', () => {
  let component: ClasificacioneditComponent;
  let fixture: ComponentFixture<ClasificacioneditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacioneditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
