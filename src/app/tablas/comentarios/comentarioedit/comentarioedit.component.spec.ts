import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioeditComponent } from './comentarioedit.component';

describe('ComentarioeditComponent', () => {
  let component: ComentarioeditComponent;
  let fixture: ComponentFixture<ComentarioeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
