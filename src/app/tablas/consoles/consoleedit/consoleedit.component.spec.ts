import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleeditComponent } from './consoleedit.component';

describe('ConsoleeditComponent', () => {
  let component: ConsoleeditComponent;
  let fixture: ComponentFixture<ConsoleeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsoleeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
