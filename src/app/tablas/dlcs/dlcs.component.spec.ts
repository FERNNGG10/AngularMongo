import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlcsComponent } from './dlcs.component';

describe('DlcsComponent', () => {
  let component: DlcsComponent;
  let fixture: ComponentFixture<DlcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlcsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
