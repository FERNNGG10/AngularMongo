import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaeditComponent } from './categoriaedit.component';

describe('CategoriaeditComponent', () => {
  let component: CategoriaeditComponent;
  let fixture: ComponentFixture<CategoriaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
