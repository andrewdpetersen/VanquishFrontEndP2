import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumNavBarComponent } from './premium-nav-bar.component';

describe('PremiumNavBarComponent', () => {
  let component: PremiumNavBarComponent;
  let fixture: ComponentFixture<PremiumNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
