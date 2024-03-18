import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameeditComponent } from './gameedit.component';

describe('GameeditComponent', () => {
  let component: GameeditComponent;
  let fixture: ComponentFixture<GameeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
