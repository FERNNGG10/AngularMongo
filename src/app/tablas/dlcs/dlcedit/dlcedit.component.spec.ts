import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlceditComponent } from './dlcedit.component';

describe('DlceditComponent', () => {
  let component: DlceditComponent;
  let fixture: ComponentFixture<DlceditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlceditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
