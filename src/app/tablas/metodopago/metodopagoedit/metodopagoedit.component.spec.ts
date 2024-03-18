import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagoeditComponent } from './metodopagoedit.component';

describe('MetodopagoeditComponent', () => {
  let component: MetodopagoeditComponent;
  let fixture: ComponentFixture<MetodopagoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodopagoeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodopagoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
